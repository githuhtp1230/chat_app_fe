import React, { useEffect, useRef, useState } from "react";
import icons from "../../utils/icons";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/reducers/contact_reducer";
import { Link, NavLink, useLocation } from "react-router-dom";
import PATH from "../../constants/path";
const { MdFilterAlt, IoMdPersonAdd } = icons;
const ContactBar = ({ setFilterMode, setSearchContact, filterMode }) => {
  const location = useLocation();
  const buttonRef = useRef(null);

  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const onChangeSearch = (e) => {
    setSearchContact(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="px-5 flex justify-center items-center gap-6">
        <label
          htmlFor="searchInput"
          className="h-[40px] flex justify-center gap-2 items-center w-full px-3 bg-[#18212B] rounded-2xl flex-3"
        >
          <svg
            className="h-[1em] opacity-50 flex justify-center items-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            id="searchInput"
            type="search"
            className="grow outline-none border-none"
            placeholder="Search"
            onChange={onChangeSearch}
          />
        </label>

        <button
          ref={buttonRef}
          className="btn flex flex-1 bg-[#18212B]"
          popoverTarget="popover-1"
          style={{ anchorName: "--anchor-1" }}
        >
          <MdFilterAlt />
          {filterMode ? <p>Sort names by A - Z</p> : <p>Sort names by Z - A</p>}
        </button>
        <Link
          to={PATH.MODALS.ADD_CONTACT}
          state={{ backgroundLocation: location }}
        >
          <div className="p-2 hover:bg-[#6f6f6f33] cursor-pointer">
            <IoMdPersonAdd />
          </div>
        </Link>
      </div>

      <ul
        className="dropdown p-0 menu rounded-[5px] bg-[#18212B] shadow-sm mt-2"
        popover="auto"
        id="popover-1"
        style={{
          positionAnchor: "--anchor-1",
          width: `${dropdownWidth}px`,
        }}
      >
        <li>
          <div className="p-3" onClick={() => setFilterMode(true)}>
            Sort names by A - Z
          </div>
        </li>
        <li>
          <div className="p-3" onClick={() => setFilterMode(false)}>
            Sort names by Z - A
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactBar;
