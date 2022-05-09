import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export const CompetencyMaterialsSkeleton: FC = () => (
  <Stack spacing={2}>
    <Skeleton variant="rectangular" height={42} />
    <Skeleton variant="rectangular" height={42} />
    <Skeleton variant="rectangular" height={42} />
    <Skeleton variant="rectangular" height={42} />
  </Stack>
);
