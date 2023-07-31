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
  if (field === taskField.tags) {
    const defaultOperator = TagsOperators.in;
    type TaskValue = `${TagsOperators}`;
    const operators: TaskValue[] = Object.values(TagsOperators);
    return { defaultOperator, operators };
  }

  if(field === taskField.due_date){
    const defaultOperator = DueDateOperator.equal;
    type TaskValue = `${DueDateOperator}`
    const operators:TaskValue[] =Object.values(DueDateOperator)
    return{defaultOperator,operators}
  }
 
  const defaultOperator = TaskOperator.contains;
  type TaskValue = `${TaskOperator}`;
  const operators: TaskValue[] = Object.values(TaskOperator);
  return { defaultOperator, operators };
};
