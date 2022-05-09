import { FC, useState } from 'react';
import { KnowledgeId } from '@kernel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { KnowledgeDto } from '@dto/knowledge';
import { MenuOnButton } from 'shared/ui/MenuOnButton';
import { KnowledgeRemoveConfirm } from './partials/KnowledgeRemoveConfirm';

type Props = {
  knowledge: KnowledgeDto;
  onEdit: (id: KnowledgeId) => void;
};

export const KnowledgeCard: FC<Props> = ({ knowledge, onEdit }) => {
  const [removing, setRemoving] = useState(false);

  const handleEditClick = () => {
    onEdit(knowledge.id);
  };

  const handleRemoveClick = () => {
    setRemoving(true);
  };

  const cancelRemoving = () => {
    setRemoving(false);
  };

  const menuOptions = [
    {
      key: 'edit',
      title: 'Редактировать',
      onClick: handleEditClick,
    },
    {
      key: 'remove',
      title: 'Удалить',
      onClick: handleRemoveClick,
    },
  ];

  return (
    <Card
      sx={{
        position: 'relative',
      }}
    >
      <CardHeader
        action={
          <Box
            sx={{
              position: 'absolute',
              right: '6px',
              top: '6px',
            }}
          >
            <MenuOnButton options={menuOptions} />
          </Box>
        }
      />
      <CardContent>
        <Typography
          variant="h3"
          component="div"
          align="center"
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {knowledge.name}
        </Typography>
      </CardContent>
      <KnowledgeRemoveConfirm
        knowledge={knowledge}
        open={removing}
        onClose={cancelRemoving}
      />
    </Card>
  );
};
