import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  active: boolean,
}

const initialState: SearchState = {
  active: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchState(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    }
  }
});

export const { setSearchState } = searchSlice.actions;

export const selectSearchState = (state: RootState) => {}  

export const { reducer: searchReducer } = searchSlice;