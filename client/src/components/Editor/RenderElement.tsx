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
import { Button } from '../ui/button';
import LinkBlock from './Blocks/LinkBlock';
import { CustomRenderElementProps } from '@/types';
import ImageBlock from './Blocks/Imageblock';
import CheckListblock from './Blocks/CheckListbblock';

const RenderElements = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'code-block':
      return <Codeblock {...props} />;
    case 'paragraph':
      return <Paragraphblock {...props} />;
    case 'heading':
      return <Heading1block {...props} />;
    case 'headingTwo':
      return <Heading2block {...props} />;
    case 'headingThree':
      return <Heading3block {...props} />;
    case 'headingFour':
      return <Heading4block {...props} />;
    case 'headingFive':
      return <Heading5block {...props} />;
    case 'headingSix':
      return <Heading6block {...props} />;
    case 'code-line':
      return <Codelineblock {...props} />;
    case 'blockQuote':
      return <BlockQuote {...props} />;
    case 'link':
      return <LinkBlock {...props} />;
    case 'image':
      return <ImageBlock {...props} />;
    case 'checkList':
      return <CheckListblock {...props} />;
    case 'bulletedlList':
      return (
        <li {...props.attributes} className="ml-6 [&>li]:mt-1">
          {props.children}
        </li>
      );
    case 'numberList':
      return (
        <ol
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
