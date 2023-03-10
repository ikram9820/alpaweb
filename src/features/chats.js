import { createSlice } from "@reduxjs/toolkit";
import { ioCallBegan } from "./actions_io";
import { apiCallBegan } from "./actions_api";

const slice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    isLoading: false,
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
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

//only user chats
export const loadChats = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/chats",
      onSuccess: chatsReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const createChat = (chat) =>
  ioCallBegan({
    func: "emit",
    event: "createChat",
    data: chat,
    onSuccess: chatAdded.type,
  });

export const deleteChat = (chat) =>
  ioCallBegan({
    func: "emit",
    event: "deleteChat",
    data: chat,
    onSuccess: chatDeleted.type,
  });
