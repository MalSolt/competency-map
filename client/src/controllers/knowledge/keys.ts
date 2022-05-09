import { KnowledgeId } from '@kernel';

export const knowledgeBaseKey = 'knowledge';

export const getKnowledgeListKey = () => [knowledgeBaseKey, 'all'];
export const getKnowledgeKeyById = (id: KnowledgeId | null) => [
  knowledgeBaseKey,
  'byId',
  { id },
];
