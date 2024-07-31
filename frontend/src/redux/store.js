import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { backendApiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenication"], // Specify which slices you want to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [authenticationSlice.name]: authenticationSlice.reducer,
    [backendApiSlice.reducerPath]: backendApiSlice.reducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(backendApiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
