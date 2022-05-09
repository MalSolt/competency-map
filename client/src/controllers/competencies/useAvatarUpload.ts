import { CompetencyId } from '@kernel';
import { useUploadCompetencyAvatar } from '.';

export const useAvatarUpload = () => {
  const uploadAvatarMutation = useUploadCompetencyAvatar();

  const onAvatarUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    competencyId: CompetencyId
  ) => {
    const file = e.target.files![0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadAvatarMutation.mutateAsync({
      competencyId,
      formData,
    });
  };

  return onAvatarUpload;
};
