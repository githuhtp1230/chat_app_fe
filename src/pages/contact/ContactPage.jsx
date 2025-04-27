import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  getContacts,
  setCurrentChat,
} from "../../redux/reducers/contact_reducer";
import ContactList from "../../components/contact/ContactList";
import ContactBar from "../../components/contact/ContactBar";
import RenderIf from "../../components/RenderIf";
import ChatDetail from "../../components/chat/ChatDetail";

const ContactPage = () => {
  const dispatch = useDispatch();

  const [filterMode, setFilterMode] = useState(true);
  const [searchContact, setSearchContact] = useState("");

  const chat = useSelector((state) => state.contact.data.chat);
  const contacts = useSelector((state) => state.contact.data.contacts);

  useEffect(() => {
    dispatch(getContacts());

    return () => {
      dispatch(setCurrentChat(null));
    };
  }, []);

  return (
    <>
      <div className="p-3 py-5 flex flex-1">
        <div className="flex-4">
          <ContactBar
            setFilterMode={setFilterMode}
            setSearchContact={setSearchContact}
            filterMode={filterMode}
          />
          {contacts.length > 0 ? (
            <ContactList
              filterMode={filterMode}
              searchContact={searchContact}
            />
          ) : (
            <div className="h-full flex justify-center items-center">
              <h1 className="text-[18px] text-base-content/40 px-4 py-2 bg-base-100 rounded-2xl">
                Add a contact to start messaging
              </h1>
            </div>
          )}
        </div>
        <RenderIf condition={chat != null}>
          <div className="border-1 border-l-gray-950 mr-4"></div>
        </RenderIf>
        <RenderIf condition={chat != null}>
          <ChatDetail chat={chat} />
        </RenderIf>
      </div>

      <Outlet />
    </>
  );
};

export default ContactPage;
