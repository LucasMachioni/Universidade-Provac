import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:6067/universidade-provac/",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("APP_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;