import { sortObejct } from '@/types';
import { ActionTypes, SortActionType } from './../actions/index';

interface initialStateInterface {
  sorts: sortObejct[];
  isOpen:boolean
}

const initialState: initialStateInterface = {
  sorts: [],
  isOpen:false
};

const sortReducer = (state = initialState, action: SortActionType) => {
  switch (action.type) {
    case ActionTypes.addSort:
      const field = action.payload.field;
      const isFieldExist = state.sorts.filter((item) => item.field === field);

      if (isFieldExist.length > 0) {
        // Field exists, update its value
        const updatedSorts = state.sorts.map((item) =>
          item.field === field
            ? { ...item, value: action.payload.value }
            : item,
        );
        return { ...state,isOpen:true, sorts: updatedSorts };
      } else {
        // Field does not exist, add a new sort object
        return {
          ...state,
          isOpen:true,
          sorts: [...state.sorts, { field, value: action.payload.value }],
        };
    }
    default:
      return { ...state };
  }
};

export default sortReducer;
