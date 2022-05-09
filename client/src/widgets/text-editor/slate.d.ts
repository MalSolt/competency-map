import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history';
import { CustomElement, CustomText } from '@shared/textEditor';

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  export interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
