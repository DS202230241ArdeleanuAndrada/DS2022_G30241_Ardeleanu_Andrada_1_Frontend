import { Table, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import DeviceService from '../../services/deviceService';

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

    const getDeviceMeasurements = async () => {
        if (openedDevice) 
        {
            setLoading(true);
            const res = await DeviceService.getDeviceMeasurements(openedDevice.Id);
            setMeasurements(res);
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
            />
        </Modal> 
    );
}

export { DeviceDataModal }