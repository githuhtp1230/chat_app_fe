import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth_reducer";
import profileReducer from "./reducers/profile_reducer";
import chatReducer from "./reducers/chat_reducer";
import messageReducer from "./reducers/message_reducer";
import contactReducer from "./reducers/contact_reducer";
import themeReducer from "./reducers/theme_reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    message: messageReducer,
    contact: contactReducer,
    theme: themeReducer,
  },
});

export default store;
