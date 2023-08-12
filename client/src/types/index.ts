import { addtaskSchema } from '@/lib/validation/task';
import React from 'react';
import { z } from 'zod';
import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  supscript?: boolean;
  subscript?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
  supscript?: boolean;
  subscript?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type BlockQuoteElement = {
  type: 'blockQuote';
  align?: string;
  children: Descendant[];
};

export type BullitedListElement = {
  type: 'bulletedlList';
  align?: string;
  children: Descendant[];
};

export type NumberListElement = {
  type: 'numberList';
  align?: string;
  children: Descendant[];
};

export type CheckListItemElement = {
  type: 'checkList';
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: 'editable-void';
  children: EmptyText[];
};

export type HeadingElement = {
  type: 'heading';
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'headingTwo';
  align?: string;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: 'headingThree';
  align?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: Descendant[];
};

export type ButtonElement = {
  type: 'button';
  children: Descendant[];
};

export type BadgeElement = {
  type: 'badge';
  children: Descendant[];
};

export type MentionElement = {
  type: 'mention';
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};

export type TableCellElement = { type: 'table-cell'; children: CustomText[] };

export type TableRowElement = {
  type: 'table-row';
  children: TableCellElement[];
};

export type TableElement = {
  type: 'table';
  children: TableRowElement[];
};

export type TitleElement = {
  type: 'title';
  children: Descendant[];
};

export type VideoElement = {
  type: 'video';
  url: string;
  children: EmptyText[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language: string;
  children: Descendant[];
};

export type CodeLineElement = {
  type: 'code-line';
  children: Descendant[];
};

export type CustomElement =
  | BlockQuoteElement
  | BullitedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | NumberListElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement;

export interface CustomRenderElementProps  extends RenderElementProps{
  element:CustomElement
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  roleId: string;
  created_at: Date;
  iat: number;
  exp: number;
}

export enum TaskPriority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export enum TaskStatus {
  Not_Started = 'Not Started',
  In_Progress = 'In Progress',
  Completed = 'Completed',
}

export interface taskObject {
  id: string;
  title: string;
  description?: string | null;
  due_date: string;
  status: string;
  priority: TaskPriority;
  parent_id: string | null;
  is_standalone: boolean;
  assignee: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags: [];
}

export enum taskField {
  id = 'id',
  title = 'title',
  description = 'description',
  due_date = 'due_date',
  status = 'status',
  priority = 'priority',
  parent_id = 'parent_id',
  is_standalone = 'is_standalone',
  assignee = 'assignee',
  userId = 'userId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  tags = 'tags',
}

export interface TaskResponse {
  data: taskObject[];
  resultPerPage: number;
  totalResults: number;
  error?: string | undefined;
}

export enum OrderBY {
  DESC = 'desc',
  ASC = 'asc',
}

export interface sortObject {
  field: string;
  orderBy: OrderBY;
  id: string;
}

export enum Operators {
  equals = 'equals',
  in = 'in',
  NOT = 'NOT',
  null = 'null',
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  contains = 'contains',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
  AND = 'AND',
  OR = 'OR',
  NOT_IN = 'notIn',
  not = 'not',
  distinct = 'distinct',
  some = 'some',
  none = 'none',
  every = 'every',
  hasSome = 'hasSome',
  hasEvery = 'hasEvery',
}

export enum PriorityOperator {
  equals = Operators.equals,
  not = Operators.not,
  // in = Operators.in,
  // notIn = Operators.NOT_IN,
}

export enum TaskOperator {
  contains = Operators.contains,
  endsWith = Operators.endsWith,
  startsWith = Operators.startsWith,
  not = Operators.not,
  equals = Operators.equals,
}

export enum StatusOperator {
  NOT = Operators.NOT,
  contains = Operators.contains,
  equals = Operators.equals,
}

export enum DueDateOperator {
  gt = Operators.gt,
  equals = Operators.equals,
  lt = Operators.lt,
  lte = Operators.lte,
  gte = Operators.gte,
}

export enum TagsOperators {
  hasSome = Operators.hasSome,
  hasEvery = Operators.hasEvery,
}

export interface filterobject {
  id: string;
  field: string;
  value: string | string[];
  operator: StatusOperator | DueDateOperator | TaskOperator;
}

export interface sortsState {
  sorts: [];
  isOpen: boolean;
  popoverOpen: boolean;
}

export type taskInput = z.infer<typeof addtaskSchema>;

export interface SelectionRow {
  [key: string]: boolean;
}

export interface Typography
  extends React.HtmlHTMLAttributes<HTMLHeadingElement & HTMLParagraphElement> {}

export interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  asChild?: boolean;
}
