import React from "react";
import Message from "./Message";
import { parseISO, differenceInMinutes } from "date-fns";

const MessageList = ({ messages }) => {
  const isOver30Minutes = (prevMessageTime, curMessageTime) => {
    if (!prevMessageTime) {
      return true;
    }
    const prevMessageISO = parseISO(prevMessageTime);
    const curMessageISO = parseISO(curMessageTime);
    if (Math.abs(differenceInMinutes(prevMessageISO, curMessageISO)) >= 30) {
      return true;
    }
  };

  return (
    <div className="flex-1 py-5 px-4 overflow-scroll">
      {messages?.map((item, index) => (
        <Message
          isOver30Minutes={isOver30Minutes(
            messages[index - 1]?.messageTimeDetail,
            item.messageTimeDetail
          )}
          key={item.id}
          message={item}
        />
      ))}
    </div>
  );
};

export default MessageList;
