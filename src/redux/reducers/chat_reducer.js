import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../services/chat_service";

export const getChats = createAsyncThunk(
  "/me/conversations",
  async (_, { rejectWithValue }) => {
    const [error, result] = await fetchChats();
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.data = [...action.payload.data];
    });
  },
});

export default chatReducer.reducer;
