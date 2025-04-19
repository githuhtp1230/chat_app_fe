import React from "react";
import { Link, NavLink } from "react-router-dom";
import PATH from "../../constants/path";
import CONSTS from "../../constants/consts";

const Chat = ({ chat, onClick }) => {
  return (
    <NavLink to={`${PATH.CHAT}/${chat.id}`}>
      <div className="flex items-center py-1.5 px-2 min-w-[280px] justify-between hover:bg-[#252E3D] cursor-pointer rounded-[8px]">
        <div className="flex">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src={chat?.chatPartner.avatar ?? CONSTS.PATH_NO_AVATAR}
          />
          <div className="py-1 px-3">
            <h1 className="font-semibold text-[16px]">
              {chat?.chatPartner.name}
            </h1>
            <p className="text-[15px] text-[#949494]">{chat?.lastMessage}</p>
          </div>
        </div>
        <p className="text-[13px] text-gray-400">{chat?.lastMessageTime}</p>
      </div>
    </NavLink>
  );
};

export default Chat;
