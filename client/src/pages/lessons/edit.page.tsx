import { FC } from 'react';
import { LessonId } from '@kernel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { EditLessonTitle } from 'widgets/edit-lesson-title';
import { EditLessonContent } from 'widgets/edit-lesson-content';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { BackLink } from 'shared/ui/BackLink';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';

type Props = {};

export const EditLessonPage: FC<Props> = () => {
  useHeaderTitle('Уроки');

  const lessonId = useParamId<LessonId>('id');

  return (
    <ContentLayout>
      <Box>
        <BackLink />
        <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
          Редактирование урока
        </Typography>

        <Stack spacing={2}>
          <EditLessonTitle lessonId={lessonId} />
          <EditLessonContent lessonId={lessonId} />
        </Stack>
      </Box>
    </ContentLayout>
  );
};
