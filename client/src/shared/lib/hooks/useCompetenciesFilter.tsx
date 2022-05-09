import { CompetencyDto } from '@dto/competency';
import { DeveloperLevelId, KnowledgeId } from '@kernel';
import { useMemo, useState } from 'react';

export interface CompetenciesFilters {
  knowledgeId?: KnowledgeId[];
  developerLevelId?: DeveloperLevelId | undefined;
  title?: string;
  withPosition?: boolean | 'all';
}

export function useCompetenciesFilter<T extends CompetencyDto>(
  competencies: T[],
  defaultValues?: CompetenciesFilters
) {
  const [filters, setFilters] = useState<CompetenciesFilters>(
    defaultValues ?? { withPosition: 'all' }
  );

  const changeFilters = (options: CompetenciesFilters) =>
    setFilters((prev) => ({ ...prev, ...options }));

  let filteredCompetencies = competencies;

  filteredCompetencies = useMemo(() => {
    if (filters.withPosition === 'all') {
      return filteredCompetencies;
    }
    if (!filters.withPosition) {
      return filteredCompetencies.filter((competency) => !competency.position);
    }
    return filteredCompetencies.filter((competency) => competency.position);
  }, [filters.withPosition, filteredCompetencies]);

  filteredCompetencies = useMemo(() => {
    if (!filters.knowledgeId?.length) {
      return filteredCompetencies;
    }
    return filteredCompetencies.filter((competency) =>
      competency.knowledges
        ?.map((knowledge) => knowledge.id)
        .some((id) => filters.knowledgeId?.includes(id))
    );
  }, [filters.knowledgeId, filteredCompetencies]);

  filteredCompetencies = useMemo(() => {
    if (!filters.developerLevelId) {
      return filteredCompetencies;
    }
    return filteredCompetencies.filter(
      (competency) => competency.developerLevel?.id === filters.developerLevelId
    );
  }, [filters.developerLevelId, filteredCompetencies]);

  filteredCompetencies = useMemo(() => {
    if (!filters.title) {
      return filteredCompetencies;
    }

    return filteredCompetencies.filter((competency) =>
      competency.title
        .toLowerCase()
        .includes(String(filters.title).toLowerCase())
    );
  }, [filters.title, filteredCompetencies]);

  return {
    filters,
    changeFilters,
    filteredCompetencies,
  };
}
