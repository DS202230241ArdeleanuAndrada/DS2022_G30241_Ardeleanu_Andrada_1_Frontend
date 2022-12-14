import axios from "axios";
const API_URL = "http://localhost:49155";

const getAllDevices = () => {
  return axios
    .get(API_URL + "/UserDevice/getAllDevices", {})
    .then((response) => {
      console.log("resp:" + response);
      return response.data;
    });
};

const assignDevice = (userId, deviceId) => {
  return axios
    .post(API_URL + "/UserDevice/assignDevice", {
      userId,
      deviceId
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const unassignDevice = (userId, deviceId) => {
  return axios
    .post(API_URL + "/UserDevice/unassignDevice", {
      userId,
      deviceId
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const createDevice = (name, description, address, maxConsumption) => {
  return axios
    .post(API_URL + "/UserDevice/create", {
      name,
      description,
      address,
      maxConsumption
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const updateDevice = (id, name, description, address, maxConsumption) => {

  return axios
    .post(API_URL + "/UserDevice/updateDevice", {
      id,
      name,
      description,
      address,
      maxConsumption
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const deleteDevice = (id) => {
  return axios
    .post(API_URL + "/UserDevice/deleteDevice", {
      id
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const getDeviceMeasurements = (deviceId) => {
  return axios
    .get(API_URL + `/UserDevice/getMeasurements?deviceId=${deviceId}`, {})
    .then((response) => {
      console.log("resp:" + response);
      return response.data;
    });
};

const DeviceService = {
  getAllDevices,
  assignDevice,
  unassignDevice,
  createDevice,
  updateDevice,
  deleteDevice, 
  getDeviceMeasurements, 
}

export default DeviceService;