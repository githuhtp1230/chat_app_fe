import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatPartnerInfo from "../../components/chat/ChatPartnerInfo";
import ChatDetail from "./ChatDetail";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../redux/reducers/chat_reducer";

const ChatPage = () => {
  const { conversationId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const chats = useSelector((state) => state.chat.data);

  const selectedChat = chats?.find((chat) => chat.id == conversationId) || null;

  console.log("hello2");

  return (
    <div className="flex flex-1">
      <ChatList chats={chats} />
      {selectedChat ? <ChatDetail chat={selectedChat} /> : <div>None chat</div>}
    </div>
  );
};

export default ChatPage;
