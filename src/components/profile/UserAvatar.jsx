import React from "react";
import CONSTS from "../../constants/consts";

const UserAvatar = ({ currentProfile }) => {
  return (
    <div>
      <img
        src={currentProfile?.avatar ?? CONSTS.PATH_NO_AVATAR}
        className="w-[50px] h-[50px] rounded-full object-cover object-center mt-2 mb-4 border"
      />
    </div>
  );
};

export default UserAvatar;
