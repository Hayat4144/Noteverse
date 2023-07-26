import { taskObject } from '@/types';

// types/index.ts

export interface taskstate {
  isLoading: boolean;
  data: taskObject[] | [];
  resultPerPage: number;
  totalResults: number;
  error?: string | undefined;
}

export enum ActionTypes {
  addFilter = 'ADDFILTER',
  removeFilter = 'REMOVEFILTER',
  addSort = 'ADDSORT',
  removeSort = 'REMOVESORT',
  toggleTaskTab = 'TOGGLETASKTAB',
  task = 'TASK',
  opensortPopover = 'OPENSORTPOPOVER',
  openSort ='OPENSORT',
  taskSheetoogle="TASKSHEETTOOGLE",
}

export interface AddFilterAction {
  type: ActionTypes.addFilter;
  payload: {
    data: string;
  };
}

export interface RemoveFilterAction {
  type: ActionTypes.removeFilter;
  payload: {
    count: number;
  };
}

export interface addSortAction {
  type: ActionTypes.addSort;
  payload: {
    field: string;
    value: string;
    id:string
  };
}

export interface taskTabToggleAction {
  type: ActionTypes.toggleTaskTab;
  payload: boolean;
}

export interface taskAction {
  type: ActionTypes.task;
  payload: {
    field: taskstate;
  };
}

export interface sortPopoverAction{
  type:ActionTypes.opensortPopover,
  payload:boolean
}

export interface sortOpenAction {
  type:ActionTypes.openSort,
  payload:boolean
}

export interface addTaskSheet{
  type:ActionTypes.taskSheetoogle,
  payload:boolean
}

// Create a union type of all possible action types
export type FilterActionType = AddFilterAction | RemoveFilterAction;
export type SortActionType = addSortAction | sortPopoverAction | sortOpenAction;
export type TaskToggleActionType = taskTabToggleAction;
export type TaskActionType = taskAction; 
export type TaskSheetToggleActionType = addTaskSheet; 
