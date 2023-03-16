import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "chat",
  initialState: {
    messages: {},
    chat: {},
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.isLoading = true;
    },

    chatHistoryReceived: (state, action) => {
      const chat = action.payload.chat;
      if (chat) {
        state.chat = chat;
        state.messages[chat._id] = action.payload.messages;
      }
      state.isLoading = false;
    },

    messageAdded: (state, action) => {
      const chatId = action.payload.chat;
      if (chatId && state.messages[chatId])
        state.messages[chatId].push(action.payload);
      state.isLoading = false;
    },

    apiRequestFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  apiRequested,
  chatHistoryReceived,
  messageAdded,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "/messages";
// Action Creators
//only user chats
export const loadChatHistory = (chatId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + "/" + chatId,
      onSuccess: chatHistoryReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const addMessage = (data) =>
  apiCallBegan({
    url,
    method: "post",
    event: "sendMessage",
    data,
    onSuccess: messageAdded.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });
