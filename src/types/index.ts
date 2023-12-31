import { JwtPayload } from 'jsonwebtoken';


// Define custom properties for Request object
declare global {
  namespace Express {
    interface Request {
      user_id: string;
      email: string;
      name: string;
    }
  }
}

export interface SeachFrilters{
  field:string,
  opt:string,
  value:string
}

export interface SearchSort{
  field:string,
  value:string
}

export interface payload extends JwtPayload {
  roleId: string;
  email: string;
  name: string;
  id: string;
  created_at: Date;
}

export enum TaskPriority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export enum Status {
  'Not Started',
  'In Progress',
  'Completed'
}

export enum PrismaOperators {
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
  hasEvery = 'hasEvery'
}

// Define a union type for the case-insensitive operators
export type IncaseSensitiveOperators =
  | PrismaOperators.contains
  | PrismaOperators.endsWith
  | PrismaOperators.startsWith
  | PrismaOperators.hasEvery

export interface createTaskInput{
  title:string,
  description? :string,
  status:string,
  priority:TaskPriority
  due_date:Date,
  is_standalone: boolean
  assignee :string,
}