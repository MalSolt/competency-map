import { CompetencyDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  const res = useMutation(
    (id: CompetencyId) => axiosInstance.delete(`/competencies/${id}/position`),
    {
      onMutate: (id) => {
        queryClient.cancelQueries(getCompetenciesListKey());
        const lastCompetencies = queryClient.getQueryData(
          getCompetenciesListKey()
        ) as CompetencyDto[];
        const newCompetencies = lastCompetencies.filter(
          (item) => item.id !== id
        );
        queryClient.setQueryData(getCompetenciesListKey(), newCompetencies);

        return { lastCompetencies };
      },
      onError(_, __, { lastCompetencies }: any) {
        queryClient.setQueryData(getCompetenciesListKey(), lastCompetencies);
      },
      onSettled: () => {
        queryClient.invalidateQueries(getCompetenciesListKey());
      },
    }
  );

  return res;
};
