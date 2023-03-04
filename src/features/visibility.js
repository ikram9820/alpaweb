import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "visibility",
  initialState: {
    visibility: {},
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

    visibilityReceived: (state, action) => {
      state.visibility = action.payload;
      state.isLoading = false;
    },

    visibilityCreated: (state, action) => {
      state.visibility = action.payload;
      state.isLoading = false;
    },
    visibilityUpdated: (state, action) => {
      state.visibility = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  visibilityCreated,
  visibilityUpdated,
  visibilityReceived,
  apiRequested,
  apiRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/visibility";


export const createVisibility = (visibility) =>
  apiCallBegan({
    url,
    method: "post",
    data: visibility,
    onSuccess: visibilityCreated.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });

export const updateVisibility = (visibility) =>
  apiCallBegan({
    // /visibility
    //PUT /visibility/1
    url: url + "/" + visibility.id,
    method: "put",
    data: visibility,
    onSuccess: visibilityUpdated.type,
    onStart: apiRequested.type,
    onError: apiRequestFailed.type,
  });



