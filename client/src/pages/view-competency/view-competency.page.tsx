import { CompetencyDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetCompetency } from 'controllers/competencies';
import React from 'react';
import { generateImagesUrl } from 'shared/lib/generateImagesUrl';
import { useParamId } from 'shared/lib/hooks/useParamId';

export const ViewCompetencyPage = () => {
  const competencyId = useParamId<CompetencyId>('competencyId');
  const competencyQuery = useGetCompetency(competencyId);

  return (
    <Stack spacing={2} direction="column" sx={{ margin: '12px' }}>
      <Avatar
        alt="Avatar"
        src={generateImagesUrl(competencyQuery.data?.image?.imageName)}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="body1">
        Название: {competencyQuery.data?.title}
      </Typography>
      <Typography variant="body1">
        Уровень разработчика: {competencyQuery.data?.developerLevel?.name}
      </Typography>
      <Typography variant="body1">
        описание: {competencyQuery.data?.description}
      </Typography>
      <Typography variant="body1">
        зависимости:
        {competencyQuery.data?.requirements
          ?.map((e: CompetencyDto) => e.title)
          ?.join(', ')}
      </Typography>
    </Stack>
  );
};
