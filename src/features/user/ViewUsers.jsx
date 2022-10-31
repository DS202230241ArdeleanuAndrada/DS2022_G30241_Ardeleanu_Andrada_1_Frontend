import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../../index.css';
import { Form, Input, Button, Modal, Table } from 'antd';
import UserService from '../../services/userService';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const ViewUsers = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleOk = () => {
    UserService.updateUser(id, name, username, password)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setOpen(false);
        getUsersData();
      })
  };

  const handleDelete = (id) => {
    UserService.deleteUser(id)
      .then(res => {
        getUsersData();
      })
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'password',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'action',
      render: (record) => (
        <>
          <button onClick={() => {
            setOpen(true);
            setName(record.Name);
            setUsername(record.Username);
            setPassword(record.Password);
          }}>
            {"Update"}
          </button>
          <button onClick={() => {
            handleDelete(record.id)
          }}>
            {"Delete"}
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    const res = await UserService.getAllUsers();
    setUserData(res.map(row => ({ Id: row.id, Name: row.name, Username: row.username, Password: row.password })));
    setLoading(false);
  }


  return (
    <>
      <Table
        columns={columns}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
        dataSource={userData}
        loading={loading}
      />
      <Modal
        open={open}
        title="Please fill in all the fields in order to add a new user"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" shape="round" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" shape="round" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>
        ]}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item label="Name">
            <Input onChange={handleNameChange} value={name} />
          </Form.Item>
          <Form.Item label="Username">
            <Input onChange={handleUsernameChange} value={username} />
          </Form.Item>
          <Form.Item label="Password">
            <Input onChange={handlePasswordChange} value={password} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};

export { ViewUsers }