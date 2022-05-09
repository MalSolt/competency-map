import { KnowledgeDto, UpdateKnowledgeDto } from '@dto/knowledge';
import { KnowledgeId } from '@kernel';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getKnowledgeListKey } from './keys';

type Props = { id: KnowledgeId } & UpdateKnowledgeDto;

export const useKnowledgeEdit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, name }: Props) =>
      axiosInstance.patch<UpdateKnowledgeDto, KnowledgeDto>(
        `/knowledges/${id}`,
        { name }
      ),
    {
      onSuccess: (_, { name }: UpdateKnowledgeDto) => {
        enqueueSnackbar(`Область знаний "${name}" успешно обновлена!`, {
          variant: 'success',
        });
      },
      onError: (_, { name }: UpdateKnowledgeDto) => {
        enqueueSnackbar(
          `Вовремя обновлении области знаний "${name}" произошла ошибка!`,
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
