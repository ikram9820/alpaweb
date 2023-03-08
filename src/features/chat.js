import { createSlice } from "@reduxjs/toolkit";


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
