import { CompetencyDto } from '@dto/competency';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Dispatch, FC, memo } from 'react';
import {
  CompetenciesFilters,
  useCompetenciesFilter,
} from 'shared/lib/hooks/useCompetenciesFilter';
import { DeveloperLevelAutocomplete } from 'widgets/DeveloperLevelAutocomplete';
import { KnowledgeAutocomplete } from 'widgets/KnowledgeAutocomplete';
import { MapStateActions } from 'widgets/map';

type Props = {
  filters: CompetenciesFilters;
  changeFilters: (filters: CompetenciesFilters) => void;
  onChangeMap: Dispatch<MapStateActions>;
  competencies: CompetencyDto[];
};

export const MapViewSettings: FC<Props> = memo(
  ({ filters, changeFilters, onChangeMap, competencies }) => {
    const { filteredCompetencies } = useCompetenciesFilter(competencies, {
      withPosition: true,
    });

    return (
      <Stack spacing={2}>
        <Autocomplete
          disablePortal
          options={filteredCompetencies.map((box) => ({
            position: box.position,
            label: box.title,
          }))}
          renderInput={(params) => (
            <TextField {...params} label="Поиск по карте" />
          )}
          onChange={(_, newValue) => {
            const position = newValue?.position;
            if (position) {
              onChangeMap({
                type: 'moveToPoint',
                point: position,
              });
            }
          }}
          fullWidth
        />

        <KnowledgeAutocomplete
          fullWidth
          label="Фильтровать по знаниям"
          value={filters.knowledgeId}
          onChange={(ids) => changeFilters({ knowledgeId: ids })}
        />

        <DeveloperLevelAutocomplete
          fullWidth
          label="Фильтровать по уровню"
          value={filters.developerLevelId}
          onChange={(id) => changeFilters({ developerLevelId: id })}
        />
      </Stack>
    );
  }
);
