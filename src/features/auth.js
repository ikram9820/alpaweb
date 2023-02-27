import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
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
    usersRequested: (state, action) => {
      state.isLoading = true;
    },

    usersReceived: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    usersRequestFailed: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    logout: (state, action) => {
      localStorage.removeItem("user");
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
  usersReceived,
  usersRequested,
  usersRequestFailed,
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
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};


export const login = (user) => (dispatch, getState) => {
  if (getState.user) return;

  return dispatch(
    apiCallBegan({
      url : "/auth",
      method: "post",
      data: user,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};
