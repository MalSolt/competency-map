import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderTitle } from 'shared/lib/HeaderTitle/HeaderTitle';
import { useLogout } from 'controllers/auth';
import { useRouter } from 'next/router';
import { getLoginRoute } from 'shared/lib/routeBuilder';
import { Avatar } from 'shared/ui/Avatar';

export type HeaderType = {
  onToggleMenu: () => void;
};

export const headerHeight = 66;
const headerStyles = { height: `${headerHeight}px` };

export const Header: FC<HeaderType> = ({ onToggleMenu }) => {
  const router = useRouter();
  const isAuthorized = router.pathname !== getLoginRoute();
  const logout = useLogout();

  return (
    <AppBar position="static" style={headerStyles}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onToggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <HeaderTitle />
        </Typography>
        {isAuthorized && (
          <>
            <Avatar />
            <Button
              sx={{ mr: 2 }}
              color="inherit"
              onClick={() => logout.mutate()}
            >
              Выйти
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
