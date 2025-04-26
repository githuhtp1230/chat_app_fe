import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfileService } from "../../services/profile_service";
import { login, logout } from "./auth_reducer";

export const getMyInfo = createAsyncThunk(
  "/me/profile",
  async (_, { rejectWithValue }) => {
    const [error, result] = await fetchProfileService();
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.data = { ...action.payload.data.user };
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.data = { ...action.payload.data };
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = null;
      });
  },
});

export default profileSlice.reducer;
