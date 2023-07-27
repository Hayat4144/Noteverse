import {
  DueDateOperator,
  StatusOperator,
  TagsOperators,
  TaskOperator,
  taskField,
} from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type OperatorSet =
  | { defaultOperator: TaskOperator; operators: typeof TaskOperator }
  | { defaultOperator: StatusOperator; operators: typeof StatusOperator }
  | { defaultOperator: DueDateOperator; operators: typeof DueDateOperator }
  | { defaultOperator: TagsOperators; operators: typeof TagsOperators };

interface OperatorsRespose {
  operators: string[];
  defaultOperator: string;
}

export const getOperators = (field: string): OperatorsRespose => {
  if (
    field === taskField.title ||
    taskField.assignee ||
    taskField.description ||
    taskField.status
  ) {
    const defaultOperator = TaskOperator.contains;
    type TaskValue = `${TaskOperator}`;
    const operators: TaskValue[] = Object.values(TaskOperator);
    return { defaultOperator, operators };
  }
  const defaultOperator = TaskOperator.contains;
  type TaskValue = `${TaskOperator}`;
  const operators: TaskValue[] = Object.values(TaskOperator);
  return { defaultOperator, operators };
};
