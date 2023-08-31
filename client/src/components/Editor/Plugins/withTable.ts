import editorUtiliy from '@/lib/editorUtility';
import {
  CustomText,
  TableCellElement,
  TableElement,
  TableRowElement,
} from '@/types';
import { Element, Node, Path, Point, Range, Transforms } from 'slate';
import { Editor } from 'slate';

export const isSelectionTable = (editor: Editor) => {
  const isTable = editorUtiliy.isBlock(editor, 'table');
  return isTable;
};

const createTableCell = (children: CustomText[]): TableCellElement => ({
  type: 'table-cell',
  children,
});

const createTableRow = (cellElements: TableCellElement[]): TableRowElement => ({
  type: 'table-row',
  children: cellElements,
});

const createTable = (rowElements: TableRowElement[]): TableElement => ({
  type: 'table',
  children: rowElements,
});

// Function to insert a table into the editor
export const insertTable = (editor: Editor, rows: number, cols: number) => {
  const [table] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
    mode: 'highest',
  });

  if (table) return;

  if (!rows || !cols) return;

  const rowElements: TableRowElement[] = Array.from({ length: rows }, () => {
    const cellElements: TableCellElement[] = Array.from({ length: cols }, () =>
      createTableCell([{ text: '' }]),
    );
    return createTableRow(cellElements);
  });

  const tableElement: TableElement = createTable(rowElements);
  Transforms.insertNodes(editor, tableElement);
  Transforms.insertNodes(
    editor,
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
    { mode: 'highest' },
  );
};

export const withTables = (editor: Editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;
    if (selection) {
      const isCell = editorUtiliy.getBlock(editor, 'table-cell');
      const prevNodePath = Editor.before(editor, selection);

      const [tableNode] = Editor.nodes(editor, {
        at: prevNodePath,
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type === 'table-cell',
      });
      if (isCell) {
        const [, cellPath] = isCell;

        const start = Editor.start(editor, cellPath);
        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
      if (!isCell && tableNode) {
        return;
      }
    }

    deleteBackward(unit);
  };
  editor.deleteForward = (unit) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const IsCell = editorUtiliy.getBlock(editor, 'table-cell');
      const prevNodePath = Editor.after(editor, selection);
      const [tableNode] = Editor.nodes(editor, {
        at: prevNodePath,
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type === 'table-cell',
      });

      if (IsCell) {
        const [, cellPath] = IsCell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
      if (!IsCell && tableNode) {
        return;
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      const table = editorUtiliy.isBlock(editor, 'table');
      if (table) {
        return;
      }
    }

    insertBreak();
  };
  return editor;
};
