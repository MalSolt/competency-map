import { DeveloperLevelId } from '../kernel';

export type DeveloperLevelDto = {
  id: DeveloperLevelId;
  name: string;
};

export type CreateDeveloperLevelDto = Pick<DeveloperLevelDto, "name">;
