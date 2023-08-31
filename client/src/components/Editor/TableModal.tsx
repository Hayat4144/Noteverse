import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Portal from '../Portal';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseSelection, Editor, Element, Transforms, string } from 'slate';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { insertTable, isSelectionTable } from './Plugins/withTable';
import { Icons } from '../Icons';
import Iconwithtext from '../Iconwithtext';

interface TableModalProps {
  isTableModal: boolean;
  tableModalToggle: (value: boolean) => void;
}

export default function TableModal({
  isTableModal,
  tableModalToggle,
}: TableModalProps) {
  const editor = useSlate();
  const [originalSelection, setOriginalSelection] =
    useState<BaseSelection | null>(null);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const actionHandler = useCallback(
    (e: any) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        tableModalToggle(false);
      }
    },
    [isTableModal, tableRef],
  );

  useEffect(() => {
    const { selection } = editor;
    const el = tableRef.current;
    if (!el || !selection || !isTableModal) {
      el?.removeAttribute('style');
      return;
    }
    const domSelection = getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      el.style.opacity = '1';
      el.style.top = `${rect.bottom}px`;
      el.style.left = `${rect.left}px`;
    }
  }, [editor, isTableModal]);

  useEffect(() => {
    document.addEventListener('mousedown', actionHandler);
    document.addEventListener('keydown', actionHandler);
    return () => {
      document.removeEventListener('mousedown', actionHandler);
      document.removeEventListener('keydown', actionHandler);
    };
  }, [actionHandler]);

  useEffect(() => {
    if (isTableModal) {
      setOriginalSelection(editor.selection);
      const x = window.scrollX;
      const y = window.scrollY;
      window.scrollTo(x, y);
    }
  }, [editor, isTableModal]);

  const removeTable = () => {
    if (originalSelection) {
      Transforms.select(editor, originalSelection);
      Transforms.removeNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
        mode: 'highest',
      });

      Transforms.deselect(editor);
      ReactEditor.focus(editor);
      tableModalToggle(false);
    }
  };
  return (
    <Portal>
      <div
        ref={tableRef}
        className="absolute opacity-0 -left-[10000px] -top-[10000px]"
      >
        <Card className="w-fit">
          <CardContent className="px-3 py-3">
            {!isSelectionTable(editor) ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  insertTable(editor, rows, cols);
                  tableModalToggle(false);
                }}
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="rows">Number of rows</Label>
                    <Input
                      id="rows"
                      placeholder="Enter number of rows"
                      value={rows}
                      type="number"
                      min={1}
                      onChange={(e) => setRows(e.target.valueAsNumber)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="coloumns">Number of coloumns</Label>
                    <Input
                      id="coloumns"
                      placeholder="Enter number of coloumns"
                      value={cols}
                      min={1}
                      type="number"
                      onChange={(e) => setCols(e.target.valueAsNumber)}
                    />
                  </div>
                </div>
                <Button className="mt-2">Add table</Button>
              </form>
            ) : null}
            {isSelectionTable(editor) ? (
              <Fragment>
                <div className="flex item-center flex-wrap">
                  <Button
                    variant={'ghost'}
                    onClick={removeTable}
                    className="hover:text-red-700"
                  >
                    <Iconwithtext
                      icons={<Icons.trash size={17} className="text-red-600" />}
                      text="Delete table"
                    />
                  </Button>
                </div>
              </Fragment>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </Portal>
  );
}
