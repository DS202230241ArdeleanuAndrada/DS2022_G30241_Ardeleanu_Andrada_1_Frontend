import { Form, Input, Button, Modal } from 'antd';
import React, { useState } from 'react';
import UserService from '../../services/userService';

const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        UserService.createUser(name, username, password)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
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

    return (
        <>
            <Button type="primary" shape="round" onClick={showModal}>
                Add new user
            </Button>
            <Modal
                open={open}
                title="Please fill in all the fields in order to add a new user"
                onOk={handleOk}
                onCancel={handleCancel} destroyOnClose={true}
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
                    <Form.Item label="Name" value={name} onChange={handleNameChange}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Username" value={name} onChange={handleUsernameChange}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password" value={name} onChange={handlePasswordChange}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export { AddUser }