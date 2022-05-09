import { DeveloperLevelDto } from '@dto/developerLevel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getDeveloperLevelsListKey } from './keys';

export const useGetDeveloperLevels = () => {
  const res = useQuery(getDeveloperLevelsListKey(), () =>
    axiosInstance.get<DeveloperLevelDto[]>('/developerLevels/')
  );

  return res;
};
