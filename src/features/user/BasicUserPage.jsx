import { Form, Input, Button, Modal, Table, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import UserService from '../../services/userService';

const BasicUserPage = () => {

    const [loading, setLoading] = useState(false);
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        getDevicesData();        
    }, []); 

    const getDevicesData = async () => {
        setLoading(true);
        const user = AuthService.getCurrentUser();
        const res = await UserService.getUserDevices(user.id);
        const data = res.devices.map(row => ({ Id: row.id, Name: row.name, Address: row.address, Description: row.description, MaxConsumption: row.maxConsumption }));
        debugger        
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
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                dataSource={deviceData}
                loading={loading}
            />
        </>
    );
}

export { BasicUserPage }