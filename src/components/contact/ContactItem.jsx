import React, { useCallback } from "react";
import { UI_CONSTS } from "../../constants/ui_consts";
import icons from "../../utils/icons";
import { useDispatch } from "react-redux";
import {
  deleteContact,
  setCurrentChat,
  updateCurrentChat,
} from "../../redux/reducers/contact_reducer";
import { toast } from "react-toastify";
const { HiDotsHorizontal, FaRegTrashAlt } = icons;

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleSelectedContact = (e) => {
    e.stopPropagation();
    dispatch(
      setCurrentChat({
        id: contact.conversationId,
        chatPartner: contact.contacted,
      })
    );
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const res = await dispatch(deleteContact(contactId)).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.success(res.message);
    }
  };

  return (
    <div
      onClick={handleSelectedContact}
      className="flex items-center py-3 px-3 mr-3 justify-between rounded-[10px] hover:bg-[#18212B] cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <img
          className="rounded-full h-12 w-12 object-cover object-center"
          src={contact.contacted.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
        />
        <h2 className="text-[17px]">{contact.contacted.name}</h2>
        <div />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="dropdown dropdown-bottom dropdown-end hover:bg-[#6f6f6f33] rounded-2xl"
      >
        <div tabIndex={0} role="button" className="p-1 cursor-pointer">
          <HiDotsHorizontal />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content p-0 menu bg-[#18212B] rounded-box z-1 w-40 shadow-sm mt-2"
        >
          <li onClick={() => handleDeleteContact(contact.contacted.id)}>
            <div className="px-3 py-2 text-red-400 flex gap-2">
              <FaRegTrashAlt />
              <p>Delete</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactItem;
