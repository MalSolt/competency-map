import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CompetencyDto } from '@dto/competency';
import { KnowledgeDto } from '@dto/knowledge';

type Props = {
  title: string;
  level?: string;
  size?: 'small' | 'large';
  requirements?: CompetencyDto[];
  knowledges?: KnowledgeDto[];
};

export const CompetencyTitleContent: FC<Props> = ({
  title,
  level,
  size = 'large',
  requirements,
  knowledges,
}) => {
  const variant = useMemo(() => {
    if (size === 'large') {
      return 'h4';
    }

    return 'h5';
  }, [size]);

  const knowledgeTitles = useMemo(
    () =>
      (knowledges ?? []).map((knowledge: KnowledgeDto) => (
        <Chip
          key={knowledge.id}
          label={knowledge.name}
          color="primary"
          variant="outlined"
        />
      )),
    [knowledges]
  );

  const requirementsTitles = useMemo(
    () =>
      (requirements ?? []).map((requirement: CompetencyDto) => (
        <Chip
          label={requirement.title}
          key={requirement.id}
          color="success"
          variant="outlined"
        />
      )),
    [requirements]
  );

  return (
    <Box>
      <Typography
        variant={variant}
        component="div"
        sx={{ whiteSpace: 'pre-wrap' }}
      >
        {!!level && <Chip label={level} color="primary" />} {title}
      </Typography>
      {!!knowledgeTitles.length && (
        <Box>
          <Box sx={{ mt: 1 }}>Области знаний:</Box>
          <Stack direction="row" spacing={1}>
            {knowledgeTitles}
          </Stack>
        </Box>
      )}
      {!!requirementsTitles.length && (
        <Box>
          <Box sx={{ mt: 1 }}>Зависит от:</Box>
          <Stack direction="row" spacing={1}>
            {requirementsTitles}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
