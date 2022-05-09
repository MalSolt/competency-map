import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CreateMaterialDto, MaterialContentType } from '@dto/material';
import { CompetencyId } from '@kernel';
import { LoadingButton } from '@mui/lab';
import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { getFormStateError } from 'shared/lib/getFormStateError';
import { useMaterialCreate } from 'controllers/materials/useMaterialCreate';

type Props = {
  contentType: MaterialContentType | null;
  competencyId: CompetencyId;
  collectionId?: OwnerMaterialsCollectionId;
  onClose: () => void;
};

export const MaterialCreateForm: FC<Props> = ({
  contentType,
  competencyId,
  collectionId = null,
  onClose,
}) => {
  const createMaterialMutation = useMaterialCreate();
  const { control, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<Pick<CreateMaterialDto, 'title'>> = ({
    title,
  }) => {
    if (!contentType) {
      return;
    }

    createMaterialMutation
      .mutateAsync({
        title,
        contentType,
        competencyId,
        ownerCollectionId: collectionId,
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ width: '320px' }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Это обязательное поле' }}
          defaultValue=""
          render={({ field, formState }) => {
            const { value, onChange } = field;
            const { error, helperText } = getFormStateError(
              field.name,
              formState
            );

            return (
              <TextField
                label="Название"
                placeholder="Введите название"
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                disabled={createMaterialMutation.isLoading}
              />
            );
          }}
        />
        <Stack spacing={2} direction="row" justifyContent="center">
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            disabled={createMaterialMutation.isLoading}
            loading={createMaterialMutation.isLoading}
          >
            Создать
          </LoadingButton>
          <Button
            variant="contained"
            color="error"
            size="large"
            disabled={createMaterialMutation.isLoading}
            onClick={onClose}
          >
            Закрыть
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
