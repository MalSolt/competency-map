import { FC } from 'react';
import { Descendant } from 'slate';
import { useDebouncedCallback } from 'use-debounce';
import { LessonId } from '@kernel';
import {
  useGetLesson,
  useLessonUpdateContent,
  useLessonOptimisticUpdateContent,
} from 'controllers/lessons';
import { TextEditor } from 'widgets/text-editor';

type Props = {
  lessonId: LessonId;
};

export const EditLessonContent: FC<Props> = ({ lessonId }) => {
  const lessonQuery = useGetLesson(lessonId);
  const lessonMutation = useLessonUpdateContent();
  const optimisticUpdate = useLessonOptimisticUpdateContent(lessonId);
  const lesson = lessonQuery.data;

  const handleBackendChange = useDebouncedCallback((content: Descendant[]) => {
    lessonMutation.mutate({
      lessonId,
      updateLessonContent: { content },
    });
  }, 2000);

  const handleChange = (content: Descendant[]) => {
    if (!lesson || !lesson.content || !content) {
      return;
    }

    if (lesson.content === content) {
      return;
    }

    handleBackendChange(content);
    optimisticUpdate(content);
  };

  if (lessonQuery.isIdle || lessonQuery.isLoading) {
    return null;
  }

  if (lessonQuery.isError) {
    return <span>error boundry</span>;
  }

  return <TextEditor value={lesson.content} onChange={handleChange} />;
};
