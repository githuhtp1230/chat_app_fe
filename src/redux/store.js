import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth_reducer";
import profileReducer from "./reducers/profile_reducer";
import chatReducer from "./reducers/chat_reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
  },
});

export default store;
