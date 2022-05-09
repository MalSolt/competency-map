import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CompetencyNew } from 'widgets/newedit-competency';
import { getCompetencyCardsRoute } from 'shared/lib/routeBuilder';
import { Link } from 'shared/ui/Link';

type Props = {};

export const NewCompetencyPage: FC<Props> = () => (
  <Box>
    <Box sx={{ marginBottom: '12px' }}>
      <Link href={getCompetencyCardsRoute()}>Вернуться на главную</Link>
    </Box>
    <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
      Новая компетенция
    </Typography>
    <CompetencyNew />
  </Box>
);
