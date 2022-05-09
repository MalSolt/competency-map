import { FC } from 'react';
import { KnowledgeId } from '@kernel';
import { KnowledgeDto } from '@dto/knowledge';
import { useGetKnowledge, useKnowledgeEdit } from 'controllers/knowledge';
import { NewEditKnowledgeCardForm } from './partials/NewEditKnowledgeCardForm';
import { EditKnowLedgeCardFormSkeleton } from './partials/EditKnowledgeCardFormSkeleton';

type Props = {
  knowledgeId: KnowledgeId | null;
  onFinish: () => void;
};

export const KnowledgeCardEditForm: FC<Props> = ({ knowledgeId, onFinish }) => {
  const knowledgeQuery = useGetKnowledge(knowledgeId);
  const knowledgeMutation = useKnowledgeEdit();
  const knowledge = knowledgeQuery.data;

  const onSubmit = (form: KnowledgeDto) => {
    if (!knowledge) {
      return;
    }

    knowledgeMutation
      .mutateAsync({
        id: knowledge.id,
        name: form.name,
      })
      .then(() => {
        onFinish();
      });
  };

  if (knowledgeQuery.isError) {
    return <span>Error</span>;
  }

  if (knowledgeQuery.isIdle || knowledgeQuery.isLoading) {
    return <EditKnowLedgeCardFormSkeleton />;
  }

  const defaultValues = {
    name: knowledge?.name,
  };

  return (
    <NewEditKnowledgeCardForm
      type="edit"
      onSubmit={onSubmit}
      loading={knowledgeMutation.isLoading}
      defaultValues={defaultValues}
    />
  );
};
