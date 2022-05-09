import { CompetencyDto } from '@dto/competency';
import { PositionDto } from '@dto/competencyPosition';
import { CompetencyId } from '@kernel';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

type Props = { id: CompetencyId; position: PositionDto };

export const useUpsertPosition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, position }: Props) =>
      axiosInstance.put<PositionDto, PositionDto>(
        `/competencies/${id}/position`,
        position
      ),
    {
      onMutate: (item) => {
        queryClient.cancelQueries(getCompetenciesListKey());
        const lastCompetencies = queryClient.getQueryData(
          getCompetenciesListKey()
        ) as CompetencyDto[];
        const newCompetencies = lastCompetencies.map((el) => {
          if (el.id === item.id) {
            return { ...el, position: item };
          }
          return el;
        });
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
};
