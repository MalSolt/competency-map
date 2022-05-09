import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { FC } from 'react';

type Props = {};

export const EditLessonTitleSkeleton: FC<Props> = () => (
  <Box>
    <Skeleton variant="rectangular" width="360px" height="40px" />
  </Box>
);
