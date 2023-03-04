import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditProfile: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isEditProfileToggled: (state, action) => {
      state.isEditProfile = !state.isEditProfile;
    },
   
  },
});

export const {
  isEditProfileToggled
} = slice.actions;
export default slice.reducer;
