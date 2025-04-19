import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const currentUserId = useSelector((state) => state.profile.data.id);
  const isMe = currentUserId == message.sender.id;
  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[40%] mt-1 py-1.5 px-3 rounded-3xl ${
          isMe ? "bg-[hsl(217,100%,61%)]" : "bg-[#253444]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
