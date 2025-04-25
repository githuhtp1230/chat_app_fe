import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatPartnerInfo from "../../components/chat/ChatPartnerInfo";
import ChatDetail from "../../components/chat/ChatDetail";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChats, updateChat } from "../../redux/reducers/chat_reducer";
import socketUtil from "../../utils/socket_util";
import SOCKET_CONSTS from "../../constants/socket_consts";

const ChatPage = () => {
  const { conversationId } = useParams();

  const dispatch = useDispatch();

  const onReceivedMessage = (chat) => {
    dispatch(updateChat(chat));
  };

  useEffect(() => {
    dispatch(getChats());

    socketUtil.connect(() => {
      socketUtil.subscribe(
        SOCKET_CONSTS.PREFIX_USER,
        currentUserId,
        onReceivedMessage
      );
    });
  }, []);

  const chats = useSelector((state) => state.chat.data);
  const currentUserId = useSelector((state) => state.profile.data.id);

  const selectedChat = chats?.find((chat) => chat.id == conversationId) || null;

  return (
    <div className="flex flex-1">
      <ChatList chats={chats} />
      {selectedChat ? (
        <ChatDetail chat={selectedChat} />
      ) : (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatPage;
