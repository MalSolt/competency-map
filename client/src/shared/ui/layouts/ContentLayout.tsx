import MuiContainer from '@mui/material/Container';
import { FC } from 'react';

export const ContentLayout: FC = ({ children }) => (
  <MuiContainer sx={{ pt: 2, pb: 4 }}>{children}</MuiContainer>
);
