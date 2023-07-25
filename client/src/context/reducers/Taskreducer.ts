import { ActionTypes, TaskActionType, taskstate } from '../actions';

const initailsState: taskstate = {
  isLoading: true,
  data: [],
  resultPerPage: 0,
  totalResults: 0,
  error: undefined,
};

const TaskReducer = (state = initailsState, action: TaskActionType) => {
  switch (action.type) {
    case ActionTypes.task:
      const { isLoading, data, resultPerPage, totalResults } =
        action.payload.field;
      return {...state,isLoading,data,resultPerPage,totalResults};
    default:
      return state;
  }
};

export default TaskReducer;