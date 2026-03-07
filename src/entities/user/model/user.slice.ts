import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../shared/model/definitions";

const initialState: User = {
  id: '',
  username: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<Partial<User>>) => {
      state = { ...state, ...payload};
    }
  }
});

export const { updateUserInfo } = userSlice.actions;

export const selectUserId = (state: RootState) => state.userSlice.id;
export const selectUsername = (state: RootState) => state.userSlice.username;

export default userSlice.reducer;