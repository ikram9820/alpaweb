import { combineReducers } from "redux";
import userReducer from "../features/auth";
import chatReducer from "../features/chat";
import chatsReducer from "../features/chats";
import profileReducer from "../features/profile";
import statusReducer from "../features/status";
import visibilityReducer from "../features/visibility";


export default combineReducers({
  auth: userReducer,
  chat: chatReducer,
  chats: chatsReducer,
  profile: profileReducer,
  status: statusReducer,
  visibility: visibilityReducer,
});
