import { JwtPayload } from 'jsonwebtoken';

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

export interface createTaskInput{
  title:string,
  description? :string,
  status:string,
  priority:TaskPriority
  due_date:Date,
  is_standalone: boolean
  assignee :string,
}