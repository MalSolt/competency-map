import { CompetencyDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetencyKeyById } from './keys';

export const useGetCompetency = (id: CompetencyId) => {
  const res = useQuery(
    getCompetencyKeyById(id),
    () => axiosInstance.get<CompetencyDto>(`/competencies/${id}`),
    {
      enabled: !!id,
    }
  );

  return res;
};
