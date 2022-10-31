import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'antd/dist/antd.css';
import '../../index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from "../../services/authService";

const Login = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onFinish = async () => {
    AuthService.login(username, password)
      .then((response) => {
        setError(false);
        if (response.role === "admin") {
          navigate("/admin");
        }
        else {
          navigate("/user");
        }
        window.location.reload();
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        value={username}
        onChange={handleUsernameChange}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        value={password}
        onChange={handlePasswordChange}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {error && <p>Login failed!</p>}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export { Login }