import axios from "axios";
const API_URL = "https://localhost:44347";

const getAllDevices = () => {
  return axios
    .get(API_URL + "/UserDevice/getAllDevices", {})
    .then((response) => {
      console.log("resp:" + response);
      return response.data;
    });
};

const assignDevice = (userId, deviceId) => {
  debugger
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
  debugger
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

const DeviceService = {
  getAllDevices,
  assignDevice,
  unassignDevice,
  createDevice,
  updateDevice,
  deleteDevice,  
}

export default DeviceService;