import { FC, useState } from 'react';
import Router from 'next/router';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { CompetencyDto } from '@dto/competency';
import { MenuOnButton } from 'shared/ui/MenuOnButton';
import { getCompetencyCardEditRoute } from 'shared/lib/routeBuilder';
import { generateImagesUrl } from 'shared/lib/generateImagesUrl';
import { CompetencyRemoveConfirm } from './partials/CompetencyRemoveConfirm';
import { CompetencyTitleContent } from './partials/CompetencyTitleContent';

type Props = {
  competency: CompetencyDto;
};

export const CompetencyCard: FC<Props> = ({ competency }) => {
  const [removing, setRemoving] = useState(false);

  const handleEditClick = () => {
    Router.push(getCompetencyCardEditRoute(competency.id));
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
        avatar={
          <Avatar
            alt=" "
            src={generateImagesUrl(competency.image?.imageName)}
            sx={{ width: 48, height: 48 }}
          />
        }
        action={<MenuOnButton options={menuOptions} />}
      />
      <CardContent>
        <CompetencyTitleContent
          level={competency.developerLevel?.name}
          title={competency.title}
          requirements={competency.requirements}
          knowledges={competency.knowledges}
        />
      </CardContent>
      <CompetencyRemoveConfirm
        competency={competency}
        open={removing}
        onClose={cancelRemoving}
      />
    </Card>
  );
};
