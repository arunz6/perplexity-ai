import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/auth.slice.js";
import chatreducer from "./feature/chat/chat.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatreducer,
  },
});

export default store;
