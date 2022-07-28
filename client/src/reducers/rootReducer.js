import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginSlice";
import modalReducer from "./reducer/modalSlice";
import userInfoReducer from "./reducer/userInfoSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  user: userInfoReducer,
});

export default rootReducer;
