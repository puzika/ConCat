import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}
});

declare type AppStore = typeof store;
declare type RootState = ReturnType<AppStore['getState']>;
declare type AppDispatch = AppStore['dispatch'];