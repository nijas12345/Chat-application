import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userSlice } from "../../services/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await userSlice()
  return res 
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],    
    loading: false,
    error: null,
  },
  reducers: {
    updateUserStatus: (state, action) => {
      const { _id, isOnline } = action.payload;

      const user = state.list.find((u) => u._id === _id);
      
      if (user) {
        user.isOnline = isOnline;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { updateUserStatus } = usersSlice.actions;
export default usersSlice.reducer;
