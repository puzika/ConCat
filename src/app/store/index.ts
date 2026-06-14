import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { realtimeReducer } from "../providers/realtime/realtime.slice";
import userReducer from "../../entities/user";
import messageReducer from "../../entities/message";
import searchReducer from "../../widgets/sidebar";

const rootReducer = combineReducers({ 
  userReducer,
  realtimeReducer,
  messageReducer,
  searchReducer
});

export const store = configureStore({
  reducer: rootReducer,
});