import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { conversationApiSlice } from "../../services/api";

export const fetchConversations = createAsyncThunk(
  "conversations/fetch",
  async () => {
    const res = await conversationApiSlice() 
    return res
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    updateConversationList:(state,action) =>{
      const conv = action.payload;
      console.log("conv",conv);
      const index = state.list.findIndex((c) => c._id === conv._id);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
      state.list.unshift(conv);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const {updateConversationList} = conversationSlice.actions

export default conversationSlice.reducer;
