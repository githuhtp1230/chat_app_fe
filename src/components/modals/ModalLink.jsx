import React from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
const { IoCloseSharp } = icons;

const ModalLink = ({ children, title, beforeRoute }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (beforeRoute) {
      navigate(beforeRoute);
      return;
    }
    navigate(-1);
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/70"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-base-200 p-6 rounded-2xl shadow-lg w-[500px]"
        onClick={stopPropagation}
      >
        <div className="flex justify-between">
          <h2 className="text-[22px] text-base-content/80 font-semibold">
            {title || "None Title"}
          </h2>
          <button type="button">
            <IoCloseSharp
              size={30}
              className="cursor-pointer text-base-content/50 hover:text-base-content"
              onClick={handleClose}
            />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalLink;
