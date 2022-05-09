import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { CompetencyDto } from '@dto/competency';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

type Props = Pick<CompetencyDto, 'id' | 'title'>;

export const useCompetencyRemove = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id }: Props) => axiosInstance.delete(`/competencies/${id}`),
    {
      onSuccess: (_, { title }) => {
        enqueueSnackbar(`Компетенция "${title}" успешно удалена!`, {
          variant: 'success',
        });
      },
      onError: (_, { title }) => {
        enqueueSnackbar(
          `Вовремя удалении компетенции "${title}" произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(getCompetenciesListKey());
      },
    }
  );

  return mutation;
};
