import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const ContactList = ({ filterMode, searchContact }) => {
  const contacts = useSelector((state) => state.contact.data.contacts);

  const filterAndSortedContacts = useMemo(() => {
    let filterContacts = [...contacts];
    if (searchContact) {
      filterContacts = filterContacts.filter((contact) =>
        contact.contacted.name
          .toLowerCase()
          .includes(searchContact.trim().toLowerCase())
      );
    }
    const sorted = [...filterContacts].sort((a, b) =>
      a.contacted.name.localeCompare(b.contacted.name)
    );

    return filterMode ? sorted : sorted.reverse();
  }, [filterMode, searchContact, contacts]);

  return (
    <div className="mt-5">
      {filterAndSortedContacts?.map((item) => {
        return <ContactItem key={item.contacted.id} contact={item} />;
      })}
    </div>
  );
};

export default ContactList;
