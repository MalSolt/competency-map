/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable-next-line jsx-a11y/alt-text */
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';
import { Transforms } from 'slate';
import { styled } from '@mui/material/styles';
import { CustomRenderElementByType } from '@shared/textEditor';

const StyledBox = styled('div')({
  position: 'absolute',
  alignItems: 'center',
  top: '0.2em',
  left: '0.2em',
  transition: 'all 0.2s',
  background: 'white',
  borderRadius: '0.1em',
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.75',
  },
});

const StyledImg = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '20em',
});

export const Image: FC<CustomRenderElementByType<'image'>> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: 'relative' }}>
        <StyledImg
          src={element.url as string}
          style={{
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
        />
        <StyledBox
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: selected && focused ? 'inline-flex' : 'none',
          }}
        >
          <DeleteIcon color="action" />
        </StyledBox>
      </div>
    </div>
  );
};
