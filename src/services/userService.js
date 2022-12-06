import axios from "axios";
const API_URL = "https://localhost:44347";

const getAllUsers = () => {
  return axios
    .get(API_URL + "/User/getAllUsers", {})
    .then((response) => {
      console.log("resp:" + response);
      return response.data;
    });
};

const createUser = (name, username, password) => {

  return axios
    .post(API_URL + "/User/create", {
      name,
      username,
      password
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const updateUser = (id, name, username, password) => {

  return axios
    .post(API_URL + "/User/update", {
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

const deleteUser = (id) => {
  return axios
    .post(API_URL + "/User/delete", {
      id
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const getUserDevices = (UserId) => {
  console.log(UserId);  
  return axios
    .get(API_URL + "/UserDevice/getDevices", {
      params : {
        UserId : UserId
      }
    })
    .then((response) => {
      console.log("resp:" + response)
      return response.data;
    });
};

const UserService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserDevices
}

export default UserService;