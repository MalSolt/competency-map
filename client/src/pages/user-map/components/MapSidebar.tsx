import styled from '@emotion/styled';
import Paper  from '@mui/material/Paper';
import { FC, ReactNode } from 'react';

interface Props {
  viewSettings?: ReactNode;
}

export const MapSidebar: FC<Props> = ({ viewSettings }) => (
  <StyledPaper>{viewSettings} </StyledPaper>
);

const StyledPaper = styled(Paper)`
  width: 100%;
  padding: 20px;
`;
