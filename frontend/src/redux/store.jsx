import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice";
import conversationsReducer from './slices/conversationSlice'
import selectConversationReducer from "./slices/selectedConversationSlice";
import messagesReducer from './slices/messageSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    conversations: conversationsReducer,
    selectConversation:selectConversationReducer,
    messages: messagesReducer,
  },
});

export default store;
