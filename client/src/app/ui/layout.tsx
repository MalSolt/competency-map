import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

export type Props = {
  app: ReactNode;
  header: ReactNode;
};

export const Layout: FC<Props> = ({ header, app }) => (
  <Box
    sx={{
      flexGrow: 1,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box>{header}</Box>
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {app}
    </Box>
  </Box>
);
