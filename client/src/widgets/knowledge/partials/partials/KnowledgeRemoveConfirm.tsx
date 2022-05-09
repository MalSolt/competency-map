import { FC } from 'react';
import { Confirmation } from 'shared/ui/Confirmation';
import { useKnowledgeRemove } from 'controllers/knowledge';
import { KnowledgeDto } from '@dto/knowledge';

type Props = {
  knowledge: KnowledgeDto;
  open: boolean;
  onClose: () => void;
};

export const KnowledgeRemoveConfirm: FC<Props> = ({
  knowledge,
  open,
  onClose,
}) => {
  const knowledgeMutation = useKnowledgeRemove();

  const onSubmit = () => {
    knowledgeMutation
      .mutateAsync({
        id: knowledge.id,
        name: knowledge.name,
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
      title={`Вы действительно хотите удалить область знаний "${knowledge.name}" ?`}
      description="Подтверждая это действие, все данные об этой области знаний будут утеряны для всех пользователей без возможности восстановления."
      disabled={knowledgeMutation.isLoading}
      loading={knowledgeMutation.isLoading}
    />
  );
};
