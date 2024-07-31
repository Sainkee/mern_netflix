import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  contentType: "movie",
};

export const authenticationSlice = createSlice({
  name: "authenication",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = "";
      state.isAuthenticated = false;
    },
    setContentType: (state, action) => {
      state.contentType = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setContentType } =
  authenticationSlice.actions;

export default authenticationSlice;
