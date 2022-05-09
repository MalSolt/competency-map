/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { styled } from '@mui/material/styles';
import { Image } from './Image';
import { Link } from './Link';

const StyledBlockQuote = styled('blockquote')({
  background: '#f9f9f9',
  borderLeft: '5px solid #ccc',
  margin: '1.5em 10px',
  padding: '0.5em 10px',
  '&:before': {
    color: '#ccc',
    content: 'open-quote',
    fontSize: '2em',
    lineHeight: '0.1em',
    marginRight: '0.25em',
    verticalAlign: '-0.4em',
  },
  '& p': {
    display: 'inline',
  },
});

export const Element: FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'image':
      return <Image {...props} element={element} />;
    case 'link':
      return <Link {...props} element={element} />;
    case 'block-quote':
      return <StyledBlockQuote {...attributes}>{children}</StyledBlockQuote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
