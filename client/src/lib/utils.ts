import {
  DueDateOperator,
  PriorityOperator,
  StatusOperator,
  TagsOperators,
  TaskOperator,
  taskField,
} from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import isUrl from 'is-url';
import data from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';

init({ data });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  const validUrl = isUrl(url);
  return validUrl;
};

export type OperatorSet =
  | { defaultOperator: TaskOperator; operators: typeof TaskOperator }
  | { defaultOperator: StatusOperator; operators: typeof StatusOperator }
  | { defaultOperator: DueDateOperator; operators: typeof DueDateOperator }
  | { defaultOperator: TagsOperators; operators: typeof TagsOperators };

interface OperatorsRespose {
  operators: string[];
  defaultOperator: string;
}

export const findEmojis = async (search: string) => {
  const emojis = await SearchIndex.search(search);
  return emojis.map((item: any) => {
    return { id: item.id, native: item.skins[0].native };
  });
};

export const getOperators = (field: string): OperatorsRespose => {
  if (field === taskField.priority) {
    const defaultOperator = PriorityOperator.equals;
    type TaskValue = `${PriorityOperator}`;
    const operators: TaskValue[] = Object.values(PriorityOperator);
    return { defaultOperator, operators };
  }

  if (field === taskField.tags) {
    const defaultOperator = TagsOperators.hasSome;
    type TaskValue = `${TagsOperators}`;
    const operators: TaskValue[] = Object.values(TagsOperators);
    return { defaultOperator, operators };
  }

  if (field === taskField.due_date) {
    const defaultOperator = DueDateOperator.lte;
    type TaskValue = `${DueDateOperator}`;
    const operators: TaskValue[] = Object.values(DueDateOperator);
    return { defaultOperator, operators };
  }

  const defaultOperator = TaskOperator.contains;
  type TaskValue = `${TaskOperator}`;
  const operators: TaskValue[] = Object.values(TaskOperator);
  return { defaultOperator, operators };
};
