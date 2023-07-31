import { addtaskSchema } from '@/lib/validation/task';
import { z } from 'zod';

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
  id ="id",
  title="title",
  description="description",
  due_date="due_date",
  status="status",
  priority="priority",
  parent_id="parent_id",
  is_standalone="is_standalone",
  assignee="assignee",
  userId="userId",
  createdAt="createdAt",
  updatedAt="updatedAt",
  tags="tags",
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
  equal = 'equal',
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
}

export enum TaskOperator {
  contains = Operators.contains,
  endsWith = Operators.endsWith,
  startsWith = Operators.startsWith,
  NOT = Operators.NOT,
  equal = Operators.equal,
}

export enum StatusOperator {
  NOT = Operators.NOT,
  contains = Operators.contains,
  equals = Operators.equal 
}

export enum DueDateOperator {
  gt = Operators.gt,
  equal = Operators.equal,
  lt = Operators.lt,
  lte = Operators.lte,
  gte = Operators.gte,
}

export enum TagsOperators {
  in = Operators.in,
  notIn = Operators.NOT_IN
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
