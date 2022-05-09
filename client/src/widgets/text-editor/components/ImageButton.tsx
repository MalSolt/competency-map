import React, { useState } from 'react';
import { useSlateStatic } from 'slate-react';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import { insertImage } from '../helpers/insertImage';
import { isImageUrl } from '../helpers/isImageUrl';

export const ImageButton = () => {
  const editor = useSlateStatic();
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
    if (url && !isImageUrl(url)) {
      enqueueSnackbar('URL не является ссылкой на изображение', {
        variant: 'error',
      });

      return;
    }

    insertImage(editor, url);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ImageIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Загрузить изображение</DialogTitle>
        <DialogContent>
          <DialogContentText mb="1em">
            Чтобы загрузить изображение, пожалуйста вставьте url адрес в поле
            ниже.
          </DialogContentText>
          <TextField
            margin="dense"
            label="URL"
            placeholder="Вставьте URL на изображение"
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
          <Button onClick={handleSubmit}>Загрузить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
