import React, { useEffect, useState } from "react";
import { UI_CONSTS } from "../../constants/ui_consts";
import icons from "../../utils/icons";
import ModalConfirm from "../modals/ModalConfirm";
import { useDispatch } from "react-redux";
import { deleteChat } from "../../redux/reducers/chat_reducer";
import { fetchMessageImagesOfChat as fetchMessageImagesOfChat } from "../../services/message_service";
const { FaRegTrashAlt, IoCloseSharp } = icons;

const ChatMenu = ({ chat, setIsOpenMenu }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);

  const fetchMessages = async () => {
    const [error, result] = await fetchMessageImagesOfChat(chat.id);
    if (error) {
      console.log(error);
    }
    console.log(result);
    setImages(result.data);
    console.log(images);
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  const handleDeleteChat = async () => {
    setIsModalOpen(false);
    try {
      await dispatch(deleteChat(chat.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-1 flex justify-center items-center bg-base-100 box-border">
        <div className="p-3 w-full h-full">
          <div className="p-4 flex flex-col items-center h-full bg-base-300 w-full rounded-2xl relative">
            <img
              className="rounded-full h-15 w-15 object-cover object-center"
              src={chat.chatPartner?.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
            />
            <p className="text-base-content mt-3">{chat.chatPartner?.name}</p>
            {/* <div
              onClick={() => setIsModalOpen(true)}
              className="text-error flex items-center justify-between w-full mt-5 py-2 px-4 rounded-md cursor-pointer hover:bg-base-200"
            >
              <p>Delete this chat</p>
              <FaRegTrashAlt />
            </div> */}
            <div className="flex-1 overflow-auto mt-4">
              <div className="grid grid-cols-3 gap-1">
                {images?.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img
                      src={image}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className="absolute text-[23px] top-5 right-5 text-base-content/50 hover:text-base-content p-1 cursor-pointer rounded-full"
          >
            <IoCloseSharp className="" />
          </div>
        </div>
      </div>

      <ModalConfirm
        message={"Do you want delete this chat?"}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        onConfirm={handleDeleteChat}
      />
    </>
  );
};

export default ChatMenu;
