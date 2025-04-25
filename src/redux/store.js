import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth_reducer";
import profileReducer from "./reducers/profile_reducer";
import chatReducer from "./reducers/chat_reducer";
import messageReducer from "./reducers/message_reducer";
import contactReducer from "./reducers/contact_reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    message: messageReducer,
    contact: contactReducer,
  },
});

export default store;
