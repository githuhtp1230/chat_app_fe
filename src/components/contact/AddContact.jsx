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
        className="bg-[#212e3e] w-full px-4 py-2 rounded-2xl"
        placeholder="Type email contact"
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
      />
      <div className="flex justify-end mt-5">
        <button
          className="bg-[#0066a9] px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#3092ca]"
          type="button"
          onClick={handleAddContact}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddContact;
