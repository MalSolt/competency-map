import { UserId } from '@kernel';

const baseKey = 'user-competencies';

export const getUserCompetenciesListKey = (userId: UserId) => [baseKey, 'byUserId', { userId }];