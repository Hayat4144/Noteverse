import { Checkbox } from '@/components/ui/checkbox';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  InputHTMLAttributes,
} from 'react';
import {
  ReactEditor,
  RenderElementProps,
  useReadOnly,
  useSlateStatic,
} from 'slate-react';
import { Transforms, Element } from 'slate';

const CheckListblock = (props: RenderElementProps) => {
  const { element } = props;
  const editor = useSlateStatic();
  const readOnly = useReadOnly();
  const chekcListToggle = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<Element> = {
      checked: e.currentTarget.checked,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  };
  return (
    <Fragment>
      <div
        className="flex items-center space-x-2 space-y-1"
        {...props.attributes}
      >
        <span contentEditable={false}>
          <input
            type="checkbox"
            checked={element.checked}
            onChange={chekcListToggle}
          />
        </span>
        <label
          contentEditable={!readOnly}
          suppressContentEditableWarning
          className={`${element.checked ? 'line-through' : ''}`}
        >
          {props.children}
        </label>
      </div>
    </Fragment>
  );
};

export default CheckListblock;
