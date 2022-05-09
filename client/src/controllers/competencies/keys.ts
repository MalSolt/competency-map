import { CompetencyId } from '@kernel';

const baseKey = 'competencies';

export const getCompetenciesListKey = () => [baseKey, 'all'];
export const getCompetencyKeyById = (id: CompetencyId) => [baseKey, 'byId', { id }];