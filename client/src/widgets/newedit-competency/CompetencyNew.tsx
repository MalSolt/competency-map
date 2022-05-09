import { FC } from 'react';
import Router from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { CreateCompetencyDto } from '@dto/competency';
import { useCompetencyNew, useGetCompetencies } from 'controllers/competencies';
import { useGetDeveloperLevels } from 'controllers/developerLevels';
import { useGetKnowledgeList } from 'controllers/knowledge';
import { getCompetencyCardsRoute } from 'shared/lib/routeBuilder';
import { NewEditCompetencyCardForm } from './partials/NewEditCompetencyCardForm';

type Props = {};

export const CompetencyNew: FC<Props> = () => {
  const mutation = useCompetencyNew();
  const competenciesQuery = useGetCompetencies();
  const devLevelsQuery = useGetDeveloperLevels();
  const knowledgeQuery = useGetKnowledgeList();

  const onSubmit: SubmitHandler<CreateCompetencyDto> = (form) => {
    mutation.mutateAsync(form as CreateCompetencyDto).then(() => {
      Router.push(getCompetencyCardsRoute());
    });
  };

  return (
    <NewEditCompetencyCardForm
      type="new"
      onSubmit={onSubmit}
      loading={mutation.isLoading}
      competencies={competenciesQuery.data ?? []}
      developerLevels={devLevelsQuery.data ?? []}
      knowledges={knowledgeQuery.data ?? []}
    />
  );
};
