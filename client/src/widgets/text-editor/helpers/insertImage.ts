import { ImageUrlType } from "@shared/textEditor";
import { Editor, Transforms, Element } from "slate"

export const insertImage = (editor: Editor, url: ImageUrlType) => {
  const image: Element = { type: 'image', url, children: [{ type: 'text', text: '' }] };
  Transforms.insertNodes(editor, image)
};
