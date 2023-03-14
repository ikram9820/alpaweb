import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "chats",
  initialState: {
    list: [],
    isLoading: false,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.isLoading = true;
    },

    chatsReceived: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    groupCreated: (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
    },

    apiRequestFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { apiRequested, chatsReceived, groupCreated, apiRequestFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators
const url = "/chats"
//only user chats
export const loadChats = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onSuccess: chatsReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const createGroup = (data) =>
  apiCallBegan({
    url:url+"/group",
    method: "post",
    event: "createGroup",
    data,
    onSuccess: groupCreated.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });
