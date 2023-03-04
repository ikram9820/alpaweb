import { combineReducers } from "redux";
import userReducer from "../features/auth";
import profileReducer from "../features/profile";
import statusReducer from "../features/status";

export default combineReducers({
  auth: userReducer,
  profile: profileReducer,
  status: statusReducer,
});
