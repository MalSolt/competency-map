import { useQuery } from 'react-query';
import { CompetencyWithUserDto } from '@dto/competency';
import { UserId } from '@kernel';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getUserCompetenciesListKey } from './keys';

export const useGetUserCompetencies = (userId: UserId) => {
  const res = useQuery(getUserCompetenciesListKey(userId), () => (
    axiosInstance.get<CompetencyWithUserDto[]>(`/user-competencies/${userId}`)
  ), { 
    enabled: !!userId,
  });

  return res;
};
