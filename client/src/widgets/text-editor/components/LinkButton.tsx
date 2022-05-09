import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { useSnackbar } from 'notistack';
import isUrl from 'is-url';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LinkIcon from '@mui/icons-material/Link';
import { insertLink } from '../helpers/insertLink';

export const LinkButton = () => {
  const editor = useSlate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleClickOpen = () => {
    setUrl('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (url && !isUrl(url)) {
      enqueueSnackbar('URL не является ссылкой', {
        variant: 'error',
      });

      return;
    }

    insertLink(editor, url);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <LinkIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Вставить ссылку</DialogTitle>
        <DialogContent>
          <DialogContentText mb="1em">Вставьте URL в поле</DialogContentText>
          <TextField
            margin="dense"
            label="URL"
            placeholder="Вставьте URL"
            type="url"
            variant="standard"
            value={url}
            onChange={handleInputChange}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Вставить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
