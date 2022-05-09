import { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const EditKnowLedgeCardFormSkeleton: FC = () => (
  <Stack spacing={2} sx={{ width: '320px' }}>
    <Typography variant="h3">
      <Skeleton variant="rectangular" />
    </Typography>
    <Typography variant="h4">
      <Skeleton variant="rectangular" />
    </Typography>
  </Stack>
);
