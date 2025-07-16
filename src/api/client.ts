import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://26.124.140.128:6067/universidade-provac/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;