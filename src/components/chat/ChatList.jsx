import React, { useEffect } from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import PATH from "../../constants/path";
import icons from "../../utils/icons";
const { IoMdPersonAdd } = icons;

const ChatList = ({ chats }) => {
  return (
    <div className="px-2 overflow-auto min-w-[280px]">
      <div className="pt-3">
        {chats?.map((item) => (
          <Chat key={item.id} chat={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
