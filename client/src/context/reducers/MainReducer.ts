import { combineReducers } from "@reduxjs/toolkit";
import sortReducer from "./sortReducer";
import TabReducer from "./Tabreducer";
import TaskReducer from "./Taskreducer";


const rootReducer = combineReducers({
    Sort:sortReducer,
    Tab:TabReducer,
    Task:TaskReducer,
})

export default rootReducer;


