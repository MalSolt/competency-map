import { KnowledgeDto } from '@dto/knowledge';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getKnowledgeListKey } from './keys';

export const useGetKnowledgeList = () => {
  const res = useQuery(getKnowledgeListKey(), () =>
    axiosInstance.get<KnowledgeDto[]>('/knowledges/')
  );

  return res;
};
