import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LockOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { LoginUserDto } from '@dto/user';
import { useLogin } from 'controllers/auth';
import { getFormStateError } from 'shared/lib/getFormStateError';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';

type Props = {};

export const Login: FC<Props> = () => {
  useHeaderTitle('Авторизация');
  const { control, handleSubmit } = useForm();
  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginUserDto> = (form) => {
    loginMutation.mutate(form);
  };

  const isUnauthorizedError =
    loginMutation.isError && loginMutation.errorCode === 401;
  const isUnkonwnError = loginMutation.isError && !isUnauthorizedError;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="div" variant="h5">
          Авторизация
        </Typography>
        {loginMutation.error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {isUnauthorizedError && 'Электронная почта или пароль неверные!'}
            {isUnkonwnError && 'Произошла неизвестная ошибка!'}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Это обязательное поле',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Введите валидный email адрес',
              },
            }}
            render={({ field, formState }) => {
              const { value, onChange } = field;
              const { error, helperText } = getFormStateError(
                field.name,
                formState
              );

              return (
                <TextField
                  type="email"
                  label="Email"
                  value={value}
                  disabled={loginMutation.isLoading}
                  onChange={onChange}
                  error={error}
                  helperText={helperText}
                  autoComplete="email"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Это обязательное поле' }}
            render={({ field, formState }) => {
              const { value, onChange } = field;
              const { error, helperText } = getFormStateError(
                field.name,
                formState
              );

              return (
                <TextField
                  type="password"
                  label="Пароль"
                  value={value}
                  disabled={loginMutation.isLoading}
                  onChange={onChange}
                  error={error}
                  helperText={helperText}
                  autoComplete="current-password"
                  fullWidth
                />
              );
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
            disabled={loginMutation.isLoading}
            loading={loginMutation.isLoading}
            fullWidth
          >
            Войти
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
