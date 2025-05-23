import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/reducers/contact_reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [searchContact, setSearchContact] = useState("");

  const onChangeValue = (e) => {
    setSearchContact(e.target.value);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const res = await dispath(addContact(searchContact)).unwrap();
      navigate(-1);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngừng submit khi nhấn Enter trong input
      handleAddContact(e); // Gọi hàm handleAddContact
    }
  };

  return (
    <form className="">
      <input
        type="text"
        className="bg-base-100 w-full px-4 py-2 rounded-2xl"
        placeholder="Type email contact"
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
      />
      <div className="flex justify-end mt-5">
        <button
          className="bg-info/80 px-4 py-2 rounded-2xl cursor-pointer hover:bg-info"
          type="button"
          onClick={handleAddContact}
        >
          <p className="text-base-content">Add</p>
        </button>
      </div>
    </form>
  );
};

export default AddContact;
