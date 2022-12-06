import './App.css';
import { Login } from './features/login/Login';
import { DashboardPage } from './features/dashboard/DashboardPage';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/authService";
import { AdminPage } from './features/admin/AdminPage';
import { Layout, Menu, notification } from 'antd';
import { BasicUserPage } from './features/user/BasicUserPage';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";


const { Header, Content } = Layout;

const App = () => {
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [connection, setConnection] = useState();

  const subscribeForNotifications = (user) => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44347/hubs")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.on("ReceiveMessage", (message) => {
          notification.open({
            message: "Warning",
            description: message,
          });
        });

        connection.invoke("JoinGroup", ({user: user.username}));
      })
      .catch((error) => console.log(error));

    setConnection(connection);
  }


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.role !== "admin");
      setShowAdminBoard(user.role === "admin");
      subscribeForNotifications(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    connection.stop();
    setShowUserBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item>
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </Menu.Item>

          {
            showAdminBoard && (
              <Menu.Item>
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </Menu.Item>
            )
          }

          {
            showUserBoard && (
              <Menu.Item>
                <Link to={"/user"} className="nav-link">
                  Basic user
                </Link>
              </Menu.Item>
            )
          }

          {
            currentUser
              ?
              (
                <>
                  <Menu.Item>
                    Logged in as: {currentUser.username}
                  </Menu.Item>

                  <Menu.Item onClick={logOut}>
                    {/* <a onClick={logOut}> */}
                    <Link to={"/"} className="nav-link">
                      LogOut
                    </Link>
                    {/* </a> */}
                  </Menu.Item>
                </>
              )
              :
              (
                <Menu.Item>
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </Menu.Item>
              )
          }
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >

      </Content>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<DashboardPage />} />
          <Route exact path={"/home"} element={<DashboardPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/user" element={<BasicUserPage  />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default App;
