/* eslint-disable no-param-reassign */
import { Editor, Element } from "slate";
import { insertImage } from "./insertImage";
import { isImageUrl } from "./isImageUrl";

export const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: Element) => (
    element.type === 'image' ? true : isVoid(element)
  )

  editor.insertData = (data: any) => {
    const text = data.getData('text/plain')
    const { files } = data;

    if (files && files.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor;
}