import { KnowledgeDto } from '@dto/knowledge';
import { KnowledgeId } from '@kernel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getKnowledgeKeyById } from './keys';

export const useGetKnowledge = (id: KnowledgeId | null) => {
  const res = useQuery(
    getKnowledgeKeyById(id),
    () => axiosInstance.get<KnowledgeDto>(`/knowledges/${id}`),
    {
      enabled: !!id,
    }
  );

  return res;
};
