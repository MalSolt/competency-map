import { CompetencyId, MaterialId, MaterialsCollectionId } from "../kernel";
import { CompetencyDto } from "./competency";
import { LessonDto } from "./lesson";
import { MaterialsCollectionDto } from "./materialsCollection";

export type MaterialContentType = 'lesson' | 'collection';

export type MaterialBase = {
  id: MaterialId;
  competency: CompetencyDto;
  order: number;
};

export type MaterialWithLessonDto = MaterialBase & {
  title: string;
  contentType: 'lesson';
  lesson: LessonDto;
}

export type MaterialWithCollectionDto = MaterialBase & {
  title: string;
  contentType: 'collection';
  collection: MaterialsCollectionDto;
}

export type MaterialDto = MaterialBase & {
  lesson?: LessonDto;
  collection?: MaterialsCollectionDto;
};

export type MaterialWithContentTypeDto = MaterialWithLessonDto | MaterialWithCollectionDto;

export type CreateMaterialDto = {
  competencyId: CompetencyId;
  ownerCollectionId: MaterialsCollectionId | null;
  title: string;
  contentType: MaterialContentType;
};

export type DeleteMaterialDto = {
  id: MaterialId;
  contentType: MaterialContentType;
}

export type SwapCollectionDto = MaterialId[];