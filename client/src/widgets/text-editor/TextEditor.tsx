/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Toolbar } from './components/Toolbar';
import { Leaf } from './components/Leaf';
import { Element } from './components/Element';
import { withImages } from './helpers/withImages';
import { withPersistTextEnd } from './helpers/withPersistTextEnd';
import { defaultTextBlock } from './helpers/defaultTextBlock';

type Props = {
  value: Descendant[] | null;
  onChange: (data: Descendant[]) => void;
  readOnly?: boolean;
};

export const TextEditor: FC<Props> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const editor = useMemo(
    () =>
      withPersistTextEnd(withImages(withHistory(withReact(createEditor())))),
    []
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <Box
      p={1}
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: 'grey.500',
      }}
    >
      <Slate
        editor={editor}
        value={(value ?? [defaultTextBlock()]) as Descendant[]}
        onChange={onChange}
      >
        {!readOnly && (
          <>
            <Toolbar />
            <Box mt={1}>
              <Divider variant="middle" />
            </Box>
          </>
        )}
        <Box p={1}>
          <Editable
            placeholder="Начните писать что нибудь здесь..."
            autoFocus
            spellCheck
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            readOnly={readOnly}
          />
        </Box>
      </Slate>
    </Box>
  );
};
