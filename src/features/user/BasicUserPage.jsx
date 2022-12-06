import { Table, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import UserService from '../../services/userService';
import { EyeOutlined } from '@ant-design/icons';
import { DeviceDataModal } from './DeviceDataModal';

const BasicUserPage = () => {

    const [loading, setLoading] = useState(false);
    const [deviceData, setDeviceData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [openedDevice, setOpenedDevice] = useState();
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        getDevicesData();
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const getDevicesData = async () => {
        setLoading(true);
        const res = await UserService.getUserDevices(user.id);
        const data = res.devices.map(row => ({ Id: row.id, Name: row.name, Address: row.address, Description: row.description, MaxConsumption: row.maxConsumption }));
        setDeviceData(data);
        setLoading(false);
    }

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
                  <Button type="secondary" shape="round" icon={<EyeOutlined />} size='small'
                    onClick={() => {
                        handleOpenModal();
                        setOpenedDevice(record);
                    }}>
                  </Button>
                </>
              )
            }
          },
    ]

    return (
        <>
            <Table  
                columns={columns}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                dataSource={deviceData}
                loading={loading}
            />
            {modalOpen && 
                <DeviceDataModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} openedDevice={openedDevice}/>
            }
        </>
    );
}

export { BasicUserPage }