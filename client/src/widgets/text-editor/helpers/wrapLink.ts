import { Editor, Element, Transforms, Range } from "slate"
import { isLinkActive } from "./isLinkActive"
import { unwrapLink } from "./unwrapLink"

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  const link: Element = {
    type: 'link',
    url,
    children: isCollapsed ? [{ type: 'text', text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}
