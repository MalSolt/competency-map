import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Knowledge } from 'widgets/knowledge';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';

type Props = {};

export const KnowledgePage: FC<Props> = () => {
  useHeaderTitle('Knowledge');

  return (
    <ContentLayout>
      <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
        Облостей знаний
      </Typography>
      <Knowledge />
    </ContentLayout>
  );
};
