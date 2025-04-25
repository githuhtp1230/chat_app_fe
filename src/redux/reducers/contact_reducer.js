import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../services/chat_service";
import {
  addContactService,
  deleteContactService,
  fetchMyContacts,
} from "../../services/contact_service";

export const getContacts = createAsyncThunk(
  "/me/fetch-contacts",
  async (_, { rejectWithValue }) => {
    const [error, result] = await fetchMyContacts();
    if (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

export const deleteContact = createAsyncThunk(
  "/me/delete-contact",
  async (contactId, { rejectWithValue }) => {
    const [error, result] = await deleteContactService(contactId);
    if (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

export const addContact = createAsyncThunk(
  "/me/add-contact",
  async (contactEmail, { rejectWithValue }) => {
    const [error, result] = await addContactService(contactEmail);
    if (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data);
    }
    return result;
  }
);

const contactReducer = createSlice({
  name: "chat",
  initialState: {
    data: {
      chat: null,
      contacts: [],
    },
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.data.chat = action.payload;
    },
    updateCurrentChat: (state, action) => {
      state.data.contacts.forEach((contact, index) => {
        if (!contact.conversationId) {
          state.data.contacts[index].conversationId = action.payload.id;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.data.contacts = [...action.payload.data];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data.contacts = state.data.contacts.filter(
          (contact) => contact.contacted.id != action.payload.data.id
        );
        state.data.chat = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.data.contacts = [
          ...state.data.contacts,
          {
            contacted: action.payload.data.contacted,
          },
        ];
      });
  },
});

export const { setCurrentChat, updateCurrentChat } = contactReducer.actions;
export default contactReducer.reducer;
