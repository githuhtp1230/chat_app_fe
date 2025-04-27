import React from "react";
import { UI_CONSTS } from "../../constants/ui_consts";
import icons from "../../utils/icons";
import { useLocation } from "react-router-dom";
import RenderIf from "../RenderIf";
import PATH from "../../constants/path";
const { HiDotsHorizontal, GoDotFill } = icons;
const ChatPartnerInfo = ({ chatPartner, setIsOpenMenu, isOnline }) => {
  const location = useLocation();

  return (
    <div className="flex bg-base-200 items-center justify-between py-2 px-3">
      <div className="flex justify-center items-center">
        <img
          className="w-10 h-10 object-cover rounded-full object-center "
          src={chatPartner?.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
        />
        <div className="ml-3 text-base-content">
          <div>{chatPartner?.name}</div>
          {isOnline ? (
            <div className="flex gap-2 justify-center items-center">
              <GoDotFill className="text-info" />
              <p className="text-base-content/70 text-[14px]">Online</p>
            </div>
          ) : (
            <p className="text-base-content/40 text-[14px]">Offline</p>
          )}
        </div>
      </div>
      <RenderIf condition={location.pathname.includes(PATH.CHAT)}>
        <div
          className="mr-5 cursor-pointer rounded-2xl hover:bg-base-content/10 p-2"
          onClick={() => setIsOpenMenu(true)}
        >
          <HiDotsHorizontal />
        </div>
      </RenderIf>
    </div>
  );
};

export default ChatPartnerInfo;
