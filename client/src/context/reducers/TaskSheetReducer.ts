import { ActionTypes, TaskSheetToggleActionType  } from '../actions';

interface statetypes{
    isOpen:boolean
}

const initailsState :statetypes= {
  isOpen: false,
};

const TaskSheetReducer = (state = initailsState, action: TaskSheetToggleActionType) => {
  switch (action.type) {
    case ActionTypes.taskSheetoogle:
        return {...state,isOpen:action.payload}
    default:
      return state;
  }
};

export default TaskSheetReducer;
