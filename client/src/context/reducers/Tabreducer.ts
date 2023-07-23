import { ActionTypes, TaskToggleActionType } from "../actions"

const  initialState  ={
    isTasktab:true
}


const TabReducer = (state=initialState,action:TaskToggleActionType)=>{
  switch(action.type){
    case ActionTypes.toggleTaskTab:
        return {...state,isTasktab:action.payload} 
    default:
        return {...state}
  } 
}

export default TabReducer;