import { Editor } from 'slate';
import { CustomMarksType } from '@shared/textEditor';
import { Marks } from '../types';

export const isMarkActive = (editor: Editor, format: Marks) => {
  const marks: CustomMarksType = Editor.marks(editor);

  return !!(marks && marks[format]);
}