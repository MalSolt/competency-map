import { CreateCompetencyDto } from '@dto/competency';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

export const useCompetencyNew = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (createDto: CreateCompetencyDto) =>
      axiosInstance.post<CreateCompetencyDto>('/competencies', createDto),
    {
      onSuccess: ({ title }) => {
        enqueueSnackbar(`Компетенция "${title}" успешно добавлена!`, {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('Вовремя добавления компетенции произошла ошибка!', {
          variant: 'error',
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(getCompetenciesListKey());
      },
    }
  );

  return mutation;
};
