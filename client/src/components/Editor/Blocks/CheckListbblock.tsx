import { Checkbox } from '@/components/ui/checkbox';
import React, { Fragment } from 'react';
import {
  ReactEditor,
  RenderElementProps,
  useReadOnly,
  useSlateStatic,
} from 'slate-react';
import { Transforms, Element } from 'slate';
import { CheckedState } from '@radix-ui/react-checkbox';

const CheckListblock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  const { element } = props;
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  const chekcListToggle = (value: CheckedState) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<Element> = {
      checked: value as boolean,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  };
  return (
    <Fragment>
      <div
        style={props.style}
        className="flex items-center space-x-2"
        {...props.attributes}
      >
        <Checkbox
          contentEditable={false}
          checked={(element as any).checked}
          onCheckedChange={chekcListToggle}
        />
        <label
          contentEditable={!readOnly}
          suppressContentEditableWarning
          className={`${
            (element as any).checked ? 'line-through' : ''
          } font-medium leading-nonepeer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
        >
          {props.children}
        </label>
      </div>
    </Fragment>
  );
};

export default CheckListblock;
