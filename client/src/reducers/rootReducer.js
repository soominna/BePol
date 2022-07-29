import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";
import userInfoReducer from "./userInfoSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  user: userInfoReducer,
});

export default rootReducer;
