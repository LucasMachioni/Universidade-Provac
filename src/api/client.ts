import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://26.124.140.128:6067/universidade-provac/",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("APP_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;