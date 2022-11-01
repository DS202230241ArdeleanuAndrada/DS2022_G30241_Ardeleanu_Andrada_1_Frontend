import { Form, Input, Button, Modal, Table, Select, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import DeviceService from '../../services/deviceService';
import { EditTwoTone, DeleteTwoTone, EyeOutlined } from '@ant-design/icons';
import UserService from '../../services/userService';

const UserManagementPage = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDeviceList, setIsDeviceList] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [id, setId] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isCreate, setIsCreate] = useState(false);
    const [devicesList, setDevicesList] = useState([]);
    const [size, setSize] = useState('small');
    const { Option } = Select;

    useEffect(() => {
        getDevicesData();
        getUsersData();
    }, []);

    const getDevicesData = async () => {
        setLoading(true);
        const res = await DeviceService.getAllDevices();
        setDevicesList(res.map(row => ({ Id: row.id, Name: row.name })));
        setLoading(false);
    }

    const getUsersData = async () => {
        setLoading(true);
        const res = await UserService.getAllUsers();
        setUsersData(res.map(row => ({ Id: row.id, Name: row.name, Username: row.username, Password: row.password })));
        setLoading(false);
    }

    const showModal = async () => {
        setOpen(true);
        await getUsersData()
    };

    const showModalForDevices = async () => {
        setOpen(true);
        await getDevicesData()
    };

    const resetStateValues = () => {
        setId(null);
        setName(null);
        setUsername(null);
        setPassword(null);
    }

    const handleCreate = () => {
        UserService.createUser(name, username, password)
            .then(res => {
                UserService.assignDevice(res, deviceId)
                    .then(res => {
                        getUsersData();
                    })
            })
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            getUsersData();
        }, 3000);
    };

    const handleUpdate = () => {
        UserService.updateUser(id, name, username, password)
            .then(res => {
                DeviceService.assignDevice(res, deviceId)
                    .then(() => {
                        getUsersData();
                    })
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

    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
        setDeviceId(value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const deviceColumn = [
        {
            title: 'Device name',
            dataIndex: 'name',
            render: (devicesList) => <a>{devicesList}</a>,
        }
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            name: record.name,
        }),
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
            render: (_, record) => {
                console.log("record: ", record)
                return (
                    <>
                        <Tooltip title="View user's devices">
                            <Button type="secondary" shape="round" icon={<EyeOutlined />} size={size}
                                onClick={async () => {
                                    if (isDeviceList) {
                                        setIsCreate(false);                                        
                                        await showModalForDevices(true);
                                    }
                                }}>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Edit user">
                            <Button type="secondary" shape="round" icon={<EditTwoTone />} size={size}
                                onClick={() => {
                                    setIsCreate(false);
                                    setIsDeviceList(false);
                                    setOpen(true);
                                    setId(record.Id);
                                    setName(record.Name);
                                    setUsername(record.Username);
                                    setPassword(record.Password);
                                }}>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete user">
                            <Button type="secondary" shape="round" icon={<DeleteTwoTone />} size={size}
                                onClick={() => {
                                    handleDelete(record.Id);
                                }}>
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                dataSource={usersData}
                loading={loading}
            />
            <Button type="primary" shape="round" onClick={async () => {
                setIsCreate(true);
                await showModal();
                resetStateValues();
            }}>
                Add new user
            </Button>
            <Modal
                open={setOpen}
                title="These are the assigned devices for the selected user"
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Table
                    columns={deviceColumn}
                    dataSource={devicesList}
                    loading={loading}
                />

            </Modal>
            <Modal
                open={open}
                title="Please fill in all the fields in order to add a new user"
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="back" shape="round" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" shape="round" type="primary" loading={loading} onClick={() => {
                        if (isCreate) {
                            handleCreate();
                        } else {
                            handleUpdate();
                        }
                    }}>
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
                    <Form.Item label="Select assigned device">
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleSelectChange}
                            loading={loading}
                        >
                            {devicesList.map((device) => {
                                return <Option value={device.Id}>{device.Name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export { UserManagementPage }