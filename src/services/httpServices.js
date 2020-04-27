import axios from 'axios';
import NProgress from 'nprogress';
import logger from './logService';
import { toast } from 'react-toastify';
import { getJwt } from './authServices';
import { apiUrl } from '../config.json';

console.log(apiUrl);
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'Application/json',
    'Content-Type': 'application/json',
    'todo-auth-token': getJwt(),
  },
});

// axios.defaults.headers.common['todo-auth-token'] = getJwt();

apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

apiClient.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occured');
  }

  return Promise.reject(error);
});

export default {
  get: apiClient.get,
  post: apiClient.post,
  patch: apiClient.patch,
  delete: apiClient.delete,
};
