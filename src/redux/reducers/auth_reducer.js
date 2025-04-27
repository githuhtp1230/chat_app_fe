import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {
  loginService,
  logoutService,
  registerService,
} from "../../services/auth_service";
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (request, { rejectWithValue }) => {
    const [error, result] = await logoutService();
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  // peding, reject, fullfiled
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const accessToken = action.payload.data.accessToken;
        const refreshToken = action.payload.data.refreshToken;
        cookieUtils.saveToken(accessToken, SECURITY.KEY_ACCESS_TOKEN);
        cookieUtils.saveToken(refreshToken, SECURITY.KEY_REFRESH_TOKEN);
      })
      .addCase(logout.fulfilled, (state, action) => {
        cookieUtils.removeStorage(SECURITY.KEY_ACCESS_TOKEN);
      });
  },
});

export default authSlice.reducer;
