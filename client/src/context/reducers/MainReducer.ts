import { combineReducers } from "@reduxjs/toolkit";
import sortReducer from "./sortReducer";


const rootReducer = combineReducers({
    Sort:sortReducer,
})

export default rootReducer;


