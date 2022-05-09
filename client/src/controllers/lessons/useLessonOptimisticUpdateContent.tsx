import { LessonDto } from '@dto/lesson';
import { LessonId } from '@kernel';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Descendant } from 'slate';
import { getLessonByIdKey } from './keys';

export const useLessonOptimisticUpdateContent = (lessonId: LessonId) => {
  const queryClient = useQueryClient();

  const optimisticUpdate = useCallback(
    (content: Descendant[]) => {
      const lesson = queryClient.getQueryData(
        getLessonByIdKey(lessonId)
      ) as LessonDto;
      queryClient.setQueryData(getLessonByIdKey(lessonId), {
        ...lesson,
        content,
      });
    },
    [lessonId, queryClient]
  );

  return optimisticUpdate;
};
