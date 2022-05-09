import { CompetencyId, UserCompetencyId, UserId } from "../kernel";
import { CompetencyDto } from "./competency";
import { UserDto } from "./user";

export type UserCompetencyStatus = 'not_learned' | 'in_progress' | 'learned' | 'confirmed';

export type UserCompetencyDto = {
  id: UserCompetencyId;
  user: UserDto;
  competency: CompetencyDto;
  status: UserCompetencyStatus;
};

export type UpdateUserCompetencyDto = {
  userId: UserId;
  competencyId: CompetencyId;
  status: UserCompetencyStatus;
}

export type UserCompetencyRelationDto = Pick<UserCompetencyDto, 'id' | 'status'>;