import { Editor } from 'slate';
import { Marks } from '../types';
import { isMarkActive } from './isMarkActive';

export const toggleMark = (editor: Editor, format: Marks) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
