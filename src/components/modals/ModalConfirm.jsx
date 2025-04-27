import React from "react";

const ModalConfirm = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-300/70 z-50">
      <div className="bg-base-200 rounded-2xl shadow-lg p-6 w-80">
        <h2 className="text-[22px] text-base-content/80 font-semibold mb-4">
          {title}
        </h2>
        <p className="text-base-content/70 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-base-content/50 hover:text-base-content hover:bg-base-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-primary-content rounded hover:bg-primary/80 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
