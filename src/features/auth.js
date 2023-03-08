import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions_api";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRequested: (state, action) => {
      state.isLoading = true;
    },

    userReceived: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    userUpdated: (state, action) => {
      state.user = action.payload
      state.isLoading = false;
      state.isSuccess = true;
    },

    userRequestFailed: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    logout: (state, action) => {
      state.user = null;
    },
    reset: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
});

export const {
  userReceived,
  userRequested,
  userRequestFailed,
  userUpdated,
  logout,
  reset,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const register = (user) => (dispatch, getState) => {
  if (getState.user) return;

  return dispatch(
    apiCallBegan({
      url: "/users",
      method: "post",
      data: user,
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const login = (user) => (dispatch, getState) => {
  if (getState.user) return;

  return dispatch(
    apiCallBegan({
      url: "/auth",
      method: "post",
      data: user,
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const updateUser = (user) => (dispatch, getState) => {

  return dispatch(
    apiCallBegan({
      url: "/users/me",
      method: "put",
      data: user,
      onStart: userRequested.type,
      onSuccess: userUpdated.type,
      onError: userRequestFailed.type,
    })
  );
};
