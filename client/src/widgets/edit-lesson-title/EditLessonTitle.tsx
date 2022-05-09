import React, { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LessonId } from '@kernel';
import EditIcon from '@mui/icons-material/Edit';
import { useGetLesson, useLessonUpdate } from 'controllers/lessons';
import { EditLessonTitleSkeleton } from './partials/EditLessonTitleSkeleton';

type Props = {
  lessonId: LessonId;
};

export const EditLessonTitle: FC<Props> = ({ lessonId }) => {
  const lessonQuery = useGetLesson(lessonId);
  const lessonMutation = useLessonUpdate();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>('');
  const lesson = lessonQuery.data;

  const handleOpenEditMode = () => {
    setEditMode(true);
    setTitle(lesson.title);
  };

  const handleCloseEditMode = () => {
    setEditMode(false);
    setTitle('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && lesson) {
      if (!title || title === lesson.title) {
        handleCloseEditMode();
        return;
      }

      lessonMutation
        .mutateAsync({
          lessonId,
          currentTitle: lesson.title,
          updateLessonParams: { title },
        })
        .then(() => {
          handleCloseEditMode();
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (lessonQuery.isIdle || lessonQuery.isLoading) {
    return <EditLessonTitleSkeleton />;
  }

  if (lessonQuery.isError) {
    return <span>error boundry</span>;
  }

  return (
    <Stack spacing={2} direction="row">
      {!editMode ? (
        <>
          <Typography variant="h5" component="div">
            {lesson.title}
          </Typography>
          <IconButton
            color="secondary"
            size="small"
            onClick={handleOpenEditMode}
          >
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <TextField
          sx={{ width: '320px' }}
          label="Заголовок"
          variant="outlined"
          value={title}
          disabled={lessonMutation.isLoading}
          placeholder="Введите заголовок для урока"
          onChange={handleChange}
          onBlur={handleCloseEditMode}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      )}
    </Stack>
  );
};
