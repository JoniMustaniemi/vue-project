import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // Change this to your deployed backend URL
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
