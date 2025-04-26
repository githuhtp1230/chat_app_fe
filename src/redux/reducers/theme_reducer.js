import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfileService } from "../../services/profile_service";
import { login, logout } from "./auth_reducer";
import { KEY_THEME } from "../../constants/themes";

const getDataStorage = () => {
  const data = localStorage.getItem(KEY_THEME);
  return data ? JSON.parse(data) : {};
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getDataStorage()?.theme || "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      const dataStorage = getDataStorage();
      dataStorage.theme = action.payload;
      const jsonData = JSON.stringify(dataStorage);
      localStorage.setItem(KEY_THEME, jsonData);
      document.documentElement.setAttribute("data-theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
