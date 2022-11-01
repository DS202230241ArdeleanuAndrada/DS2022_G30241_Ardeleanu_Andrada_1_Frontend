import { Form, Input, Button, Modal, Table, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import DeviceService from '../../services/deviceService';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import UserService from '../../services/userService';

const DeviceManagementPage = () => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [maxConsumption, setMaxConsumption] = useState();
  const [isCreate, setIsCreate] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    getDevicesData();
    getUsersData();
  }, []);

  const getDevicesData = async () => {
    setLoading(true);
    const res = await DeviceService.getAllDevices();
    setDeviceData(res.map(row => ({ Id: row.id, Name: row.name, Description: row.description, Address: row.address, MaxConsumption: row.maxConsumption })));
    setLoading(false);
  }

  const getUsersData = async () => {
    setLoading(true);
    const res = await UserService.getAllUsers();
    setUsersList(res.map(row => ({ Id: row.id, Name: row.name })));
    console.log("im here: ", res)
    setLoading(false);
  }

  const showModal = async () => {
    setOpen(true);
    console.log("opened")
    await getUsersData()
  };

  const resetStateValues = () => {
    setId(null);
    setName(null);
    setDescription(null);
    setAddress(null);
    setMaxConsumption(null);
  }

  const handleUpdate = () => {
    console.log(id, name, description, address, maxConsumption)
    DeviceService.updateDevice(id, name, description, address, maxConsumption)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setOpen(false);
        getDevicesData();
      })
  };

  const handleCreate = () => {
    DeviceService.createDevice(name, description, address, maxConsumption)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      getDevicesData();
    }, 3000);
  };

  const handleDelete = (id) => {
    DeviceService.deleteDevice(id)
      .then(res => {
        getDevicesData();
      })
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleMaxConsumptionChange = (e) => {
    setMaxConsumption(e.target.value);
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
      title: 'Address',
      dataIndex: 'Address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'description',
    },
    {
      title: 'MaxConsumption',
      dataIndex: 'MaxConsumption',
      key: 'maxConsumption',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'action',
      render: (_, record) => {
        console.log("record: ", record)
        return (
          <>
            <button onClick={() => {
              setIsCreate(false);
              setOpen(true);
              setId(record.Id);
              setName(record.Name);
              setDescription(record.Description);
              setAddress(record.Address);
              setMaxConsumption(record.MaxConsumption);
            }}>
              <EditTwoTone />
            </button>
            <button
              onClick={() => {
                handleDelete(record.Id);
              }}>
              <DeleteTwoTone />
            </button>
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
        dataSource={deviceData}
        loading={loading}
      />
      <Button type="primary" shape="round" onClick={async () => {
        setIsCreate(true);
        await showModal();
        resetStateValues();
      }}>
        Add new device
      </Button>
      <Modal
        open={open}
        title="Please fill in all the fields in order to add a new device"
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
          <Form.Item label="Device name">
            <Input onChange={handleNameChange} value={name} />
          </Form.Item>
          <Form.Item label="Description">
            <Input onChange={handleDescriptionChange} value={description} />
          </Form.Item>
          <Form.Item label="Address">
            <Input onChange={handleAddressChange} value={address} />
          </Form.Item>
          <Form.Item label="MAX Consumption">
            <Input onChange={handleMaxConsumptionChange} value={maxConsumption} />
          </Form.Item>
          <Form.Item label="Select assigned user">
            <Select
              style={{
                width: 120,
              }}
              onChange={handleSelectChange}
              loading={loading}
            >
              {usersList.map((user) => {
                return <Option value={user.Id}>{user.Name}</Option>
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export { DeviceManagementPage }