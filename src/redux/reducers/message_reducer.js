import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../services/chat_service";
import { fetchMessagesPageOfChatService } from "../../services/message_service";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const fetchMessagesPageOfChat = createAsyncThunk(
  "/fetch-messages",
  async (request, { rejectWithValue }) => {
    const [error, result] = await fetchMessagesPageOfChatService(request);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

export const fetchMoreMessagesPageOfChat = createAsyncThunk(
  "/loadmore-messages",
  async (request, { rejectWithValue }) => {
    const [error, result] = await fetchMessagesPageOfChatService(request);
    if (error) {
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: {
      messages: [],
      sendingMessageIds: [],
      isLast: false,
    },
  },
  reducers: {
    sendMessageAction: (state, action) => {
      const id = uuidv4();
      state.data.sendingMessageIds.push(id);
      const now = new Date();
      const message = {
        id,
        content: action.payload.content,
        messageTime: format(now, "HH:mm"),
        messageTimeDetail: now.toISOString(),
        sender: {
          id: action.payload.currentUserId,
        },
      };
      state.data.messages = [...state.data.messages, message];
    },
    onReceivedMessageAction: (state, action) => {
      const receivedMessage = action.payload.message;
      const currentUserId = action.payload.currentUserId;
      if (receivedMessage.sender.id != currentUserId) {
        state.data.messages = [...state.data.messages, receivedMessage];
        return;
      }
      state.data.messages.forEach((message) => {
        if (!state.data.sendingMessageIds.includes(message.id)) {
          return message;
        }
        state.data.sendingMessageIds = state.data.sendingMessageIds.filter(
          (item) => item != message.id
        );
        message.id = receivedMessage.id;
      });
    },
    resetMessages: (state, _) => {
      state.data.isLast = false;
      state.data.messages = [];
      state.data.sendingMessageIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesPageOfChat.fulfilled, (state, action) => {
        state.data.messages = [...action.payload.data.messages];
        state.data.isLast = action.payload.data.pagination.last;
      })
      .addCase(fetchMoreMessagesPageOfChat.fulfilled, (state, action) => {
        state.data.messages = [
          ...action.payload.data.messages,
          ...state.data.messages,
        ];
        state.data.isLast = action.payload.data.pagination.last;
      });
  },
});

export const { sendMessageAction, onReceivedMessageAction, resetMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
