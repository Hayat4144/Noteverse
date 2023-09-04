import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useEditorConfig from '@/hooks/useEditorConfig';
import { MarkButtonProps } from '@/types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import TurnIntoDropDown from './TurnIntoDropDown';
import TextColorHighlight from './TextColor';
import FontSizeModal from './FontSizeModal';
import { Separator } from '@/components/ui/separator';
import FontFamilyModal from './FontFamilyModal';
import InsertLink from './InsertLink';
import InsertImage from './InsertImage';

export default function Toolbar() {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  const [blocktype, setblocktype] = useState('paragraph');

  useEffect(() => {
    if (editor.selection) {
      const blocktype = editorUtiliy.gettextBlockStyle(editor);
      if (blocktype) {
        setblocktype(blocktype);
      }
    }
  }, [editor.selection]);

  return (
    <Fragment>
      <div className="flex items-center space-x-1 flex-wrap mx-5">
        <HistoryButton type="undo" icon={<Icons.undo size={15} />} />
        <HistoryButton type="redo" icon={<Icons.redo size={15} />} />
        <Separator orientation="vertical" className="h-5 font-semibold" />
        <MarkButton
          format="bold"
          icon={<Icons.bold size={15} />}
          value={true}
        />{' '}
        <MarkButton
          format="italic"
          value={true}
          icon={<Icons.Italic size={15} />}
        />{' '}
        <MarkButton
          icon={<Icons.underline size={15} />}
          format="underline"
          value={true}
        />{' '}
        <MarkButton
          format="subscript"
          icon={<Icons.subscript size={15} />}
          value={true}
        />{' '}
        <MarkButton
          icon={<Icons.Superscript size={15} />}
          format="supscript"
          value={true}
        />{' '}
        <MarkButton
          icon={<Icons.strike size={15} />}
          format="strike"
          value={true}
        />
        <Separator orientation="vertical" className="h-5 font-semibold" />
        <FontFamilyModal />
        <Separator orientation="vertical" className="h-5 font-semibold" />
        <FontSizeModal format="fontSize" />
        <Separator orientation="vertical" className="h-5 font-semibold" />
        <TurnIntoDropDown blockType={blocktype} isHooveringtoolbar={false} />
        <Separator orientation="vertical" className="h-5 font-semibold" />
        <TextColorHighlight
          format="color"
          tooltipContent="Text Color"
          icon={<Icons.color size={15} />}
        />
        <TextColorHighlight
          format="highlight"
          tooltipContent="Highlight Color"
          icon={<Icons.highlight size={15} />}
        />
        <Separator orientation="vertical" className="h-5" />
        <AlignButton format="justify" icon={<Icons.alignJustify size={15} />} />
        <AlignButton icon={<Icons.alignLeft size={15} />} format="left" />
        <AlignButton icon={<Icons.alignRight size={15} />} format="right" />
        <AlignButton icon={<Icons.alignCenter size={15} />} format="center" />
        <InsertLink />
        <InsertImage />
      </div>
    </Fragment>
  );
}

interface HistoryButtonProps {
  icon: React.ReactNode;
  type: string;
}

const HistoryButton = ({ type, icon }: HistoryButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={'icon'} variant={'ghost'} className="h-8">
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {type}{' '}
          {type === 'undo' ? <span>(Ctrl+Z)</span> : <span>(Ctrl+Y)</span>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MarkButton = ({ format, value, icon }: MarkButtonProps) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              editorUtiliy.isMarkActive(editor, format) ? 'secondary' : 'ghost'
            }
            size={'icon'}
            className="h-8"
            onMouseDown={(event) => {
              event.preventDefault();
              editorUtiliy.toggleMark(editor, format, value);
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="capitalize">{format}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface BlockButtonProps {
  format: string;
  icon: React.ReactNode;
}
const AlignButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={'icon'}
            variant={'ghost'}
            onMouseDown={(event) => {
              event.preventDefault();
              editorUtiliy.toggleBlock(editor, format);
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="space-x-1">
          <span className="capitalize">{format}</span> align
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
