import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getItems() {
    return apiClient.get('/');
  },
  postItem(item) {
    return apiClient.post('/', item);
  }
};
