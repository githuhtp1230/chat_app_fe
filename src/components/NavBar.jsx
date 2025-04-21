import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PATH from "../constants/path";
import icons from "../utils/icons";
import UserAvatar from "./profile/UserAvatar";
import { useSelector } from "react-redux";

const {
  HiMiniChatBubbleOvalLeftEllipsis,
  IoSettingsSharp,
  RiContactsBook2Fill,
} = icons;

const Navbar = () => {
  const location = useLocation();
  const currentProfile = useSelector((state) => state.profile.data);

  return (
    <div className="bg-[#252E3D] flex flex-col items-center p-2">
      {currentProfile ? (
        <Link to={PATH.MODALS.PROFILE} state={{ backgroundLocation: location }}>
          <UserAvatar currentProfile={currentProfile} />
        </Link>
      ) : null}
      <NavLink to={PATH.CHAT}>
        {({ isActive }) => (
          <div
            className={`m-1 py-2 px-3 ${
              isActive ? "rounded-md bg-[#18212B]" : ""
            }`}
          >
            <HiMiniChatBubbleOvalLeftEllipsis
              size={32}
              color={isActive ? "#ffff" : "#708499"}
              className="cursor-pointer"
            />
          </div>
        )}
      </NavLink>
      <NavLink to={PATH.SETTING}>
        {({ isActive }) => (
          <div
            className={`m-1 py-2 px-3 ${
              isActive ? "rounded-md bg-[#18212B]" : ""
            }`}
          >
            <IoSettingsSharp
              size={32}
              color={isActive ? "#ffff" : "#708499"}
              className="cursor-pointer"
            />
          </div>
        )}
      </NavLink>
      <NavLink to={PATH.CONTACTS}>
        {({ isActive }) => (
          <div
            className={`m-1 py-2 px-3 ${
              isActive ? "rounded-md bg-[#18212B]" : ""
            }`}
          >
            <RiContactsBook2Fill
              size={32}
              color={isActive ? "#ffff" : "#708499"}
              className="cursor-pointer"
            />
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default Navbar;
