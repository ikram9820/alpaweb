import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions_api";

const slice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
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

export const loadProfile = () => (dispatch, getState) => {
  const { profile } = getState().entities.profile;
  if (profile) return;

  return dispatch(
    apiCallBegan({
      url: url + "/me",
      onSuccess: profileReceived.type,
      onStart: apiRequested.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const createProfile = (profile) =>
  apiCallBegan({
    url,
    method: "post",
    data: profile,
    onSuccess: profileCreated.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });

export const updateProfile = (profile) =>
  apiCallBegan({
    // /profile
    //PUT /profile/1
    url: url + "/me",
    method: "put",
    data: profile,
    onSuccess: profileUpdated.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });
