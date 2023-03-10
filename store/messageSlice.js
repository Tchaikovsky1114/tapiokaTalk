import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messagesData: {},
    starredMessages: {},
  },
  reducers: {
    setChatMessages: (state, action) => {
      const existingMessages = state.messagesData;
      const { chatId, messagesData } = action.payload;
      existingMessages[chatId] = messagesData;
      state.messagesData = existingMessages;
    },

    setStarredMessage: (state, action) => {
      const { starredMessages } = action.payload;
      state.starredMessages = { ...starredMessages }
    }
  }
});

export const {setChatMessages, addStarredMessage, removeStarredMessage, setStarredMessage } = messageSlice.actions;
export default messageSlice.reducer;
