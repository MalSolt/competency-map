import Collapse  from '@mui/material/Collapse';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';

export const ReactSnackbarProvider: FC = ({ children }) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    TransitionComponent={Collapse}
  >
    {children}
  </SnackbarProvider>
);
