import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
