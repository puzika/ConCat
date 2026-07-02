import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userSchema";

const initialState: User = {
  id: null,
  username: '',
  email: '',
  is_online: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<Partial<User>>) => {
      return {
        ...state,
        ...payload
      }
    }
  }
});

export const { updateUserInfo } = userSlice.actions;

export const selectUserId = (state: RootState) => state.userReducer.id;
export const selectUsername = (state: RootState) => state.userReducer.username;
export const selectUserEmail = (state: RootState) => state.userReducer.email;
export const selectUserState = (state: RootState) => state.userReducer;

export const { reducer: userReducer } = userSlice;