import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { realtimeReducer } from "../providers/realtime/realtime.slice";
import userReducer from "../../entities/user";
import messageReducer from "../../entities/message";
import searchReducer from "../../widgets/sidebar";
import { popupReducer } from "../../shared/model/popupSlice";

const rootReducer = combineReducers({ 
  userReducer,
  realtimeReducer,
  messageReducer,
  searchReducer,
  popupReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});