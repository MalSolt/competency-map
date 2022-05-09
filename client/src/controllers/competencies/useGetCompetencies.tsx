import { useQuery } from 'react-query';
import { CompetencyDto } from '@dto/competency';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

export const useGetCompetencies = () => {
  const res = useQuery(getCompetenciesListKey(), () =>
    axiosInstance.get<CompetencyDto[]>('/competencies/')
  );
  return res;
};
