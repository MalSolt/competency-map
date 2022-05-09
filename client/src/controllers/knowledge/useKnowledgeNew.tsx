import { CreateKnowledgeDto, KnowledgeDto } from '@dto/knowledge';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getKnowledgeListKey } from './keys';

export const useKnowledgeNew = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ name }: CreateKnowledgeDto) =>
      axiosInstance.post<CreateKnowledgeDto, KnowledgeDto>('/knowledges', {
        name,
      }),
    {
      onSuccess: (_, { name }: CreateKnowledgeDto) => {
        enqueueSnackbar(`Области знаний "${name}" успешно добавлена!`, {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('Вовремя добавления области знаний произошла ошибка!', {
          variant: 'error',
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(getKnowledgeListKey());
      },
    }
  );

  return mutation;
};
