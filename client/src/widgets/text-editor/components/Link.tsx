/* eslint-disable react/jsx-props-no-spreading */
import { CustomRenderElementByType } from '@shared/textEditor';
import { FC } from 'react';
import { useSelected } from 'slate-react';

const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    style={{
      fontSize: 0,
    }}
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

export const Link: FC<CustomRenderElementByType<'link'>> = (props) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  return (
    <a
      {...attributes}
      href={element.url}
      style={{
        boxShadow: selected ? 'box-shadow: 0 0 0 3px #ddd' : 'none',
      }}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};
