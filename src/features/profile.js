import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.isLoading = true;
    },
    apiRequestFailed: (state, action) => {
      state.isLoading = false;
    },

    profileReceived: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },

    profileCreated: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    profileUpdated: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  profileCreated,
  profileUpdated,
  profileReceived,
  apiRequested,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/profile";


export const createProfile = (profile) =>
  apiCallBegan({
    url,
    method: "post",
    data: profile,
    onSuccess: profileCreated.type,
  });

export const updateProfile = (profile) =>
  apiCallBegan({
    // /profile
    //PUT /profile/1
    url: url + "/" + profile.id,
    method: "put",
    data: profile,
    onSuccess: profileUpdated.type,
  });



