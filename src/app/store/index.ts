import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { realtimeReducer } from "../providers/realtime/realtime.slice";
import userReducer from "../../entities/user";

const rootReducer = combineReducers({ 
  userReducer,
  realtimeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});