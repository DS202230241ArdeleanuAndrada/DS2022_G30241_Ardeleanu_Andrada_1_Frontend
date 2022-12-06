import { Table, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import UserService from '../../services/userService';
import { EyeOutlined } from '@ant-design/icons';
import DeviceService from '../../services/deviceService';
import { Notify } from '../notification/Notify';
import { Notify2 } from '../notification/Notify2';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

const DeviceDataModal = ({modalOpen, handleCloseModal, openedDevice}) => {
    const [connection, setConnection] = useState();
    const [loading, setLoading] = useState(false);
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
        getDeviceMeasurements();

        if(!modalOpen && connection) {
            connection.stop();
        }
    }, []);

    const subscribeForMeasurements = () => {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:44347/hubs")
          .withAutomaticReconnect()
          .build();
    
        connection
          .start()
          .then(() => {
            connection.on("ReceiveMeasurements", ({message}) => {
                debugger
            });
          })
          .catch((error) => console.log(error));
    
        setConnection(connection);
      }

    const getDeviceMeasurements = async () => {
        if (openedDevice) 
        {
            setLoading(true);
            const res = await DeviceService.getDeviceMeasurements(openedDevice.Id);
            setMeasurements(res);
            //subscribeForMeasurements();
            setLoading(false);
        }
    }

    const columns = [
        {
            title: 'MeasurementValue',
            dataIndex: 'measurementValue',
            key: 'measurementValue',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        }
    ]

    return (
        <Modal
            open={modalOpen}
            onCancel={handleCloseModal}
            title={openedDevice && openedDevice.Name}
            destroyOnClose={true}
            footer={null}
            closable={true}
        >
            <Table
                columns={columns}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                dataSource={measurements}
                loading={loading}
                //className="modal"
            />
        </Modal> 
    );
}

export { DeviceDataModal }