import { KnowledgeId } from "../kernel";

export type KnowledgeDto = {
  id: KnowledgeId;
  name: string;
};

export type CreateKnowledgeDto = Pick<KnowledgeDto, "name">;
export type UpdateKnowledgeDto = Pick<Partial<KnowledgeDto>, "name">;

