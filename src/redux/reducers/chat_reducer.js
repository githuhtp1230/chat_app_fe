import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createChatService, fetchChats } from "../../services/chat_service";

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

const chatReducer = createSlice({
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
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.data = [...action.payload.data];
    });
  },
});

export const { updateChat } = chatReducer.actions;
export default chatReducer.reducer;
