import { combineReducers } from "redux";
import userReducer from "../features/auth";
import profileReducer from "../features/profile";

export default combineReducers({
  auth: userReducer,
  profile: profileReducer,
});
