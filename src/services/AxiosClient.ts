import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(function (config) {
  if (sessionStorage.getItem('access_token')) {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`
  }
  return config;
}, function (error) {
  // TODO Do something with request error
  return Promise.reject(error);
});

export default axiosClient;
