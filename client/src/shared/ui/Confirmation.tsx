import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { LoadingButton } from '@mui/lab';

type Props = {
  open: boolean;
  title: string;
  description: string;
  disabled?: boolean;
  loading?: boolean;
  onAccept: () => void;
  onCancel: () => void;
};

export const Confirmation: FC<Props> = ({
  open,
  title,
  description,
  disabled,
  loading,
  onAccept,
  onCancel,
}) => (
  <Dialog open={open} onClose={onCancel} data-testid="confirmation-modal">
    <DialogTitle data-testid="confirmation-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText data-testid="confirmation-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCancel}
        disabled={disabled}
        data-testid="confirmation-button-no"
      >
        Нет
      </Button>
      <LoadingButton
        onClick={onAccept}
        disabled={disabled}
        loading={loading}
        data-testid="confirmation-button-yes"
        autoFocus
      >
        Да
      </LoadingButton>
    </DialogActions>
  </Dialog>
);
