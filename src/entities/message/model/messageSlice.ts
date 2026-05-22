import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type MessageState = {
  messageStatus: 'regular' | 'edit' | 'reply',
  messageId: number | null,
  messageContent: string,
};

const initialState: MessageState = {
  messageStatus: 'regular',
  messageId: null,
  messageContent: ''
}

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState: initialState as MessageState,
  reducers: {
    setMessageState: (_, { payload }: PayloadAction<MessageState>) => {
      return payload;
    }
  }
});

export const { setMessageState } = messageSlice.actions;

export const selectMessageId = (state: RootState) => state.messageReducer.messageId;
export const selectMessageStatus = (state: RootState) => state.messageReducer.messageStatus;
export const selectMessageContent = (state: RootState) => state.messageReducer.messageContent;

export const { reducer: messageReducer } = messageSlice;