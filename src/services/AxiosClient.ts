import axios from "axios";
import renewalToken from "./RenewalToken";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(async function (request) {
  
 if (sessionStorage.getItem('access_token')) {
  if (Date.now() > Number(sessionStorage.getItem('expiration')) ) {
    await renewalToken()
  }
    request.headers['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`
  }
  return request;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;
