import { CompetencyId } from "../kernel";
import { DeveloperLevelDto } from "./developerLevel";
import { PositionDto } from "./competencyPosition";
import { ImageDto } from "./image";
import { MaterialDto } from "./material";
import { UserCompetencyRelationDto } from "./userCompetency";
import { KnowledgeDto } from "./knowledge";

export type CompetencyDto = {
  id: CompetencyId;
  title: string;
  description?: string;
  image?: ImageDto;
  developerLevel?: DeveloperLevelDto;
  position?: PositionDto;
  requirements?: CompetencyDto[];
  materials?: MaterialDto[];
  knowledges?: KnowledgeDto[];
};

export type CompetencyWithUserDto = CompetencyDto & {
  userCompetencyInfo: UserCompetencyRelationDto;
};

export type CompetencyForMapDto = CompetencyDto &
  Pick<Required<CompetencyDto>, "position"> & {
    requirements: CompetencyForMapDto[];
  };

export type CompetencyWithUserForMapDto = CompetencyWithUserDto &
  Pick<Required<CompetencyWithUserDto>, "position"> & {
    requirements: CompetencyWithUserForMapDto[];
  };

export type CreateCompetencyDto = Pick<
  CompetencyDto,
  "title" | "requirements" | "description" | "developerLevel" | "knowledges"
>;

export type UpdateCompetencyDto = Pick<
  Partial<CompetencyDto>,
  | "title"
  | "requirements"
  | "description"
  | "developerLevel"
  | "knowledges"
  | "image"
>;

export type UploadCompetencyAvatarDto = FormData;
