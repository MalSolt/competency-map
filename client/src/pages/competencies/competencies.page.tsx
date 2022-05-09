import React, { FC } from 'react';
import { Competencies } from 'widgets/competencies';
import Typography from '@mui/material/Typography';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';

type Props = {};

export const CompetenciesPage: FC<Props> = () => {
  useHeaderTitle('Компетенции');

  return (
    <ContentLayout>
      <Typography variant="h4" component="div" sx={{ marginBottom: '36px' }}>
        Все компетенции
      </Typography>
      <Competencies />
    </ContentLayout>
  );
};
