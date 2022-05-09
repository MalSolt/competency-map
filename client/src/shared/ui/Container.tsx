import  MuiContainer from '@mui/material/Container';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Cointainer: FC<Props> = ({ children }) => (
  <MuiContainer sx={{ pt: 2, pb: 4 }}>{children}</MuiContainer>
);
