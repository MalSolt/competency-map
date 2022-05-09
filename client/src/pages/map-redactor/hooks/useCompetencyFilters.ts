import { CompetencyDto } from '@dto/competency';
import { useFilters } from 'shared/lib/hooks/useFilters';

type MapCompetenciesFilterType = {
  search: string;
};

const defaultFilters = {
  search: '',
};

const filterCompetency = (
  item: CompetencyDto,
  { search }: MapCompetenciesFilterType
) => !search || item.title.toLowerCase().includes(search.toLowerCase());

export const useCompetencyFilters = (competencies: CompetencyDto[]) => {
  const { filters, update, items } = useFilters<
    CompetencyDto,
    MapCompetenciesFilterType
  >(competencies, filterCompetency, defaultFilters);

  return {
    filters,
    update,
    items,
  };
};
