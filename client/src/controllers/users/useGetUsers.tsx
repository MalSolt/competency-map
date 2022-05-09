import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getUsersListKey } from './keys';

export const useGetUsers = () => {
  const res = useQuery(getUsersListKey(), () => axiosInstance.get('/users/'));

  return res;
};
