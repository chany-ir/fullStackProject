import axios from "axios";
//import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log('process.env.API_URL  ' + process.env.REACT_APP_API_URL);
setAuthorizationBearer();

function saveAccessToken(authResult) {
  console.log("pleas find the ducumrny atacfesdsds");
  localStorage.setItem("access_token", authResult.token);
  // console.log('Saved Token:', authResult.token); 
  setAuthorizationBearer();
}

function setAuthorizationBearer() {
  console.log("try to setAuthorizationBearer");
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    console.log("sucsre");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log('Authorization header set with token:', accessToken);
  }
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      return (window.location.href = "/register");
    }
    return Promise.reject(error);
  }
);

export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      console.log("dfdfdfd"+ jwtDecode(accessToken));
      return jwtDecode(accessToken);
    }
    return null;
  },

  logout:()=>{
    localStorage.setItem("access_token", "");
  },

  register: async (name, password) => {
    console.log("try to register",name,password);
    const res = await axios.post("api/register", { name, password });
    console.log("try to register",res.data);
    saveAccessToken(res.data);
  },

  login: async (name, password) => {
    const res = await axios.post("api/login", { name, password });
     if (res.status === 200) {
      saveAccessToken(res.data);
     } else {
       console.error("Login failed");
     }
  },
  getPublic: async () => {
    const res = await axios.get("api/public");
    return res.data;
  },
  getPrivate: async () => {
    const res = await axios.get("api/private");
    console.log("TRY to accept",res.status);
    console.log(res.data);
    return res.data;
  },
};
