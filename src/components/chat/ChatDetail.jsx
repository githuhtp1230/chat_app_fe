import React, { useEffect, useRef, useState } from "react";
import ChatPartnerInfo from "./ChatPartnerInfo";
import MessageList from "../message/MessageList";
import ChatInputBar from "./ChatInputBar";
import {
  fetchMessagesOfChat,
  fetchMessagesPageOfChat,
  sendMessage,
} from "../../services/message_service";
import socketUtil from "../../utils/socket_util";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../redux/reducers/chat_reducer";
import SOCKET_CONSTS from "../../constants/socket_consts";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import RenderIf from "../RenderIf";
import { ClipLoader } from "react-spinners";

const ChatDetail = ({ chat }) => {
  const [messages, setMessages] = useState(null);
  const currentUserId = useSelector((state) => state.profile.data.id);
  const isSendingSetRef = useRef(new Set());
  const currentPageRef = useRef(1);
  const [isLoadingMoreMessage, setIsLoadingMoreMessage] = useState(false);
  const [isOtherSendingMessage, setIsOtherSendingMessage] = useState(false);

  const SIZE = 20;

  const onLoadMoreMessage = async () => {
    setIsLoadingMoreMessage(true);
    setTimeout(async () => {
      currentPageRef.current++;
      const [error, result] = await fetchMessagesPageOfChat(
        chat.id,
        SIZE,
        currentPageRef.current
      );
      if (!error) {
        setMessages((prevMessage) => [...result.data.content, ...prevMessage]);
      } else {
        console.error("Error fetching messages:", error);
      }
      setIsLoadingMoreMessage(false);
    }, 300);
  };

  const onSendMessage = (content) => {
    const id = uuidv4();
    isSendingSetRef.current.add(id);
    const now = new Date();
    const sender = {
      id: currentUserId,
    };
    const message = {
      id,
      content,
      messageTime: format(now, "HH:mm"),
      messageTimeDetail: now.toISOString(),
      sender,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const onReceivedMessage = (message) => {
    if (message.isSending) {
      if (message.sender.id !== currentUserId) {
        setIsOtherSendingMessage(true);
        setTimeout(() => {
          setIsOtherSendingMessage(false);
        }, 3000);
        return;
      }
      return;
    }
    if (message.sender.id !== currentUserId) {
      setMessages((prevMessages) => [...prevMessages, message]);
      return;
    }
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.forEach((newMessage) => {
        if (!isSendingSetRef.current.has(newMessage.id)) {
          return newMessage;
        }
        isSendingSetRef.current.delete(newMessage.id);
        newMessage.id = message.id;
        return newMessage;
      });
      return newMessages;
    });
    return;
  };

  useEffect(() => {
    currentPageRef.current = 0;
    const fetchMessages = async () => {
      const [error, result] = await fetchMessagesPageOfChat(
        chat.id,
        SIZE,
        currentPageRef.current
      );
      if (!error) {
        setMessages(result.data.content);
      } else {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socketUtil.connect(() => {
      socketUtil.subscribe(
        SOCKET_CONSTS.PREFIX_CHAT,
        chat.id,
        onReceivedMessage
      );
    });

    return () => {
      socketUtil.unsubscribe(SOCKET_CONSTS.PREFIX_CHAT, chat.id);
    };
  }, [chat.id]);

  return (
    <div className="flex-1 flex flex-col ml-[3px]">
      <ChatPartnerInfo chatPartner={chat?.chatPartner} />
      <MessageList
        messages={messages}
        isSendingSet={isSendingSetRef.current}
        onLoadMessage={onLoadMoreMessage}
        chatId={chat.id}
        isLoadingMoreMessage={isLoadingMoreMessage}
        isOtherSendingMessage={isOtherSendingMessage}
        chatPartner={chat.chatPartner}
      />
      <ChatInputBar chatId={chat.id} onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatDetail;
