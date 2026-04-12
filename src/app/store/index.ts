import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../entities/user";
import realtimeReducer from "../../features/realtime";

const rootReducer = combineReducers({ 
  userReducer,
  realtimeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});