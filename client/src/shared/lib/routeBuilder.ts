import { KnowledgeId, UserId, CompetencyId, LessonId } from '@kernel';

// competencies page
export const getCompetencyCardsRoute = () => '/competencies';
export const getCompetencyRoute = (
  userId: UserId,
  competencyId: CompetencyId
) => `/users/${userId}/competency/${competencyId}`;
export const getCompetencyCardEditRoute = (id: CompetencyId) =>
  `/competencies/${id}`;
export const getCompetencyCardNewRoute = () => '/competencies/new';
export const getCompetencyMapRoute = () => '/map-redactor';
export const getUserCompetencyMapRoute = (id: UserId) => `/user-map/${id}`;

// users
export const getUsersRoute = () => '/users';
export const getUserRoute = (id: UserId) => `/users/${id}`;

// knowledge
export const getKnowledgeRoute = () => '/knowledge';
export const getKnowledgeEditRoute = (id: KnowledgeId) => `/knowledge/${id}`;
export const getKnowledgeNewRoute = () => '/knowledge/new';

// lessons page
export const getLessonRoute = (id: LessonId, competencyId: CompetencyId) =>
  `/lessons/${id}?competencyId=${competencyId}`;

// collections page
export const getCollectionRoute = (ids: string, competencyId: CompetencyId) =>
  `/collections/${ids}?competencyId=${competencyId}`;

// auth
export const getLoginRoute = () => '/login';
export const getHomeRoute = () => '/';
