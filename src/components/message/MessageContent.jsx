import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import RenderIf from "../RenderIf";
import icons from "../../utils/icons";
const { IoCloseSharp } = icons;

const MessageContent = ({
  message,
  isClosePrevMessage,
  isCloseNextMessage,
  distanceFromPrevMessage,
  isOver30Minutes,
  isPrevMessageIsMine,
  isNextMessageIsMine,
  isMe,
  isSending,
  isLastMessage,
}) => {
  const dispath = useDispatch();

  const handleDelete = () => {
    dispath();
  };

  return (
    <>
      <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
        <div
          className={clsx(
            "max-w-[40%] mt-0.5 py-1.5 px-3 rounded-tl-2xl flex justify-center items-center gap-3 rounded-bl-2xl",
            isMe && isClosePrevMessage && isPrevMessageIsMine
              ? "rounded-tr-sm"
              : "rounded-tr-2xl",
            isMe && isCloseNextMessage && isNextMessageIsMine
              ? "rounded-br-sm"
              : "rounded-br-2xl",
            !isMe && isClosePrevMessage && !isPrevMessageIsMine
              ? "rounded-tl-sm"
              : "rounded-tr-2xl",
            !isMe && isCloseNextMessage && !isNextMessageIsMine
              ? "rounded-bl-sm"
              : "rounded-br-2xl",
            isMe ? "bg-info text-base-content" : "bg-base-100 text-white"
          )}
          style={
            !isClosePrevMessage && !isOver30Minutes
              ? { marginTop: `${distanceFromPrevMessage / 2}px` }
              : { marginTop: `2px` }
          }
        >
          {message.content}
          <IoCloseSharp onClick={handleDelete} />
        </div>
      </div>
      <RenderIf condition={isSending && isMe}>
        <p className="flex justify-end text-[14px] text-base-content/50">
          <span>Sending</span>
        </p>
      </RenderIf>
      <RenderIf condition={!isSending && isLastMessage && isMe}>
        <p className="flex justify-end text-[14px] text-base-content/50">
          <span>Sent</span>
        </p>
      </RenderIf>
    </>
  );
};

export default MessageContent;
