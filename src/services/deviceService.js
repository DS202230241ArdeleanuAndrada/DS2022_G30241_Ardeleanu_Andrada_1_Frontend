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

const updateDevice = (id, name, username, password) => {

  return axios
    .post(API_URL + "/UserDevice/update", {
      id,
      name,
      username,
      password
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const deleteDevice = (id) => {
  return axios
    .post(API_URL + "/UserDevice/delete", {
      id
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const DeviceService = {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
}

export default DeviceService;