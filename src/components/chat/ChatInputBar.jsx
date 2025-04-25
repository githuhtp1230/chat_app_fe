import React, { useEffect, useRef, useState } from "react";
import icons from "../../utils/icons";
import socketUtil from "../../utils/socket_util";
import { useDispatch, useSelector } from "react-redux";
import RenderIf from "../RenderIf";
import { uploadFile, uploadFiles } from "../../services/upload_service";
import { MESSAGE_CONSTS, UI_CONSTS } from "../../constants/ui_consts";
import { createChat } from "../../redux/reducers/chat_reducer";
import {
  setCurrentChat,
  updateCurrentChat,
} from "../../redux/reducers/contact_reducer";
import SOCKET_CONSTS from "../../constants/socket_consts";
const { IoMdAddCircle, IoSend, AiFillLike, FaImage, IoCloseSharp } = icons;

const ChatInputBar = ({ chatId, onSendMessage }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const filesRef = useRef(null);
  const inputRef = useRef(null);

  const currentUserId = useSelector((state) => state.profile.data.id);
  const chatContact = useSelector((state) => state.contact.data.chat);

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
    if (!chatId) return;
    socketUtil.sendMessage(chatId, currentUserId, "<is_sending>", true);
  };

  const handleSendMessage = async () => {
    const cloneChatContact = { ...chatContact };
    if (!chatId) {
      try {
        var res = await dispatch(
          createChat(cloneChatContact.chatPartner.id)
        ).unwrap();
        setTimeout(() => {
          dispatch(
            updateCurrentChat({
              id: res.data.id,
              chatPartner: cloneChatContact.chatPartner,
            })
          );
        }, 100);
        cloneChatContact.id = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
    if (images.length > 0 && filesRef.current) {
      for (const image of images) {
        onSendMessage(`${MESSAGE_CONSTS.PREFIX_IMG}${image}`);
      }
      if (message.trim().length > 0) {
        onSendMessage(message);
      }
      setImages([]);
      setMessage("");

      for (let i = 0; i < filesRef.current.length; i++) {
        const file = filesRef.current[i];

        const res = await uploadFile(file);

        socketUtil.sendMessage(
          chatId ?? cloneChatContact.id,
          currentUserId,
          `${MESSAGE_CONSTS.PREFIX_IMG}${res.data}`
        );
      }
      filesRef.current = null;
      inputRef.current.value = null;
      if (message.trim().length <= 0) {
        return;
      }
      setTimeout(() => {
        socketUtil.sendMessage(
          chatId ?? cloneChatContact.id,
          currentUserId,
          message
        );
      }, 100);
      return;
    }

    if (message.trim().length > 0) {
      onSendMessage(message);
      socketUtil.sendMessage(
        chatId ?? cloneChatContact.id,
        currentUserId,
        message
      );
      setMessage("");
    }
    inputRef.current.value = null;
  };

  const handleSendLike = () => {
    socketUtil.sendMessage(chatId, currentUserId, MESSAGE_CONSTS.PREFIX_LIKE);
    onSendMessage(MESSAGE_CONSTS.PREFIX_LIKE);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleSendMessage();
  };

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    filesRef.current = files;
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
    if (filesRef.current) {
      const newFiles = Array.from(filesRef.current);
      newFiles.splice(index, 1);
      filesRef.current = newFiles;
    }
  };

  const IconComponent =
    message.length > 0 || images.length > 0 ? IoSend : AiFillLike;
  const handleClick =
    message.length > 0 || images.length > 0
      ? handleSendMessage
      : handleSendLike;

  return (
    <>
      <div className="flex p-3 items-center">
        <div className="dropdown dropdown-top">
          <div tabIndex={0} role="button" className="m-1">
            <IoMdAddCircle size={23} className="cursor-pointer" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content p-1 menu bg-[#202A36] rounded-box z-1 min-w-40 shadow-sm mb-3"
          >
            <li>
              <label>
                <div className="flex justify-center items-center gap-2">
                  <FaImage />
                  Hình ảnh
                </div>
                <input
                  multiple
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={inputRef}
                />
              </label>
            </li>
          </ul>
        </div>
        <form className="flex flex-1 ml-3">
          <input
            className="bg-[#18212B] flex-1 rounded-3xl p-3 pl-5"
            type="text"
            placeholder="Type a message..."
            onChange={onChangeMessage}
            onKeyDown={handleKeyDown}
            value={message}
          ></input>
          <button
            className="ml-2 p-3 cursor-pointer active:scale-120 transform transition duration-75 ease-in-out hover:text-[#6bd6fd]"
            onClick={handleClick}
            type="button"
          >
            <IconComponent size={23} />
          </button>
        </form>
      </div>
      <RenderIf condition={images.length > 0}>
        <div className="flex flex-wrap overflow-y-scroll gap-3 px-3 h-35">
          {images.map((image, index) => (
            <div key={index} className="max-w-40 h-full relative">
              <img
                src={image}
                alt={`Selected ${index}`}
                className="w-full h-full object-center object-cover rounded"
              />
              <div
                onClick={() => handleRemoveImage(index)}
                className="p-0.5 bg-[#ececec] absolute top-2 right-2 rounded-full cursor-pointer"
              >
                <IoCloseSharp className="text-[#000]" />
              </div>
            </div>
          ))}
        </div>
      </RenderIf>
    </>
  );
};

export default ChatInputBar;
