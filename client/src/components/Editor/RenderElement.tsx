'use client';
import { RenderElementProps } from 'slate-react';
import Codeblock from './Blocks/Codeblock';
import Paragraphblock from './Blocks/Paragraphblock';
import Codelineblock from './Blocks/Codelineblock';
import { BlockQuote } from '../ui/blockQuote';
import {
  Heading1block,
  Heading2block,
  Heading3block,
  Heading4block,
  Heading5block,
  Heading6block,
} from './Blocks/Headingblock';
import LinkBlock from './Blocks/LinkBlock';
import ImageBlock from './Blocks/Imageblock';
import CheckListblock from './Blocks/CheckListbblock';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

const RenderElements = (props: RenderElementProps) => {
  const style = { textAlign: (props.element as any).align };
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
      return <Paragraphblock {...props} style={style} />;
    case 'heading':
      return <Heading1block {...props} style={style} />;
    case 'headingTwo':
      return <Heading2block {...props} style={style} />;
    case 'headingThree':
      return <Heading3block {...props} style={style} />;
    case 'headingFour':
      return <Heading4block {...props} style={style} />;
    case 'headingFive':
      return <Heading5block {...props} style={style} />;
    case 'headingSix':
      return <Heading6block {...props} style={style} />;
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
