import { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const COMPETENCY_BOX_W = 344;
const COMPETENCY_BOX_H = 128;
const GLOBAL_SX = { borderRadius: '4px' };

export const CompetenciesSkeleton: FC = () => {
  const CompetencyCardJSX = (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={COMPETENCY_BOX_W}
      height={COMPETENCY_BOX_H}
      sx={GLOBAL_SX}
    />
  );

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={234}
          height={56}
          sx={GLOBAL_SX}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={109}
          height={56}
          sx={GLOBAL_SX}
        />
      </Stack>
      <Stack spacing={2} direction="row">
        {CompetencyCardJSX}
        {CompetencyCardJSX}
        {CompetencyCardJSX}
      </Stack>
    </Stack>
  );
};
