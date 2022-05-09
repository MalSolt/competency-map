import { UpdateLessonDto } from '@dto/lesson';
import { LessonId } from '@kernel';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { getLessonByIdKey } from 'controllers/lessons';
import { axiosInstance } from 'shared/api/axiosInstance';

type UpdateProps = {
  lessonId: LessonId;
  currentTitle: string;
  updateLessonParams: UpdateLessonDto;
};

export const useLessonUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ lessonId, updateLessonParams }: UpdateProps) =>
      axiosInstance.patch(`/lessons/${lessonId}`, updateLessonParams),
    {
      onSuccess: (_, { currentTitle }) => {
        enqueueSnackbar(`Урок "${currentTitle}" успешно обновлен!`, {
          variant: 'success',
        });
      },
      onError: (_, { currentTitle }) => {
        enqueueSnackbar(
          `Вовремя обновления урока "${currentTitle}" произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: ({ id }) => {
        if (id) {
          queryClient.invalidateQueries(getLessonByIdKey(id));
        }
      },
    }
  );

  return mutation;
};
