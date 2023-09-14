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

interface FontFamily {
  name: string;
  category: string;
}

export const FontFamilies: FontFamily[] = [
  { name: 'Arial', category: 'Sans-serif' },
  { name: 'Helvetica', category: 'Sans-serif' },
  { name: 'Times New Roman', category: 'Serif' },
  { name: 'Georgia', category: 'Serif' },
  { name: 'Verdana', category: 'Sans-serif' },
  { name: 'Tahoma', category: 'Sans-serif' },
  { name: 'Courier New', category: 'Monospace' },
  { name: 'Lucida Console', category: 'Monospace' },
  { name: 'Impact', category: 'Sans-serif' },
  { name: 'Comic Sans MS', category: 'Sans-serif' },
  { name: 'Trebuchet MS', category: 'Sans-serif' },
  { name: 'Palatino Linotype', category: 'Serif' },
  { name: 'Garamond', category: 'Serif' },
  { name: 'Book Antiqua', category: 'Serif' },
  { name: 'Courier', category: 'Monospace' },
];

interface fontArray {
  value: string;
}
export const fonts: fontArray[] = [
  {
    value: '12',
  },
  {
    value: '14',
  },
  {
    value: '16',
  },
  {
    value: '18',
  },
  {
    value: '20',
  },
  {
    value: '22',
  },
  {
    value: '24',
  },
  {
    value: '26',
  },
  {
    value: '28',
  },
  {
    value: '30',
  },
];

export const headings = [
  'heading',
  'headingTwo',
  'headingThree',
  'headingFour',
  'headingFive',
  'headingSix',
];

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
