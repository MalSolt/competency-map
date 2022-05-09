import { UpdateCompetencyDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey, getCompetencyKeyById } from './keys';

type Props = { id: CompetencyId } & UpdateCompetencyDto;

export const useCompetencyEdit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, ...updateDto }: Props) =>
      axiosInstance.patch<UpdateCompetencyDto>(
        `/competencies/${id}`,
        updateDto
      ),
    {
      onSuccess: (_, { title }) => {
        enqueueSnackbar(`Компетенция "${title}" успешно обновлена!`, {
          variant: 'success',
        });
      },
      onError: (_, { title }) => {
        enqueueSnackbar(
          `Вовремя обновлении компетенции "${title}" произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: (_, __, { id }) => {
        queryClient.invalidateQueries(getCompetenciesListKey());
        queryClient.invalidateQueries(getCompetencyKeyById(id));
      },
    }
  );

  return mutation;
};
