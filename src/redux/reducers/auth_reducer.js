import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { loginService, registerService } from "../../services/auth_service";
import Cookies from "js-cookie";
import { cookieUtils } from "../../utils/cookie_util";
import SECURITY from "../../constants/security";

export const register = createAsyncThunk(
  "/auth/register",
  async (request, { rejectWithValue }) => {
    const [error, result] = await registerService(request);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (request, { rejectWithValue }) => {
    const [error, result] = await loginService(request);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload.data.accessToken;
      cookieUtils.saveToken(token, SECURITY.KEY_ACCESS_TOKEN);
    });
  },
});

export default authSlice.reducer;
