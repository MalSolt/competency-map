import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { KnowledgeDto } from '@dto/knowledge';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getKnowledgeListKey } from './keys';

type UpdateProps = Pick<KnowledgeDto, 'id' | 'name'>;

export const useKnowledgeRemove = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id }: UpdateProps) => axiosInstance.delete(`/knowledges/${id}`),
    {
      onSuccess: (_, { name }: UpdateProps) => {
        enqueueSnackbar(`Область знаний "${name}" успешно удалена!`, {
          variant: 'success',
        });
      },
      onError: (_, { name }: UpdateProps) => {
        enqueueSnackbar(
          `Вовремя удалении области знаний "${name}" произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(getKnowledgeListKey());
      },
    }
  );

  return mutation;
};
