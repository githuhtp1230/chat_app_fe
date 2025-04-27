import React from "react";
import RenderIf from "../RenderIf";

const MessageImage = ({ src, isMe, isSending, isLastMessage }) => {
  return (
    <div
      className={`w-full pt-1 flex-col flex ${
        isMe ? "items-end" : "items-start"
      }`}
    >
      <div className="max-w-[20%] ">
        <img src={src} className="rounded-[12px]" />
      </div>
      <RenderIf condition={isSending && isMe}>
        <p className="text-[14px] text-base-content/50">
          <span>Sending</span>
        </p>
      </RenderIf>
      <RenderIf condition={!isSending && isLastMessage && isMe}>
        <p className="text-[14px] text-base-content/50">
          <span>Sent</span>
        </p>
      </RenderIf>
    </div>
  );
};

export default MessageImage;
