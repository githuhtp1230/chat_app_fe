import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import socketUtil from "../../utils/socket_util";
import { useSelector } from "react-redux";
const { IoMdAddCircle, IoSend } = icons;

const SendMessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");

  const currentUserId = useSelector((state) => state.profile.data.id);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    socketUtil.sendMessage(chatId, currentUserId, message);
  };

  return (
    <div className="flex p-3 items-center">
      <IoMdAddCircle size={23} className="cursor-pointer" />
      <form className="flex flex-1 ml-3">
        <input
          className="bg-[#18212B] flex-1 rounded-3xl p-3 pl-5"
          type="text"
          placeholder="Type a message..."
          onChange={onChangeMessage}
        ></input>
        <button
          className="ml-2 p-3 cursor-pointer active:scale-120 transform transition duration-75 ease-in-out hover:text-[#6bd6fd]"
          onClick={handleSendMessage}
          type="button"
        >
          <IoSend size={23} className="" />
        </button>
      </form>
    </div>
  );
};

export default SendMessageInput;
