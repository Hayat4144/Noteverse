import { sortObject } from '@/types';
import { ActionTypes, SortActionType } from './../actions/index';

interface initialStateInterface {
  sorts: sortObject[];
  isOpen: boolean;
  popoverOpen: boolean;
}

const initialState: initialStateInterface = {
  sorts: [],
  isOpen: false,
  popoverOpen: false,
};

const sortReducer = (state = initialState, action: SortActionType) => {
  switch (action.type) {
    case ActionTypes.addSort:
      const field = action.payload.field;
      const id = action.payload.id;
      const value = action.payload.value;
      const isFieldExist = state.sorts.filter(
        (item) => item.field === field || item.id === id,
      );

      if (isFieldExist.length > 0) {
        // Field exists, update its value
        const updatedSorts = state.sorts.map((item) =>
          item.id === id ? { ...item, value, field } : item,
        );
        return {
          ...state,
          sorts: updatedSorts,
        };
      } else {
        // Field does not exist, add a new sort object
        return {
          ...state,
          sorts: [...state.sorts, { field, value, id }],
        };
      }
    case ActionTypes.opensortPopover:
      return { ...state, popoverOpen: action.payload };
    case ActionTypes.openSort:
      return {...state,isOpen:action.payload}
    default:
      return { ...state };
  }
};

export default sortReducer;
