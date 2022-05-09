import { FC } from 'react';
import { MaterialId } from '@kernel';
import { Confirmation } from 'shared/ui/Confirmation';
import { useMaterialRemove } from 'controllers/materials';
import { MaterialContentType } from '@dto/material';

type Props = {
  materialId: MaterialId | null;
  type: MaterialContentType | null;
  title: string | null;
  open: boolean;
  onClose: () => void;
};

export const MaterialRemoveConfirm: FC<Props> = ({
  materialId,
  type,
  title,
  open,
  onClose,
}) => {
  const removeMutation = useMaterialRemove();

  const onSubmit = () => {
    if (!materialId || !type || !title) {
      return;
    }

    removeMutation
      .mutateAsync({
        materialId,
        type,
        title,
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
      title={`Вы действительно хотите удалить ${
        type === 'lesson' ? 'урок' : 'коллекцию'
      } "${title}" ?`}
      description={`Подтверждая это действие, все данные об ${
        type === 'lesson' ? 'этом уроке' : 'этой коллекции'
      } будут утеряны без возможности восстановления.`}
      disabled={removeMutation.isLoading}
      loading={removeMutation.isLoading}
    />
  );
};
