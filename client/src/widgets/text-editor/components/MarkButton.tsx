import React, { FC } from 'react';
import { useSlate } from 'slate-react';
import IconButton from '@mui/material/IconButton';
import { isMarkActive } from '../helpers/isMarkActive';
import { toggleMark } from '../helpers/toggleMark';
import { Marks } from '../types';

type Props = {
  format: Marks;
  Icon: React.ElementType;
};

export const MarkButton: FC<Props> = ({ format, Icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      color={isMarkActive(editor, format) ? 'primary' : 'default'}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon />
    </IconButton>
  );
};
