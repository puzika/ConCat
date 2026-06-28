import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PopupState = {
  isOpen: boolean,
  name: 'sidebar' | 'profile' | '',
}

const initialState: PopupState = {
  isOpen: false,
  name: '',
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(_, { payload: name }: PayloadAction<PopupState['name']>) {
      return {
        isOpen: true,
        name,
      }
    },

    closePopup(_) {
      return {
        isOpen: false,
        name: '',
      }
    }
  },
});

export const {
  openPopup,
  closePopup
} = popupSlice.actions;

export const selectPopupIsOpen = (state: RootState) => state.popupReducer.isOpen;
export const selectPopupName = (state: RootState) => state.popupReducer.name;

export const { reducer: popupReducer } = popupSlice;