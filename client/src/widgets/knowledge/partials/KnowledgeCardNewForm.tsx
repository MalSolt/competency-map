import { FC } from 'react';
import { KnowledgeDto } from '@dto/knowledge';
import { useKnowledgeNew } from 'controllers/knowledge';
import { NewEditKnowledgeCardForm } from './partials/NewEditKnowledgeCardForm';

type Props = {
  onFinish: () => void;
};

export const KnowledgeCardNewForm: FC<Props> = ({ onFinish }) => {
  const knowledgeMutation = useKnowledgeNew();

  const onSubmit = (form: KnowledgeDto) => {
    knowledgeMutation.mutateAsync(form).then(() => {
      onFinish();
    });
  };

  return (
    <NewEditKnowledgeCardForm
      type="new"
      onSubmit={onSubmit}
      loading={knowledgeMutation.isLoading}
    />
  );
};
