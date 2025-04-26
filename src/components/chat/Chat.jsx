import React from "react";
import { Link, NavLink } from "react-router-dom";
import PATH from "../../constants/path";
import RenderIf from "../RenderIf";
import icons from "../../utils/icons";
import { MESSAGE_CONSTS, UI_CONSTS } from "../../constants/ui_consts";
const { AiFillLike } = icons;

const Chat = ({ chat }) => {
  const isLike = chat?.lastMessage?.startsWith(MESSAGE_CONSTS.PREFIX_LIKE);
  const isImg = chat?.lastMessage?.startsWith(MESSAGE_CONSTS.PREFIX_IMG);
  return (
    <NavLink to={`${PATH.CHAT}/${chat.id}`}>
      <div className="flex items-center py-1.5 px-2 w-full justify-between hover:bg-base-content/10 cursor-pointer rounded-[8px]">
        <div className="flex justify-center items-center">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src={chat?.chatPartner.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
          />
          <div className="py-1 px-3">
            <h1 className="font-semibold text-[16px] text-base-content">
              {chat?.chatPartner.name}
            </h1>
            <div className="text-[15px] flex items-center h-4 truncate max-w-[160px]">
              <RenderIf condition={!isLike && !isImg}>
                <p className="truncate text-base-content/50">
                  {chat?.lastMessage}
                </p>
              </RenderIf>
              <RenderIf condition={isLike}>
                <AiFillLike className="text-info/80" />
              </RenderIf>
              <RenderIf condition={isImg}>
                <p className="text-base-content/50">Photo</p>
              </RenderIf>
            </div>
          </div>
        </div>
        <p className="text-[13px] text-base-content/50">
          {chat?.lastMessageTime}
        </p>
      </div>
    </NavLink>
  );
};

export default Chat;
