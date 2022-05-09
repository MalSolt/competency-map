import { useMutation, useQueryClient } from 'react-query';
import { getMeKey } from 'controllers/users/keys';
import { axiosInstance } from 'shared/api/axiosInstance';
import { useSnackbar } from 'notistack';

export const useLogout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(() => axiosInstance.post(`/auth/logout`), {
    onSettled: () => {
      queryClient.invalidateQueries(getMeKey());
    },
    onError() {
      enqueueSnackbar('Не удалось выполнить выход');
    },
  });

  return mutation;
};
