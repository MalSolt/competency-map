import { useMutation, useQueryClient } from 'react-query';
import { LoginUserDto } from '@dto/user';

import { axiosInstance } from 'shared/api/axiosInstance';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { getMeKey } from 'controllers/users/keys';

export const useLogin = () => {
  const [errorCode, setErrorCode] = useState<null | number>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: LoginUserDto) =>
      axiosInstance.post<LoginUserDto>(`/auth/login`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getMeKey());
      },
      onError: (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          setErrorCode(error?.response?.status ?? null);
        } else {
          setErrorCode(null);
        }
      },
      onSettled: () => {},
    }
  );

  return {
    mutate: mutation.mutate,
    error: mutation.error,
    errorCode,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};
