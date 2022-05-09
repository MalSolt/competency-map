import { Element } from "slate";

export const defaultTextBlock = (text = ''): Element => ({
  type: 'paragraph',
  children: [{ type: 'text',  text }]
});