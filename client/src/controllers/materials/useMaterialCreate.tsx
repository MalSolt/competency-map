import { CreateMaterialDto } from '@dto/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getMaterialsKey } from './keys';

export const useMaterialCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      competencyId,
      ownerCollectionId,
      title,
      contentType,
    }: CreateMaterialDto) =>
      axiosInstance.post('/materials/', {
        ownerCollectionId,
        competencyId,
        title,
        contentType,
      }),
    {
      onSuccess: (_, { title }: CreateMaterialDto) => {
        enqueueSnackbar(`Вы успешно добавили обучающий материал '${title}'!`, {
          variant: 'success',
        });
      },
      onError: (_, { title }: CreateMaterialDto) => {
        enqueueSnackbar(
          `Ошибка! Не удалось добавить обучающий материал '${title}'!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: (
        _,
        __,
        { competencyId, ownerCollectionId }: CreateMaterialDto
      ) => {
        queryClient.invalidateQueries(
          getMaterialsKey(competencyId, ownerCollectionId)
        );
      },
    }
  );

  return mutation;
};
