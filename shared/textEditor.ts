
export type ImageUrlType = string | ArrayBuffer | null;

type ImageElement = {
  type: 'image';
  url: ImageUrlType;
  children: CustomDescendant[];
}

type LinkElement = {
  type: 'link';
  url: string;
  children: CustomDescendant[];
}

type ParagraphElement = {
  type: "paragraph";
  children: CustomDescendant[];
}

type HeadingOneElement = {
  type: 'heading-one';
  children: CustomDescendant[]
}

type HeadingTwoElement = {
  type: 'heading-two';
  children: CustomDescendant[]
}

type BlockQuoteElement = {
  type: 'block-quote';
  children: CustomDescendant[]
}

type NumberedListElement = {
  type: 'numbered-list';
  children: CustomDescendant[]
}

type BulletedListElement = {
  type: 'bulleted-list';
  children: CustomDescendant[]
}

type ListItemElement = {
  type: 'list-item';
  children: CustomDescendant[]
}

type SimpleElement = ParagraphElement | HeadingOneElement | HeadingTwoElement | BlockQuoteElement | NumberedListElement | BulletedListElement | ListItemElement;

export type ElementByType<T extends CustomElement['type']> = Extract<CustomElement, { type: T }>;

export type CustomRenderElementByType<T extends CustomElement['type']> = {
  children: any;
  element: ElementByType<T>;
  attributes: {
      'data-slate-node': 'element';
      'data-slate-inline'?: true;
      'data-slate-void'?: true;
      dir?: 'rtl';
      ref: any;
  };
}

export type CustomElement = LinkElement | ImageElement | SimpleElement;
export type CustomText = {
  type: 'text',
  text: string;
  bold?: true;
  italic?: true;
  code?: true;
  underline?: true;
};

export type CustomMarksType = Omit<CustomText, 'text'> | null;

export type CustomDescendant = CustomText | CustomElement;