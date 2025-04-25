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
      contacts: [],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.data.contacts = [...action.payload.data];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data.contacts = state.data.contacts.filter(
          (contact) => contact.id != action.payload.data.id
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.data.contacts = [
          ...state.data.contacts,
          action.payload.data.contacted,
        ];
      });
  },
});

export default contactReducer.reducer;
