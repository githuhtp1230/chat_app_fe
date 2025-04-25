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

const ChatDetail = ({ chat }) => {
  const dispatch = useDispatch();

  const [isLoadingMoreMessage, setIsLoadingMoreMessage] = useState(false);
  const [isOtherSendingMessage, setIsOtherSendingMessage] = useState(false);
  const [scrollMode, setScrollMode] = useState(SCROLL_MODE.TO_LAST);

  const currentUserId = useSelector((state) => state.profile.data.id);

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
    dispatch(
      fetchMessagesPageOfChat({
        chatId: chat.id,
        size: MESSAGE_CONSTS.PAGE_SIZE,
      })
    );

    setScrollMode(SCROLL_MODE.TO_LAST);

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
        chatId={chat.id}
        isLoadingMoreMessage={isLoadingMoreMessage}
        isOtherSendingMessage={isOtherSendingMessage}
        chatPartner={chat.chatPartner}
        scrollMode={scrollMode}
        setScrollMode={setScrollMode}
      />
      <ChatInputBar chatId={chat.id} onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatDetail;
