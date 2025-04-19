import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-[300px]">
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <p>This is the profile modal content.</p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
