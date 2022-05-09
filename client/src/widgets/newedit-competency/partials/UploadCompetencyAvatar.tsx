import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Upload } from 'shared/ui/Upload';
import { generateImagesUrl } from 'shared/lib/generateImagesUrl';

type Props = {
  imageName?: string;
  title: string;
  loading?: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadCompetencyAvatar: FC<Props> = ({
  imageName,
  title,
  loading = false,
  onUpload,
}) => (
  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: '24px' }}>
    {imageName && (
      <Avatar
        variant="square"
        src={generateImagesUrl(imageName)}
        sx={{ width: 90, height: 90 }}
      >
        {title.charAt(0)}
      </Avatar>
    )}
    <Upload onChange={onUpload} loading={loading}>
      Загрузить аватар
    </Upload>
  </Stack>
);
