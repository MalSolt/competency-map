import { FC } from 'react';
import { CompetencyDto } from '@dto/competency';
import { useCompetencyRemove } from 'controllers/competencies';
import { Confirmation } from 'shared/ui/Confirmation';

type Props = {
  competency: CompetencyDto;
  open: boolean;
  onClose: () => void;
};

export const CompetencyRemoveConfirm: FC<Props> = ({
  competency,
  open,
  onClose,
}) => {
  const mutation = useCompetencyRemove();

  const onSubmit = () => {
    mutation
      .mutateAsync({
        id: competency.id,
        title: competency.title,
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <Confirmation
      open={open}
      onAccept={onSubmit}
      onCancel={onClose}
      title={`Вы действительно хотите удалить компетенцтию "${competency.title}" ?`}
      description="Подтверждая это действие, все данные об этой компетенции будут утеряны для всех пользователей без возможности восстановления."
      disabled={mutation.isLoading}
      loading={mutation.isLoading}
    />
  );
};
