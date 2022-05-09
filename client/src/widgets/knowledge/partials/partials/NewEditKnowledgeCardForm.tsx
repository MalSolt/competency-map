import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { KnowledgeDto } from '@dto/knowledge';
import { getFormStateError } from 'shared/lib/getFormStateError';

type Props = {
  type: 'new' | 'edit';
  onSubmit: (data: KnowledgeDto) => void;
  loading: boolean;
  defaultValues?: Partial<KnowledgeDto>;
};

export const NewEditKnowledgeCardForm: FC<Props> = ({
  type,
  onSubmit,
  loading = false,
  defaultValues = {},
}) => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<KnowledgeDto>)}>
      <Stack spacing={2} sx={{ width: '320px' }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Это обязательное поле!' }}
          defaultValue={defaultValues.name ?? ''}
          render={({ field, formState }) => {
            const { value, onChange } = field;
            const { error, helperText } = getFormStateError(
              field.name,
              formState
            );

            return (
              <TextField
                label="Название"
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                disabled={loading}
              />
            );
          }}
        />
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          loading={loading}
        >
          {type === 'edit' ? 'Редактировать' : 'Сохранить'}
        </LoadingButton>
      </Stack>
    </form>
  );
};
