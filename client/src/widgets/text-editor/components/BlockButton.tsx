import { FC } from 'react';
import { useSlate } from 'slate-react';
import IconButton from '@mui/material/IconButton';
import { isBlockActive } from '../helpers/isBlockActive';
import { toggleBlock, ToggleBlockType } from '../helpers/toggleBlock';

type Props = {
  format: ToggleBlockType;
  Icon: React.ElementType;
};

export const BlockButton: FC<Props> = ({ format, Icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      color={isBlockActive(editor, format) ? 'primary' : 'default'}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </IconButton>
  );
};
