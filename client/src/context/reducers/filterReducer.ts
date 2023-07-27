import { filterobject } from '@/types';
import { ActionTypes, FilterActionType } from './../actions/index';

interface initialStateInterface {
  filter: filterobject[];
  isOpen: boolean;
  popoverOpen: boolean;
}

const initialState: initialStateInterface = {
  filter: [],
  isOpen: false,
  popoverOpen: false,
};

const filterReducer = (state = initialState, action: FilterActionType) => {
  switch (action.type) {
    case ActionTypes.addFilter:
      const field = action.payload.field;
      const id = action.payload.id;
      const value = action.payload.value;
      const operator = action.payload.operator;
      const isFieldExist = state.filter.filter(
        (item) => item.field === field || item.id === id,
      );
      if (isFieldExist.length > 0) {
        // Field exists, update its value
        const updatedSorts = state.filter.map((item) =>
          item.id === id ? { ...item, value, field, operator } : item,
        );
        return {
          ...state,
          filter: updatedSorts,
        };
      } else {
        // Field does not exist, add a new filter object
        return {
          ...state,
          filter: [...state.filter, { field, value, id, operator }],
        };
      }
    case ActionTypes.openfilterPopover:
      return { ...state, popoverOpen: action.payload };
    case ActionTypes.openFilter:
      return { ...state, isOpen: action.payload };
    default:
      return { ...state };
  }
};

export default filterReducer;
