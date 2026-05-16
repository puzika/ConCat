import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

type RealtimeState = {
  isConnected: boolean,
  connectionId: string | null,
}

const initialState: RealtimeState = {
  isConnected: false,
  connectionId: null,
};

const realtimeSlice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    connected(state, action: PayloadAction<string>) {
      state.isConnected = true;
      state.connectionId = action.payload;
    },

    disconnected(state) {
      state.isConnected = false;
      state.connectionId = null;
    }
  }
});

export const {
  connected,
  disconnected
} = realtimeSlice.actions;

export const { reducer: realtimeReducer } = realtimeSlice;