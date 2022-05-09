import { NodeEntry, Editor, Transforms, Path, Node } from 'slate';
import { defaultTextBlock } from './defaultTextBlock';

const isEmptyElement = (node: Node) => {
  if (Editor.isEditor(node)) return false;
  if (node.type === 'text') return false;
  if (node.type !== 'paragraph') return false;

  const { children } = node;
  if (children.length > 1) return false;
  const [child] = children;
  if (child.type !== 'text') return false;
  if (child.text !== '') return false;
  return true;
};

const getLastChild = (node: Node, path: Path) => {
  if ('type' in node && node.type === 'text') return [];
  const descendant = node.children[node.children.length - 1];
  const resultPath = path.concat([node.children.length - 1]);
  return [descendant, resultPath] as const;
};

export const withPersistTextEnd = (editor: Editor): Editor => {
    const { normalizeNode } = editor;
    const newEditor = editor;
    newEditor.normalizeNode = ([node, path]: NodeEntry) => {
      if (Path.equals([], path)) {
        const textBlock = defaultTextBlock();
        const [last, lastPath] = getLastChild(node, path);
        if (last && !isEmptyElement(last)) {
          Transforms.insertNodes(editor, textBlock, {
            select: false,
            at: Path.next(lastPath)
          });
          // if (selection) Transforms.select(editor, selection);
        }
      }
      normalizeNode([node, path]);
    };
    return editor;
  };