/* eslint-disable no-param-reassign */
import { Editor, Element } from "slate"
import isUrl from 'is-url';
import { wrapLink } from "./wrapLink";

export const withInlines = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element: Element) =>
    ['link'].includes(element.type) || isInline(element)

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}