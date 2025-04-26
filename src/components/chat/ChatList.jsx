import React, { useEffect } from "react";
import Chat from "./Chat";

const ChatList = ({ chats }) => {
  return (
    <div className="pt-6 px-2 bg-[#18212B] h-full overflow-auto min-w-[280px]">
      <h1 className="text-[20px] font-bold ml-2 text-white">Chats</h1>
      {chats?.length <= 0 ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="w-[70%] text-center">
            No chats here, add a contact to chat
          </h1>
        </div>
      ) : (
        <div className="pt-3">
          {chats?.map((item) => (
            <Chat key={item.id} chat={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
