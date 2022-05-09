import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import MuiModal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  withoutCloseIcon?: boolean;
  children: React.ReactNode;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const closeButtonStyle = {
  position: 'absolute' as 'absolute',
  right: '5px',
  top: '5px',
};

export const Modal: FC<Props> = ({
  children,
  open,
  withoutCloseIcon = false,
  onClose,
}) => (
  <MuiModal
    open={open}
    onClose={onClose}
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    closeAfterTransition
  >
    <Fade in={open}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={style}
      >
        {!withoutCloseIcon && (
          <Box style={closeButtonStyle}>
            <IconButton color="default" size="large" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {children}
      </Grid>
    </Fade>
  </MuiModal>
);
