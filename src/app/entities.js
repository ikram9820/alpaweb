import { combineReducers } from "redux";
import userReducer from "../features/auth";

export default combineReducers({
  auth: userReducer,
});
