import { FC } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { CompetenciesFilters as CompetenciesFiltersInterface } from 'shared/lib/hooks/useCompetenciesFilter';
import { DeveloperLevelAutocomplete } from 'widgets/DeveloperLevelAutocomplete';
import { KnowledgeAutocomplete } from 'widgets/KnowledgeAutocomplete';

type Props = {
  filters: CompetenciesFiltersInterface;
  changeFilters: (filters: CompetenciesFiltersInterface) => void;
};

export const CompetenciesFilters: FC<Props> = ({ filters, changeFilters }) => (
  <>
    <TextField
      sx={{ width: '240px' }}
      label="Фильтр названию"
      placeholder="Введите название"
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      value={filters.title}
      onChange={(e) => changeFilters({ title: e.target.value })}
      data-testid="competency-search"
    />

    <DeveloperLevelAutocomplete
      sx={{ width: '240px' }}
      label="Фильтровать по уровню"
      value={filters.developerLevelId}
      onChange={(id) => changeFilters({ developerLevelId: id })}
    />

    <KnowledgeAutocomplete
      sx={{ width: '240px' }}
      label="Фильтровать по знаниям"
      value={filters.knowledgeId}
      onChange={(ids) => changeFilters({ knowledgeId: ids })}
    />
  </>
);
