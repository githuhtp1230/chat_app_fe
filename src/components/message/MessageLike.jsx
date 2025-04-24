import React from "react";
import icons from "../../utils/icons";
import RenderIf from "../RenderIf";
const { AiFillLike } = icons;

const MessageLike = ({ isMe, isSending, isLastMessage }) => {
  return (
    <>
      <div
        className={`flex py-0.5 ${
          isMe ? "justify-end" : "justify-start"
        } items-center rounded-lg`}
      >
        <AiFillLike size={35} className="text-[hsl(217,100%,61%)]" />
      </div>
      <RenderIf condition={isSending && isMe}>
        <p className="flex justify-end text-[14px] text-gray-400">
          <span>Sending</span>
        </p>
      </RenderIf>
      <RenderIf condition={!isSending && isLastMessage && isMe}>
        <p className="flex justify-end text-[14px] text-gray-400">
          <span>Sent</span>
        </p>
      </RenderIf>
    </>
  );
};

export default MessageLike;
