import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { backendApi } from "./apiSlice";

const store = configureStore({
  
  reducer: {
    [authenticationSlice.name]: authenticationSlice.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

setupListeners(store.dispatch);

export default store;
