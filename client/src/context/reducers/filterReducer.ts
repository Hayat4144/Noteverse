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
      const payload = action.payload;
      const isFieldExist = state.filter.filter(
        (item) => item.field === payload.field || item.id === payload.id,
      );
      if (isFieldExist.length > 0) {
        // Field exists, update its value
        const updatedSorts = state.filter.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item,
        );
        return {
          ...state,
          filter: updatedSorts,
        };
      } else {
        // Field does not exist, add a new filter object
        return {
          ...state,
          filter: [...state.filter, { ...payload }],
        };
      }
    case ActionTypes.removeFilter:
      const newFilters = state.filter.filter(
        (item) => item.id !== action.payload,
      );
      return { ...state, filter: newFilters };
    case ActionTypes.openfilterPopover:
      return { ...state, popoverOpen: action.payload };
    case ActionTypes.openFilter:
      return { ...state, isOpen: action.payload };
    default:
      return { ...state };
  }
};

export default filterReducer;
