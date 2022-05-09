import { UserId } from '@kernel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getUserKeyById } from './keys';

export const useGetUser = (id: UserId) => {
  const res = useQuery(
    getUserKeyById(id),
    () => axiosInstance.get(`/users/${id}`),
    {
      enabled: !!id,
    }
  );

  return res;
};
