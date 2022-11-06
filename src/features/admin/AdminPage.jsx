import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import AuthService from "../../services/authService";
import { Tabs, Breadcrumb, Divider } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined, MobileOutlined, PartitionOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { UserManagementPage } from '../user/UserManagementPage';
import { DeviceManagementPage } from '../device/DeviceManagementPage';

const { TabPane } = Tabs;

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    debugger
    if (user) {
      setIsAdmin(user.role === "admin");
    }
  }, []);

  return (
    isAdmin ?
      <>
        <h1>Admin page</h1>

        <div style={{
          display: 'block', width: 700, padding: 40
        }}>

          <Breadcrumb>
            <Breadcrumb.Item href="">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <span>Admin</span>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Divider />

          <Tabs>
            <TabPane tab={<span><UserOutlined />User Management</span>} key="1" >
              <UserManagementPage>

              </UserManagementPage>
            </TabPane>
            <TabPane tab={<span><MobileOutlined />Device Management</span>} key="2">
              <DeviceManagementPage>

              </DeviceManagementPage>
            </TabPane>
            <TabPane tab={<span><PartitionOutlined />Mappings</span>} key="3">

            </TabPane>
          </Tabs>
        </div>
      </> :

      <h1>Not allowed to view this page</h1>
  )
};

export { AdminPage }