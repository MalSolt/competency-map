import axiosLib from 'axios';
import { getMeKey } from 'controllers/users/keys';
import { queryClient } from './reactQueryCache';

export const axiosInstance = axiosLib.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      queryClient.setQueryData(getMeKey(), null);
    }

    return Promise.reject(error);
  }
);
