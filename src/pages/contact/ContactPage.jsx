import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getContacts } from "../../redux/reducers/contact_reducer";
import ContactList from "../../components/contact/ContactList";
import ContactBar from "../../components/contact/ContactBar";

const ContactPage = () => {
  const dispatch = useDispatch();

  const [filterMode, setFilterMode] = useState(true);
  const [searchContact, setSearchContact] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = useSelector((state) => state.contact.data.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div className="p-3 py-5 w-full">
      <ContactBar
        setFilterMode={setFilterMode}
        setSearchContact={setSearchContact}
        filterMode={filterMode}
      />
      {contacts.length > 0 ? (
        <ContactList filterMode={filterMode} searchContact={searchContact} />
      ) : (
        <div className="h-full flex justify-center items-center">
          <h1 className="text-[18px] text-gray-400 px-4 py-2 bg-[#1a212a] rounded-2xl">
            Add a contact to start messaging
          </h1>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
