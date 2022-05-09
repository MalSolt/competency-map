import { FC } from 'react';
import Router from 'next/router';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { UserDto } from '@dto/user';
import { getUserRoute } from 'shared/lib/routeBuilder';

type Props = {
  user: UserDto;
};

export const UserCard: FC<Props> = ({ user }) => {
  const handleShowClick = () => {
    Router.push(getUserRoute(user.id));
  };

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={handleShowClick}
    >
      <CardContent>
        <Typography variant="h3" component="div" align="center">
          {`${user.first_name} ${user.second_name}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
