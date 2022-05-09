import React, { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { CompetencyDto } from '@dto/competency';
import { DeveloperLevelDto } from '@dto/developerLevel';
import {
  useCompetencyEdit,
  useGetCompetencies,
} from 'controllers/competencies';
import { useGetDeveloperLevels } from 'controllers/developerLevels';
import { useAvatarUpload } from 'controllers/competencies/useAvatarUpload';
import { useGetKnowledgeList } from 'controllers/knowledge';
import { Modal } from 'shared/ui/Modal';
import { KnowledgeDto } from '@dto/knowledge';
import { UploadCompetencyAvatar } from './partials/UploadCompetencyAvatar';
import { NewEditCompetencyCardForm } from './partials/NewEditCompetencyCardForm';

type Props = {
  competency: CompetencyDto;
  open: boolean;
  onClose: () => void;
};

export const CompetencyEditModal: FC<Props> = ({
  competency,
  open,
  onClose,
}) => {
  const editMutation = useCompetencyEdit();
  const avatarUpload = useAvatarUpload();
  const competenciesQuery = useGetCompetencies();
  const developerLevels = useGetDeveloperLevels();
  const knowledgeQuery = useGetKnowledgeList();

  const onSubmit: SubmitHandler<CompetencyDto> = (form) => {
    editMutation
      .mutateAsync({
        id: competency.id,
        title: form.title,
        requirements: form.requirements as CompetencyDto[],
        description: form.description,
        developerLevel: form.developerLevel as DeveloperLevelDto,
        knowledges: form.knowledges as KnowledgeDto[],
      })
      .then(() => {
        onClose();
      });
  };

  const onAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) =>
    avatarUpload(event, competency.id);

  const defaultValues = {
    title: competency?.title,
    requirements: competency?.requirements,
    description: competency?.description,
    developerLevel: competency?.developerLevel,
    knowledges: competency?.knowledges,
  };

  return (
    <Modal open={open} onClose={onClose} withoutCloseIcon>
      <Stack spacing={2}>
        <UploadCompetencyAvatar
          imageName={competency?.image?.imageName}
          title={competency?.title}
          onUpload={onAvatarUpload}
        />
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
    </Modal>
  );
};
