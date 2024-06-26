'use client';
import { RenderElementProps, useSelected, useSlate } from 'slate-react';
import { BlockQuote } from '../ui/blockQuote';
import {
  Heading1block,
  Heading2block,
  Heading3block,
  Heading4block,
  Heading5block,
  Heading6block,
} from './Blocks/Headingblock';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Node, Range } from 'slate';
import { TypographyP } from '../ui/TypographyP';
import dynamic from 'next/dynamic';

const LinkBlock = dynamic(() => import('./Blocks/LinkBlock'));
const Paragraphblock = dynamic(() => import('./Blocks/Paragraphblock'));
const Codeblock = dynamic(() => import('./Blocks/Codeblock'));
const Codelineblock = dynamic(() => import('./Blocks/Codelineblock'));
const ImageBlock = dynamic(() => import('./Blocks/Imageblock'));
const CheckListblock = dynamic(() => import('./Blocks/CheckListbblock'));

const RenderElements = (props: RenderElementProps) => {
  const style = { textAlign: (props.element as any).align };
  const selected = useSelected();
  const editor = useSlate();
  const { selection } = editor;
  const isCollapased = selection && Range.isCollapsed(selection);
  const isEmpty =
    Node.string(props.element).trim() === '' &&
    props.element.children.length === 1;
  switch (props.element.type) {
    case 'table':
      return (
        <Table className="my-2">
          <TableBody {...props.attributes} className="border">
            {props.children}
          </TableBody>
        </Table>
      );
    case 'table-row':
      return <TableRow {...props.attributes}>{props.children}</TableRow>;
    case 'table-cell':
      return (
        <TableCell {...props.attributes} className="border">
          {props.children}
        </TableCell>
      );
    case 'code-block':
      return <Codeblock {...props} style={style} />;
    case 'paragraph':
      return (
        <TypographyP
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'heading':
      return (
        <Heading1block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );

    case 'headingTwo':
      return (
        <Heading2block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'headingThree':
      return (
        <Heading3block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'headingFour':
      return (
        <Heading4block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'headingFive':
      return (
        <Heading5block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'headingSix':
      return (
        <Heading6block
          {...props}
          style={style}
          className={`${
            selected && isCollapased && isEmpty ? 'selected-empty-element' : ''
          }`}
        />
      );
    case 'code-line':
      return <Codelineblock {...props} style={style} />;
    case 'blockQuote':
      return <BlockQuote {...props} style={style} />;
    case 'link':
      return <LinkBlock {...props} style={style} />;
    case 'image':
      return <ImageBlock {...props} style={style} />;
    case 'checkList':
      return <CheckListblock {...props} style={style} />;
    case 'bulletedlList':
      return (
        <li {...props.attributes} className="ml-6 [&>li]:mt-1" style={style}>
          {props.children}
        </li>
      );
    case 'numberList':
      return (
        <ol
          style={style}
          {...props.attributes}
          type="1"
          className="list-decimal ml-6 [&>li]:mt-1"
        >
          {props.children}
        </ol>
      );
    default:
      return <Paragraphblock {...props} />;
  }
};

export { RenderElements };
