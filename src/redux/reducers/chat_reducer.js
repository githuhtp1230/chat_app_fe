import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createChatService,
  deleteChatService,
  fetchChats,
} from "../../services/chat_service";

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

export const createChat = createAsyncThunk(
  "/me/create-conversation",
  async (chatPartnerId, { rejectWithValue }) => {
    const [error, result] = await createChatService(chatPartnerId);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

export const deleteChat = createAsyncThunk(
  "/me/delete-conversation",
  async (chatId, { rejectWithValue }) => {
    const [error, result] = await deleteChatService(chatId);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: null,
  },
  reducers: {
    updateChat: (state, action) => {
      const filtered = state.data.filter(
        (chat) => chat.id !== action.payload.id
      );
      state.data = [action.payload, ...filtered];
    },
    updateStatusOnline: (state, action) => {
      state.data.forEach((chat) => {
        if (chat.chatPartner.id === action.payload.userId) {
          chat.isOnline = action.payload.online;
        }
      });
    },
    getCurrentStatus: (state, action) => {
      for (let chat of state.data) {
        if (action.payload.userId == chat.chatPartner.id && chat.isOnline) {
          return true;
        }
      }
      return false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.data = [...action.payload.data];
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id != action.payload.data.id
        );
      });
  },
});

export const { updateChat, updateStatusOnline } = chatSlice.actions;
export default chatSlice.reducer;
