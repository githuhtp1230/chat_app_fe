import React from "react";
import { UI_CONSTS } from "../../constants/ui_consts";
const ChatPartnerInfo = ({ chatPartner }) => {
  return (
    <div className="flex bg-base-200 items-center py-1 px-3">
      <img
        className="w-10 h-10 object-cover rounded-full object-center "
        src={chatPartner?.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
      />
      <div className="p-3 text-base-content">
        <div>{chatPartner?.name}</div>
      </div>
    </div>
  );
};

export default ChatPartnerInfo;
