import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import applicantReducer from "./reducers/applicant";

const rootReducer = combineReducers({
  counter: counterReducer,
  applicant: applicantReducer,
});

export default rootReducer;
