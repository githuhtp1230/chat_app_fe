import React from "react";
import { UI_CONSTS } from "../../constants/ui_consts";
const ChatPartnerInfo = ({ chatPartner }) => {
  return (
    <div className="flex bg-[#18212B] items-center py-1 px-3">
      <img
        className="w-10 h-10 object-cover rounded-full object-center "
        src={chatPartner?.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
      />
      <div className="p-3">
        <div>{chatPartner?.name}</div>
      </div>
    </div>
  );
};

export default ChatPartnerInfo;
