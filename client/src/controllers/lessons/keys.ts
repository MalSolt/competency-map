import { LessonId } from "@kernel";

const baseKey = 'lessons';

export const getLessonsKey = () => [baseKey, 'all'];
export const getLessonByIdKey = (id: LessonId) => [baseKey, 'byId', { id: Number(id) }];

