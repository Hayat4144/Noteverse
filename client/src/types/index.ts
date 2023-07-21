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
  Not_Started ='Not Started',
  In_Progress ='In Progress',
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

export interface TaskResponse {
  data: taskObject[];
  resultPerPage: number;
  totalResults: number;
  error?: string | undefined;
}
