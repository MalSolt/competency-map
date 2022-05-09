import { UploadCompetencyAvatarDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getCompetenciesListKey } from './keys';

type Props = {
  competencyId: CompetencyId;
  formData: UploadCompetencyAvatarDto;
};

export const useUploadCompetencyAvatar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ competencyId, formData }: Props) =>
      axiosInstance.post(`/images/competency/${competencyId}/upload`, formData),
    {
      onSuccess: () => {
        enqueueSnackbar(`Изображение успешно загружено`, {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('Вовремя загрузки изображения произошла ошибка', {
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
