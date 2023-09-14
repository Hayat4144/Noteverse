export const DefaultNotebookContent = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is editable ',
      },
      {
        bold: true,
        text: 'rich',
      },
      {
        text: ' text, ',
      },
      {
        text: 'much',
        italic: true,
      },
      {
        text: ' better than a ',
      },
      {
        code: true,
        text: '<textarea>',
      },
      {
        text: '!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      {
        bold: true,
        text: 'bold',
      },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this: ',
      },
    ],
  },
  {
    type: 'blockQuote',
    children: [
      {
        text: 'A wise quote.',
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      {
        text: 'Align the text as you want like this example align the text in center ',
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'justify',
    children: [
      {
        text: 'Editor support emojis , to insert a emoji just type ":name" like ":ind" 🇮🇳',
        fontFamily: 'Courier New,Monospace',
      },
      {
        text: ' ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'A complex block types that have their own embedded content and behaviors, like rendering checkbox inside check ',
      },
      {
        url: 'http://www.google.com',
        type: 'link',
        children: [
          {
            text: 'list items!',
          },
        ],
      },
      {
        text: ' ',
      },
    ],
  },
  {
    type: 'checkList',
    checked: true,
    children: [
      {
        text: 'Slide to the left.',
      },
    ],
  },
  {
    type: 'checkList',
    checked: true,
    children: [
      {
        text: 'Slide to the right.',
      },
    ],
  },
  {
    type: 'checkList',
    checked: false,
    children: [
      {
        text: 'Criss-cross.',
      },
    ],
  },
  {
    type: 'checkList',
    checked: true,
    children: [
      {
        text: 'Criss-cross!',
      },
    ],
  },
  {
    type: 'checkList',
    checked: false,
    children: [
      {
        text: 'Cha cha real smooth…',
      },
    ],
  },
  {
    type: 'checkList',
    checked: false,
    children: [
      {
        text: "Let's go to work!",
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'A hovering menu appear above your content, which you can use to make text ',
      },
      {
        bold: true,
        text: 'bold',
      },
      {
        text: ',',
      },
      {
        text: 'italic',
        italic: true,
      },
      {
        text: ' underline',
        underline: true,
      },
      {
        text: '       strike',
        strike: true,
      },
      {
        text: '   superscript',
        superscript: true,
      },
      {
        text: '    subscript',
        subscript: true,
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      {
        text: 'Try it out yourself! Just ',
      },
      {
        bold: true,
        text: 'select any piece of text and the menu will appear',
      },
      {
        text: '.',
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'justify',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL   to you clipboard and paste it  ',
      },
      {
        url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
        type: 'link',
        children: [
          {
            text: 'Finally, here is your link.',
          },
        ],
      },
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This example shows images in action. It features two ways to add images. You can either add an image via upload or embed the link of your image',
      },
    ],
  },
  {
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'You can delete images with the cross in the top left. Try deleting this sheep by clicking the top left:',
      },
    ],
  },
  {
    url: 'https://source.unsplash.com/zOwZKwZOZq8',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'The editor gives you full control ',
      },
      {
        bold: true,
        text: 'over the logic you c',
      },
      {
        text: 'an add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
      },
    ],
  },
  {
    type: 'blockQuote',
    children: [
      {
        text: 'this is wise quote',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Order when you start a line with "## " you get a level-two heading, like this:',
      },
    ],
  },
  {
    type: 'headingTwo',
    children: [
      {
        text: 'This is heading 2 exmaple',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Try it out for yourself! Try starting a new line with ">", "-", "1 " ,"- ","#","###","[]" and "*" and hit space.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Shortcut for adding mark like bold , italic, code ,underline Ctrl+b ,Ctrl+i,Ctrl+` and Ctrl+u respectively.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'heading',
    children: [
      {
        text: 'This is Heading 1',
      },
    ],
  },
  {
    type: 'headingTwo',
    children: [
      {
        text: 'This is Heading 2',
      },
    ],
  },
  {
    type: 'headingThree',
    children: [
      {
        text: 'This  is Heading 3 ',
      },
    ],
  },
  {
    type: 'headingFour',
    children: [
      {
        text: 'This is Heading 4',
      },
    ],
  },
  {
    type: 'headingFive',
    children: [
      {
        text: 'This is Heading 5',
      },
    ],
  },
  {
    type: 'headingSix',
    children: [
      {
        text: 'This is Heading 6 ',
      },
      {
        url: 'http://www.google.com',
        type: 'link',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Code-block and inline code example',
      },
    ],
  },
  {
    type: 'code-block',
    children: [
      {
        text: "const Greeting = (name:string)=>{\n   return `Good morning ${name}`;\n}\n// Only Typescript user add this code in there types/index.ts fil\nimport { BaseEditor, Descendant } from 'slate'\ntype CustomElement = { type: 'paragraph'; children: CustomText[] }\ntype CustomText = { text: string }\ndeclare module 'slate' {\n   interface CustomTypes {\n      Editor: BaseEditor & ReactEditor\n      Element: CustomElement\n      Text: CustomText\n}}\n",
      },
    ],
  },
  {
    type: 'code-line',
    children: [
      {
        text: 'npm  run dev',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'These are habits i have develop in myself',
      },
    ],
  },
  {
    type: 'numberList',
    children: [
      {
        type: 'bulletedlList',
        children: [
          {
            text: 'Read Book daily',
          },
        ],
      },
      {
        type: 'bulletedlList',
        children: [
          {
            text: 'Take cold shower daily',
          },
        ],
      },
      {
        type: 'bulletedlList',
        children: [
          {
            text: 'Prayer ',
          },
        ],
      },
      {
        type: 'bulletedlList',
        children: [
          {
            text: 'Exercise',
          },
        ],
      },
      {
        type: 'bulletedlList',
        children: [
          {
            text: 'Spend time with family  ',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:',
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
            children: [
              {
                text: 'Name      ',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Role   ',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'work   ',
              },
            ],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: 'Hayat ilyas',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Full stack developer',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'self employed',
              },
            ],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: 'Histesh sir   ',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Most humble teacher   ',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Physics wala',
              },
            ],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: 'Vikrant bhai',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Python developer',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Delhi',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Here are the 5 things i have to remove from my life:-',
      },
    ],
  },
  {
    type: 'bulletedlList',
    children: [
      {
        text: 'Toxic and negative people even my relatives ',
        color: 'orange',
      },
    ],
  },
  {
    type: 'bulletedlList',
    children: [
      {
        text: 'Quite abusing',
      },
    ],
  },
  {
    type: 'bulletedlList',
    children: [
      {
        text: "Don't angry at anyone",
        highlight: 'green',
      },
    ],
  },
  {
    type: 'bulletedlList',
    children: [
      {
        text: 'Quite pornography',
      },
    ],
  },
  {
    type: 'bulletedlList',
    children: [
      {
        bold: true,
        text: 'Stop expecting so much from people',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        bold: true,
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'headingTwo',
    children: [
      {
        text: '',
      },
    ],
  },
];
