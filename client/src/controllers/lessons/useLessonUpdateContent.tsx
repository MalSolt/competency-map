import { LessonId } from '@kernel';
import { UpdateLessonContentDto } from '@dto/lesson';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { getLessonByIdKey } from 'controllers/lessons';
import { axiosInstance } from 'shared/api/axiosInstance';

type UpdateProps = {
  lessonId: LessonId;
  updateLessonContent: UpdateLessonContentDto;
};

export const useLessonUpdateContent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ lessonId, updateLessonContent }: UpdateProps) =>
      axiosInstance.put(`/lessons/${lessonId}/content`, updateLessonContent),
    {
      onSuccess: () => {},
      onError: () => {
        enqueueSnackbar(`Вовремя сохранения произошла ошибка!`, {
          variant: 'error',
        });
      },
      onSettled: (_, __, { lessonId }: UpdateProps) => {
        queryClient.invalidateQueries(getLessonByIdKey(lessonId));
      },
    }
  );

  return mutation;
};
