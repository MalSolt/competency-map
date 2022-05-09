import { Editor, Element, Transforms } from "slate"
import { isBlockActive } from "./isBlockActive";

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export type ToggleBlockType = 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'numbered-list' | 'bulleted-list';

export const toggleBlock = (editor: Editor, format: ToggleBlockType) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<Element> = {
    // eslint-disable-next-line no-nested-ternary
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<Element>(editor, newProperties)

  if (!isActive && isList) {
    const block: Element = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}