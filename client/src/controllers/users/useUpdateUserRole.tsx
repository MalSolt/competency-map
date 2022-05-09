import { UpdateUserRoleBodyDto } from '@dto/user';
import { UserId } from '@kernel';
import { rulesKey } from 'controllers/auth/keys';
import { useMutation, useQueryClient } from 'react-query';

import { axiosInstance } from 'shared/api/axiosInstance';
import { baseKey } from './keys';

type UpdateProps = {
  userId: UserId;
  updateUserRoleBodyDto: UpdateUserRoleBodyDto;
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ userId, updateUserRoleBodyDto }: UpdateProps) =>
      axiosInstance.post(`/users/${userId}/update-role`, updateUserRoleBodyDto),
    {
      onSuccess: () => {},
      onError: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(baseKey);
        queryClient.invalidateQueries(rulesKey());
      },
    }
  );

  return mutation;
};
