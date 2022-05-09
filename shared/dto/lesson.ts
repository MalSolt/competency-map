import { LessonId } from "../kernel";
import { CustomDescendant } from "../textEditor";

export type LessonDto = {
  id: LessonId;
  title: string;
  content: CustomDescendant[];
};

export type CreateLessonDto = Pick<LessonDto, 'title'>;
export type UpdateLessonDto = Pick<LessonDto, 'title'>;
export type UpdateLessonContentDto = Pick<LessonDto, 'content'>;