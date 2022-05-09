import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { CompetencyDto } from '@dto/competency';
import { DeveloperLevelDto } from '@dto/developerLevel';
import { getFormStateError } from 'shared/lib/getFormStateError';
import { KnowledgeDto } from '@dto/knowledge';

type Props = {
  type: 'new' | 'edit';
  onSubmit: SubmitHandler<CompetencyDto>;
  loading: boolean;
  defaultValues?: Partial<CompetencyDto>;
  competencies: Pick<CompetencyDto, 'id' | 'title'>[];
  developerLevels: Pick<DeveloperLevelDto, 'id' | 'name'>[];
  knowledges: Pick<KnowledgeDto, 'id' | 'name'>[];
};

export const NewEditCompetencyCardForm: FC<Props> = ({
  type,
  onSubmit,
  loading = false,
  defaultValues = {
    requirements: [],
    developerLevel: null,
    knowledges: [],
  },
  competencies,
  developerLevels,
  knowledges,
}) => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ width: '320px' }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Это обязательное поле' }}
          defaultValue={defaultValues.title ?? ''}
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
                data-testid="competency-card-form-title"
                multiline
                rows={3}
              />
            );
          }}
        />
        <Controller
          name="requirements"
          control={control}
          defaultValue={defaultValues.requirements}
          render={({ field }) => (
            <Autocomplete
              options={competencies}
              getOptionLabel={(option) => option.title}
              value={field.value}
              onChange={(_, data) => field.onChange(data)}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Зависимости"
                  placeholder="Выберите зависимости"
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              multiple
            />
          )}
        />
        <Controller
          name="developerLevel"
          control={control}
          defaultValue={defaultValues.developerLevel}
          render={({ field }) => (
            <Autocomplete
              options={developerLevels}
              getOptionLabel={(option) => option.name}
              value={field.value}
              onChange={(_, data) => field.onChange(data)}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Уровень разработчика"
                  placeholder="Выберите уровень"
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          )}
        />
        <Controller
          name="knowledges"
          control={control}
          defaultValue={defaultValues.knowledges}
          render={({ field }) => (
            <Autocomplete
              options={knowledges}
              getOptionLabel={(option) => option.name}
              value={field.value}
              onChange={(_, data) => field.onChange(data)}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Область знаний"
                  placeholder="Выберите область знаний"
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              multiple
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={defaultValues.description ?? ''}
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <TextField
                label="Описание"
                value={value}
                onChange={onChange}
                disabled={loading}
                multiline
                rows={3}
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
