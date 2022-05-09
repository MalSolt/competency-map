import { FC } from 'react';
import { CompetencyDto } from '@dto/competency';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetCompetencies } from 'controllers/competencies';
import { Link } from 'shared/ui/Link';
import { getCompetencyCardNewRoute } from 'shared/lib/routeBuilder';
import { useCompetenciesFilter } from 'shared/lib/hooks/useCompetenciesFilter';
import { CompetenciesSkeleton } from './partials/CompetenciesSkeleton';
import { CompetencyCard } from './partials/CompetencyCard';
import { CompetenciesFilters } from './partials/CompetenciesFilter';

type Props = {};

export const Competencies: FC<Props> = () => {
  const competenciesQuery = useGetCompetencies();
  const competencies = competenciesQuery.data as CompetencyDto[];

  const competenciesFilters = useCompetenciesFilter(competencies);

  if (competenciesQuery.isLoading) {
    return <CompetenciesSkeleton />;
  }

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ marginBottom: '18px' }}>
        <CompetenciesFilters
          filters={competenciesFilters.filters}
          changeFilters={competenciesFilters.changeFilters}
        />
        <Button
          component={Link}
          href={getCompetencyCardNewRoute()}
          variant="contained"
        >
          Добавить
        </Button>
      </Stack>
      {competenciesFilters.filteredCompetencies.length ? (
        <Grid spacing={2} data-testid="competencies-container" container>
          {competenciesFilters.filteredCompetencies.map(
            (competency: CompetencyDto) => (
              <Grid key={competency.id} xs={4} item>
                <CompetencyCard competency={competency} />
              </Grid>
            )
          )}
        </Grid>
      ) : (
        <Typography align="center" sx={{ padding: '60px 0' }}>
          Список пуст
        </Typography>
      )}
    </>
  );
};
