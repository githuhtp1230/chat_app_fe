import React from "react";
import { useSelector } from "react-redux";
import { UI_CONSTS } from "../../constants/ui_consts";

const CurrentProfile = () => {
  const currentProfile = useSelector((state) => state.profile.data);

  const handleChangeImage = () => {};

  return (
    <div className="flex gap-5 items-center">
      <img
        className="rounded-full w-16 h-16 object-cover object-center"
        src={currentProfile.avatar ?? UI_CONSTS.PATH_NO_AVATAR}
        onClick={handleChangeImage}
      />
      <div className="gap-3">
        <h2>{currentProfile.name}</h2>
        <p className="text-gray-400">{currentProfile.email}</p>
      </div>
    </div>
  );
};

export default CurrentProfile;
