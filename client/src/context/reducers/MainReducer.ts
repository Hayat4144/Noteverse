import { combineReducers } from "@reduxjs/toolkit";
import sortReducer from "./sortReducer";
import TabReducer from "./Tabreducer";
import TaskReducer from "./Taskreducer";
import TaskSheetReducer from "./TaskSheetReducer";


const rootReducer = combineReducers({
    Sort:sortReducer,
    Tab:TabReducer,
    Task:TaskReducer,
    TaskSheet:TaskSheetReducer
})

export default rootReducer;


