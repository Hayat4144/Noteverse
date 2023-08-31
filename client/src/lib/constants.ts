import { languageTypes } from '@/types';
import { Descendant } from 'slate';

export const languages: languageTypes[] = [
  {
    id: '1',
    name: 'JSX',
    value: 'jsx',
  },
  {
    id: '2',
    value: 'tsx',
    name: 'TSX',
  },
  {
    id: '3',
    name: 'Python',
    value: 'python',
  },
  {
    id: '4',
    name: 'JavaScript',
    value: 'javascript',
  },
  {
    id: '5',
    name: 'HTML',
    value: 'html',
  },
  {
    id: '6',
    name: 'CSS',
    value: 'css',
  },
  {
    id: '7',
    name: 'SQL',
    value: 'sql',
  },
  {
    id: '8',
    name: 'Markdown',
    value: 'markdown',
  },
  {
    id: '9',
    name: 'php',
    value: 'PHP',
  },
  {
    id: '10',
    name: 'Java',
    value: 'java',
  },
];

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'There are two ways to add links. You can either add a link via the toolbar icon above or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
      {
        type: 'link',
        url: 'https://www.smashingmagazine.com/2020/05/building-wysiwyg-editor-javascript-slatejs/',
        children: [{ text: 'click here ' }],
      },
      {
        text: ',hello',
      },
    ],
  },
  {
    type: 'table',
    children: [
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '' }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Human', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Dog', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Cat', bold: true }],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '# of Feet', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: '2' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '4' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '4' }],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '# of Lives', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: '1' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '1' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '9' }],
          },
        ],
      },
    ],
  },
  {
    type: 'headingTwo',
    children: [{ text: 'This is heading 2' }],
  },
  //   {
  //     type: 'code-block',
  //     language: 'javascript',
  //     children: [
  //       {
  //         text: `// TypeScript users only add this code
  // import { BaseEditor, Descendant } from 'slate'
  // import { ReactEditor } from 'slate-react'

  // type CustomElement = { type: 'paragraph'; children: CustomText[] }
  // type CustomText = { text: string }

  // declare module 'slate' {
  //   interface CustomTypes {
  //     Editor: BaseEditor & ReactEditor
  //     Element: CustomElement
  //     Text: CustomText
  //   }
  // }`,
  //       },
  //     ],
  //   },
  //   {
  //     type: 'headingThree',
  //     children: [{ text: 'This is heading 3' }],
  //   },
  //   {
  //     type: 'heading',
  //     children: [
  //       { text: 'Here is the examples of the image rendering in slate js' },
  //     ],
  //   },
  //   {
  //     type: 'blockQuote',
  //     children: [{ text: 'works everyday for your future' }],
  //   },
];
