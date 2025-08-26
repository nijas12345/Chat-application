import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messageApiSlice } from "../../services/api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({conversationId,page=1,limit=8}) => {
     const response = await messageApiSlice(conversationId,page,limit)
    return {messages:response.data,page}; 
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    list: [],   // array of messages
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    addMessage: (state, action) => {
      state.list.push(action.payload);
    },
    clearMessages: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true; // reset when clearing messages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;

        const { messages, page } = action.payload;
        console.log("mes",messages);
        
        if (page === 1) {
          // First page of a conversation
          state.list = messages;
          state.hasMore = messages.length > 0; // reset for new conversation
        } else {
          // Older messages pagination
          state.list = [...messages, ...state.list];
          state.hasMore = messages.length > 0; // stop if no more older messages
        }

        state.page = page;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
