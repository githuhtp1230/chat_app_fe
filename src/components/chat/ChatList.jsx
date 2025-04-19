import React, { useEffect } from "react";
import Chat from "./Chat";

const ChatList = ({ chats }) => {
  return (
    <div className="pt-6 px-2 bg-[#18212B] h-full overflow-auto">
      <h1 className="text-[20px] font-bold ml-2">Chats</h1>
      <div className="pt-3">
        {chats?.map((item) => (
          <Chat key={item.id} chat={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
