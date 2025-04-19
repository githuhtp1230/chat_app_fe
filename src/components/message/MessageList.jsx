import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 py-5 px-4 overflow-scroll">
      {messages?.map((item) => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  );
};

export default MessageList;
