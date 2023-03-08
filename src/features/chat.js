import { createSlice } from "@reduxjs/toolkit";
import { ioCallBegan } from "./actions_io";
import moment from "moment";

const slice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    chats: [],
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.isLoading = true;
    },

    chatsReceived: (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
    },

    chatAdded: (state, action) => {
      state.chats.push(action.payload);
    },

    chatDeleted: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat.id !== action.payload.chatId
      );
    },

    usersReceived: (state, action) => {
      state.users = action.payload;
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

    messagesReceived: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
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
  chatsReceived,
  chatAdded,
  chatDeleted,
  userAdded,
  usersReceived,
  userDeleted,
  messagesReceived,
  messageAdded,
  messageDeleted,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

//only user chats
export const loadChats = () => (dispatch, getState) => {
  return dispatch(
    ioCallBegan({
      func: "on",
      event: "",
      onSuccess: chatsReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

//only those users which are available in user's chats
export const loadUsers = () => (dispatch, getState) => {
  return dispatch(
    ioCallBegan({
      func: "on",
      event: "",
      onSuccess: usersReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

//only those users with whome chat is done
export const loadMessages = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.chat;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    ioCallBegan({
      func: "on",
      event: "",
      onSuccess: messagesReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const addChat = (chat) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "post",
    data: chat,
    onSuccess: chatAdded.type,
  });

export const addUser = (user) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "post",
    data: user,
    onSuccess: userAdded.type,
  });

export const addMessage = (message) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "post",
    data: message,
    onSuccess: messageAdded.type,
  });

export const deleteChat = (chat) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "delete",
    data: chat,
    onSuccess: chatDeleted.type,
  });

export const deleteUser = (user) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "delete",
    data: user,
    onSuccess: userDeleted.type,
  });

export const deleteMessage = (message) =>
  ioCallBegan({
    func: "emit",
    event: "",
    method: "delete",
    data: message,
    onSuccess: messageDeleted.type,
  });
