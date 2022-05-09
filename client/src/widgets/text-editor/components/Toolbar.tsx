import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { MarkButton } from './MarkButton';
import { BlockButton } from './BlockButton';
import { ImageButton } from './ImageButton';
import { LinkButton } from './LinkButton';

export const Toolbar: FC = () => (
  <Stack spacing={1} direction="row">
    <MarkButton format="bold" Icon={BoldIcon} />
    <MarkButton format="italic" Icon={ItalicIcon} />
    <MarkButton format="underline" Icon={UnderlinedIcon} />
    <MarkButton format="code" Icon={CodeIcon} />
    <BlockButton format="heading-one" Icon={LooksOneIcon} />
    <BlockButton format="heading-two" Icon={LooksTwoIcon} />
    <BlockButton format="block-quote" Icon={FormatQuoteIcon} />
    <BlockButton format="numbered-list" Icon={FormatListNumberedIcon} />
    <BlockButton format="bulleted-list" Icon={FormatListBulletedIcon} />
    <LinkButton />
    <ImageButton />
  </Stack>
);
