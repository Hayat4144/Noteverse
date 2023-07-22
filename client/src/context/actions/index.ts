// types/index.ts
export enum ActionTypes {
  addFilter = 'ADDFILTER',
  removeFilter = 'REMOVEFILTER',
  addSort = 'ADDSORT',
  removeSort = 'REMOVESORT'
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

export interface addSortAction{
    type:ActionTypes.addSort,
    payload:{
        field:string,
        value:string
    }
}
// Create a union type of all possible action types
export type FilterActionType = AddFilterAction | RemoveFilterAction;
export type SortActionType = addSortAction