import axios from "axios";

const API_URL = "http://localhost:49155";

const login = (username, password) => {

  return axios
    .post(API_URL + "/User/login", {
      username,
      password,
    })
    .then((response) => {
      console.log("resp:" + response)
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data)); 
        debugger       
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return true;
};

const getCurrentUser = () => {
  debugger
  return JSON.parse(localStorage.getItem("user"));

};

const AuthService = {
  login,
  logout,
  getCurrentUser,
}

export default AuthService;