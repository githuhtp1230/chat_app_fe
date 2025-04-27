import React, { useEffect, useRef, useState } from "react";
import ChatPartnerInfo from "./ChatPartnerInfo";
import MessageList from "../message/MessageList";
import ChatInputBar from "./ChatInputBar";
import {
  fetchMessagesOfChat,
  fetchMessagesPageOfChatService,
  sendMessagService,
} from "../../services/message_service";
import socketUtil from "../../utils/socket_util";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../redux/reducers/chat_reducer";
import SOCKET_CONSTS from "../../constants/socket_consts";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import RenderIf from "../RenderIf";
import { ClipLoader } from "react-spinners";
import {
  fetchMessagesPageOfChat,
  onReceivedMessageAction,
  resetMessages,
  sendMessageAction as sendMessageAction,
} from "../../redux/reducers/message_reducer";
import { MESSAGE_CONSTS, SCROLL_MODE } from "../../constants/ui_consts";
import ChatMenu from "./ChatMenu";

const ChatDetail = ({ chat, isOpenMenu, setIsOpenMenu }) => {
  const dispatch = useDispatch();

  const [isOtherSendingMessage, setIsOtherSendingMessage] = useState(false);
  const [scrollMode, setScrollMode] = useState(SCROLL_MODE.TO_LAST);

  const currentUserId = useSelector((state) => state.profile.data.id);
  const messages = useSelector((state) => state.message.data.messages);

  const onSendMessage = (content) => {
    setScrollMode(SCROLL_MODE.TO_LAST);
    dispatch(sendMessageAction({ currentUserId, content }));
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
    setScrollMode(SCROLL_MODE.TO_LAST);
    dispatch(onReceivedMessageAction({ message, currentUserId }));
  };

  useEffect(() => {
    if (!chat.id) {
      dispatch(resetMessages());
    }

    dispatch(
      fetchMessagesPageOfChat({
        chatId: chat.id,
        size: MESSAGE_CONSTS.PAGE_SIZE,
      })
    );

    setScrollMode(SCROLL_MODE.TO_LAST);

    socketUtil.connect(() => {
      if (!chat.id) return;
      socketUtil.subscribe(
        SOCKET_CONSTS.PREFIX_CHAT,
        chat.id,
        onReceivedMessage
      );
    });

    return () => {
      if (!chat.id) return;
      socketUtil.unsubscribe(SOCKET_CONSTS.PREFIX_CHAT, chat.id);
    };
  }, [chat.id]);

  return (
    <div className="flex-2 flex flex-col ml-[3px]">
      <ChatPartnerInfo
        chatPartner={chat?.chatPartner}
        setIsOpenMenu={setIsOpenMenu}
        isOnline={chat.isOnline}
      />
      {messages?.length <= 0 ? (
        <div className="flex justify-center items-center flex-1">
          <h1 className="text-base-content/50">
            No messages have been sent here yet
          </h1>
        </div>
      ) : (
        <MessageList
          chatId={chat.id}
          isOtherSendingMessage={isOtherSendingMessage}
          chatPartner={chat.chatPartner}
          scrollMode={scrollMode}
          setScrollMode={setScrollMode}
        />
      )}
      <ChatInputBar
        chatId={chat.id}
        onSendMessage={onSendMessage}
        onReceivedMessage={onReceivedMessage}
      />
    </div>
  );
};

export default ChatDetail;
