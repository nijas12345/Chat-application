import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConversationByConv, fetchConversationByUser } from "../../services/api";

export const fetchConversationById = createAsyncThunk(
  "conversations/fetchByconvId",
  async (conversationId) => {
    const res = await fetchConversationByConv(conversationId)
    return res
  }
);

export const fetchConversationByUserId = createAsyncThunk(
  "conversations/fetchByUserId",
  async (userId) => {
    const res = await fetchConversationByUser(userId)
    return res
  }
);


const selectConversationSlice = createSlice({
  name: "conversations",
  initialState: {
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedConversation: (state) => {
      state.selected = null;
    },
    setSelectedConversation: (state, action) => {
      state.selected = action.payload; // manually update selected
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationById.pending, (state) => { state.loading = true; })
      .addCase(fetchConversationById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversationById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(fetchConversationByUserId.pending, (state) => { state.loading = true; })
      .addCase(fetchConversationByUserId.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversationByUserId.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { clearSelectedConversation, setSelectedConversation } =
  selectConversationSlice.actions;

export default selectConversationSlice.reducer



