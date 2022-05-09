import React, { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { CompetencyId } from '@kernel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CompetencyDto } from '@dto/competency';
import { DeveloperLevelDto } from '@dto/developerLevel';
import { KnowledgeDto } from '@dto/knowledge';
import {
  useCompetencyEdit,
  useGetCompetencies,
  useGetCompetency,
  useUploadCompetencyAvatar,
} from 'controllers/competencies';
import { useGetKnowledgeList } from 'controllers/knowledge';
import { useGetDeveloperLevels } from 'controllers/developerLevels';
import { BackLink } from 'shared/ui/BackLink';
import { getCompetencyCardsRoute } from 'shared/lib/routeBuilder';
import { EditFormSkeleton } from './partials/EditFormSkeleton';
import { UploadCompetencyAvatar } from './partials/UploadCompetencyAvatar';
import { NewEditCompetencyCardForm } from './partials/NewEditCompetencyCardForm';

type Props = {
  competencyId: CompetencyId;
};

export const CompetencyEditMain: FC<Props> = ({ competencyId }) => {
  const query = useGetCompetency(competencyId);
  const editMutation = useCompetencyEdit();
  const uploadAvatarMutation = useUploadCompetencyAvatar();
  const competenciesQuery = useGetCompetencies();
  const developerLevels = useGetDeveloperLevels();
  const knowledgeQuery = useGetKnowledgeList();
  const competency = query.data;

  const onSubmit: SubmitHandler<CompetencyDto> = (form) => {
    editMutation
      .mutateAsync({
        id: competencyId,
        title: form.title,
        requirements: form.requirements as CompetencyDto[],
        description: form.description,
        developerLevel: form.developerLevel as DeveloperLevelDto,
        knowledges: form.knowledges as KnowledgeDto[],
      })
      .then(() => {
        Router.push(getCompetencyCardsRoute());
      });
  };

  const onAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadAvatarMutation
      .mutateAsync({
        competencyId,
        formData,
      })
      .then(() => {
        Router.push(getCompetencyCardsRoute());
      });
  };

  const defaultValues = {
    title: competency?.title,
    requirements: competency?.requirements,
    description: competency?.description,
    developerLevel: competency?.developerLevel,
    knowledges: competency?.knowledges,
  };

  if (query.isError) {
    // we should make custom error pages and do right redirect
    return <span>error</span>;
  }

  return (
    <Box>
      <BackLink />

      <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
        Редактировать компетенцию
      </Typography>
      {query.isLoading || query.isIdle ? (
        <EditFormSkeleton />
      ) : (
        <Stack spacing={2}>
          {competency && (
            <UploadCompetencyAvatar
              imageName={competency?.image?.imageName}
              title={competency?.title}
              loading={uploadAvatarMutation.isLoading}
              onUpload={onAvatarUpload}
            />
          )}
          <NewEditCompetencyCardForm
            type="edit"
            onSubmit={onSubmit}
            loading={editMutation.isLoading || developerLevels.isLoading}
            defaultValues={defaultValues}
            competencies={competenciesQuery.data ?? []}
            developerLevels={developerLevels.data ?? []}
            knowledges={knowledgeQuery.data ?? []}
          />
        </Stack>
      )}
    </Box>
  );
};
