import { DeveloperLevelId } from '@kernel';

export const developerLevelBaseKey = 'developerLevel';

export const getDeveloperLevelsListKey = () => [developerLevelBaseKey, 'all'];
export const getDeveloperLevelByIdKey = (id: DeveloperLevelId) => [
  developerLevelBaseKey,
  'byId',
  { id },
];
