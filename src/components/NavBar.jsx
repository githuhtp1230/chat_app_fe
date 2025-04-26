import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PATH from "../constants/path";
import icons from "../utils/icons";
import UserAvatar from "./profile/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth_reducer";
import RenderIf from "./RenderIf";

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
    <div className="bg-base-100 flex flex-col justify-between items-center p-2">
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
                isActive ? "rounded-md bg-base-300" : ""
              }`}
            >
              <HiMiniChatBubbleOvalLeftEllipsis
                size={32}
                // color={isActive ? "#b" : "#708499"}
                className={`cursor-pointer ${
                  isActive ? "text-base-content" : "text-base-content/50"
                }`}
              />
            </div>
          )}
        </NavLink>
        <NavLink to={PATH.CONTACTS}>
          {({ isActive }) => (
            <div
              className={`m-1 py-2 px-3 ${
                isActive ? "rounded-md bg-base-300" : ""
              }`}
            >
              <RiContactsBook2Fill
                size={32}
                // color={isActive ? "#b" : "#708499"}
                className={`cursor-pointer ${
                  isActive ? "text-base-content" : "text-base-content/50"
                }`}
              />
            </div>
          )}
        </NavLink>
        <NavLink to={PATH.SETTING}>
          {({ isActive }) => (
            <div
              className={`m-1 py-2 px-3 ${
                isActive ? "rounded-md bg-base-300" : ""
              }`}
            >
              <IoSettingsSharp
                size={32}
                className={`cursor-pointer ${
                  isActive ? "text-base-content" : "text-base-content/50"
                }`}
              />
            </div>
          )}
        </NavLink>
      </div>
      <RenderIf condition={currentProfile}>
        <div className="m-1 py-2 px-3 ">
          <MdLogout
            size={32}
            className="text-base-content/50 cursor-pointer hover:text-base-content"
            onClick={handleLogout}
          />
        </div>
      </RenderIf>
    </div>
  );
};

export default Navbar;
