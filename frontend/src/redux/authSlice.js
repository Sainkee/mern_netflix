import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
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
  },
});

export const { loginUser, logoutUser } = authenticationSlice.actions;

export default authenticationSlice;
