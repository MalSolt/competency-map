import { useFilters } from 'shared/lib/hooks/useFilters';
import { CompetencyDto } from '@dto/competency';
import { DeveloperLevelDto } from '@dto/developerLevel';

export type CompetenciesFiltersType = {
  search: string;
  devLevel: DeveloperLevelDto | null;
};

const defaultFilters = {
  search: '',
  devLevel: null,
};

const filterCompetency = (
  item: CompetencyDto,
  { search, devLevel }: CompetenciesFiltersType
) =>
  (!search || item.title.toLowerCase().includes(search.toLowerCase())) &&
  (!devLevel || item?.developerLevel?.id === devLevel?.id);

export const useCompetencyFilters = (competencies: CompetencyDto[]) => {
  const { filters, update, items } = useFilters<
    CompetencyDto,
    CompetenciesFiltersType
  >(competencies ?? [], filterCompetency, defaultFilters);

  return {
    filters,
    update,
    items,
  };
};
