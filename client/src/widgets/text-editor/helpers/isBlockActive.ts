import { Editor, Element } from "slate"

export const isBlockActive = (editor: Editor, format: Element["type"]) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  })

  return !!match
}