import React, { useEffect, useState } from "react";
import ChatPartnerInfo from "../../components/chat/ChatPartnerInfo";
import MessageList from "../../components/message/MessageList";
import SendMessageInput from "../../components/message/SendMessageInput";
import { fetchMessagesOfChat } from "../../services/message_service";
import socketUtil from "../../utils/socket_util";

const ChatDetail = ({ chat }) => {
  const [messages, setMessages] = useState(null);

  const onReceivedMessage = (message) => {
    console.log(message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const [error, result] = await fetchMessagesOfChat(chat.id);
      if (!error) {
        setMessages(result.data);
      } else {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socketUtil.connect(() => {
      socketUtil.subscribe(chat.id, onReceivedMessage);
    });

    return () => {
      socketUtil.unsubscribe(chat.id);
    };
  }, [chat.id]);

  return (
    <div className="flex-1 flex flex-col ml-[3px]">
      <ChatPartnerInfo chatPartner={chat?.chatPartner} />
      <MessageList messages={messages} />
      <SendMessageInput chatId={chat.id} />
    </div>
  );
};

export default ChatDetail;
