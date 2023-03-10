import { createSlice } from "@reduxjs/toolkit";
import { ioCallBegan } from "./actions_io";
import { apiCallBegan } from "./actions_api";

const slice = createSlice({
  name: "chat",
  initialState: {
    messages: {},
    users: {},
    chat: null,
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.isLoading = true;
    },

    chatHistoryReceived: (state, action) => {
      const chat =action.payload.chat;
      state.chat = chat
      state.users[chat._id] = action.payload.users;
      state.messages[chat._id] = action.payload.messages;
      state.isLoading = false;
    },

    userAdded: (state, action) => {
      state.users.push(action.payload);
    },

    userDeleted: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload.userId
      );
    },

    messageAdded: (state, action) => {
      state.messages.push(action.payload);
    },

    messageDeleted: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload.messageId
      );
    },

    apiRequestFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  apiRequested,
  chatHistoryReceived,
  userAdded,
  userDeleted,
  messageAdded,
  messageDeleted,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

//only user chats
export const loadChatHistory = (chatId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `/chats/:${chatId}`,
      onSuccess: chatHistoryReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};



export const addUser = (user) =>
  ioCallBegan({
    func: "emit",
    event: "addUserToChat",
    data: user,
    onSuccess: userAdded.type,
  });

  export const deleteUser = (userId) =>
    ioCallBegan({
      func: "emit",
      event: "deleteUserFromChat",
      data: userId,
      onSuccess: userDeleted.type,
    });

export const addMessage = (message) =>
  ioCallBegan({
    func: "emit",
    event: "sendMessage",
    data: message,
    onSuccess: messageAdded.type,
  });

export const deleteMessage = (messageId) =>
  ioCallBegan({
    func: "emit",
    event: "deleteMessage",
    data: messageId,
    onSuccess: messageDeleted.type,
  });
