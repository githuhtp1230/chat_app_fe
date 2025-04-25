import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const ContactList = ({ filterMode, searchContact }) => {
  const contacts = useSelector((state) => state.contact.data.contacts);

  const filterAndSortedContacts = useMemo(() => {
    let filterContacts = [...contacts];
    if (searchContact) {
      filterContacts = filterContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchContact.trim().toLowerCase())
      );
    }
    const sorted = [...filterContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return filterMode ? sorted : sorted.reverse();
  }, [filterMode, searchContact, contacts]);

  return (
    <div>
      {filterAndSortedContacts?.map((item) => {
        return <ContactItem key={item.id} contact={item} />;
      })}
    </div>
  );
};

export default ContactList;
