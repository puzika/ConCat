import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { realtimeReducer } from "../providers/realtime/realtime.slice";
import userReducer from "../../entities/user";
import messageReducer from "../../entities/message";

const rootReducer = combineReducers({ 
  userReducer,
  realtimeReducer,
  messageReducer
});

export const store = configureStore({
  reducer: rootReducer,
});