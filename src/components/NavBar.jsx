import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PATH from "../constants/path";
import icons from "../utils/icons";
import UserAvatar from "./profile/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth_reducer";

const {
  HiMiniChatBubbleOvalLeftEllipsis,
  IoSettingsSharp,
  RiContactsBook2Fill,
  MdLogout,
} = icons;

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profile.data);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-[#252E3D] flex flex-col justify-between items-center p-2">
      <div className="flex flex-col items-center">
        {currentProfile ? (
          <Link
            to={PATH.MODALS.PROFILE}
            state={{ backgroundLocation: location }}
          >
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
      </div>
      <div className="m-1 py-2 px-3">
        <MdLogout
          size={32}
          className="text-[#708499] hover:text-[#ffff] cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
