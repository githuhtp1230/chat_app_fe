import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatPartnerInfo from "../../components/chat/ChatPartnerInfo";
import ChatDetail from "../../components/chat/ChatDetail";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChats,
  updateChat,
  updateStatusOnline,
} from "../../redux/reducers/chat_reducer";
import socketUtil from "../../utils/socket_util";
import SOCKET_CONSTS from "../../constants/socket_consts";
import { resetMessages } from "../../redux/reducers/message_reducer";
import RenderIf from "../../components/RenderIf";
import ChatMenu from "../../components/chat/ChatMenu";
import PATH from "../../constants/path";
import { IoMdPersonAdd } from "react-icons/io";

const ChatPage = () => {
  const { conversationId } = useParams();

  const dispatch = useDispatch();

  const onReceivedMessage = (chat) => {
    dispatch(updateChat(chat));
  };

  const onReceivedStatus = (status) => {
    dispatch(updateStatusOnline(status));
  };

  useEffect(() => {
    dispatch(getChats());

    socketUtil.connect(() => {
      socketUtil.subscribe(
        SOCKET_CONSTS.PREFIX_USER,
        currentUserId,
        onReceivedMessage
      );

      socketUtil.subscribe(SOCKET_CONSTS.PREFIX_STATUS, null, onReceivedStatus);

      socketUtil.sendStatus(true, currentUserId);
    });

    return () => {
      dispatch(resetMessages());
    };
  }, []);

  const chats = useSelector((state) => state.chat.data);
  const currentUserId = useSelector((state) => state.profile.data.id);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const selectedChat = chats?.find((chat) => chat.id == conversationId) || null;

  return (
    <div className="flex flex-1 box-border">
      <div className="bg-base-content/3 pt-3">
        <div className="flex justify-between items-center px-3">
          <h1 className="text-[20px] font-bold ml-2 text-base-content">
            Chats
          </h1>
          <Link
            to={`${PATH.CONTACTS}/${PATH.MODALS.ADD_CONTACT}`}
            className="cursor-pointer text-base-content/50 hover:text-base-content p-2 text-[22px]"
          >
            <IoMdPersonAdd />
          </Link>
        </div>
        {chats?.length <= 0 ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="w-[70%] text-center text-base-content/60 text">
              No chats here, add a contact to chat
            </h1>
          </div>
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
      {selectedChat ? (
        <ChatDetail
          chat={selectedChat}
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
        />
      ) : (
        <div className="flex justify-center items-center flex-1 text-base-content/60">
          <p className="px-3 py-2 bg-base-100 rounded-2xl">
            Select a chat to start messaging
          </p>
        </div>
      )}
      <RenderIf condition={selectedChat != null && isOpenMenu}>
        <ChatMenu chat={selectedChat} setIsOpenMenu={setIsOpenMenu}/>
      </RenderIf>
    </div>
  );
};

export default ChatPage;
