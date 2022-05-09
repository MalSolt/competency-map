import { FC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import {
  getCompetencyCardsRoute,
  getCompetencyMapRoute,
  getUsersRoute,
  getKnowledgeRoute,
  getUserCompetencyMapRoute,
} from 'shared/lib/routeBuilder';
import { Can } from 'shared/lib/ablity/abilityContext';
import { useGetMe } from 'controllers/users';

export type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Menu: FC<Props> = ({ isOpen, onToggle }) => {
  const meQuery = useGetMe();

  if (!meQuery.data) return null;
  return (
    <Drawer open={isOpen} onClose={onToggle}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onToggle}
        onKeyDown={onToggle}
      >
        <List>
          <Link href={getUserCompetencyMapRoute(meQuery.data.id)} passHref>
            <ListItem button>
              <ListItemText primary="Моя карта" />
            </ListItem>
          </Link>
          <Can I="manage" a="Competency">
            <Link href={getCompetencyMapRoute()} passHref>
              <ListItem button>
                <ListItemText primary="Редактор карты" />
              </ListItem>
            </Link>
          </Can>
          <Link href={getCompetencyCardsRoute()} passHref>
            <ListItem button>
              <ListItemText primary="Все компетенции" />
            </ListItem>
          </Link>
          <Can I="manage" a="Users">
            <Link href={getUsersRoute()} passHref>
              <ListItem button>
                <ListItemText primary="Все пользователи" />
              </ListItem>
            </Link>
          </Can>
          <Can I="manage" a="Knowledge">
            <Link href={getKnowledgeRoute()} passHref>
              <ListItem button>
                <ListItemText primary="Все области знаний" />
              </ListItem>
            </Link>
          </Can>
        </List>
      </Box>
    </Drawer>
  );
};
