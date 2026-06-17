import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  isActive: boolean,
}

const initialState: SearchState = {
  isActive: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    }
  }
});

export const { setIsActive } = searchSlice.actions;

export const selectIsActive = (state: RootState) => state.searchReducer.isActive;  

export const { reducer: searchReducer } = searchSlice;