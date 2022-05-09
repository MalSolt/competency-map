import { LessonId } from '@kernel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getLessonByIdKey } from './keys';

export const useGetLesson = (lessonId: LessonId) => {
  const res = useQuery(
    getLessonByIdKey(lessonId),
    () => axiosInstance.get(`/lessons/${lessonId}`),
    {
      enabled: !!lessonId,
    }
  );

  return res;
};
