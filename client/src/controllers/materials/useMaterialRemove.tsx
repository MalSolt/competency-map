import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { MaterialId } from '@kernel';
import { MaterialContentType } from '@dto/material';

import { axiosInstance } from 'shared/api/axiosInstance';
import { materialsBaseKey } from './keys';

type Props = {
  materialId: MaterialId;
  type: MaterialContentType;
  title: string;
};

export const useMaterialRemove = () => {
  const { enqueueSnackbar } = useSnackbar();
  const materialTitle = useRef('');
  const materialContentType = useRef('');
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ materialId, title, type }: Props) => {
      materialTitle.current = title;
      materialContentType.current = type;
      return axiosInstance.delete(`/materials/${materialId}`);
    },
    {
      onSuccess: () => {
        enqueueSnackbar(
          `${
            materialContentType.current === 'lesson' ? 'Урок' : 'Коллекция'
          } "${materialTitle.current}" успешно удалена!`,
          {
            variant: 'success',
          }
        );
      },
      onError: () => {
        enqueueSnackbar(
          `Вовремя удалении ${
            materialContentType.current === 'lesson' ? 'урока' : 'коллекции'
          } "${materialTitle.current}" произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(materialsBaseKey);
      },
    }
  );

  return mutation;
};
