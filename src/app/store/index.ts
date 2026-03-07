import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../../entities/user/model/user.slice";

const rootReducer = combineReducers({ userSlice });

export const store = configureStore({
  reducer: rootReducer,
});