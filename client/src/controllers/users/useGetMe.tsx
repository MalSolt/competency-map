import { UserDto } from '@dto/user';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getMeKey } from './keys';

export const useGetMe = () => {
  const res = useQuery(getMeKey(), () => axiosInstance.get<UserDto>('/users/me/'), {
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  return res;
};
