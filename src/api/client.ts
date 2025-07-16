import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.82:6067/universidade-provac/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;