import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ModalLink() {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Quay lại trang trước
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50">
      <div
        ref={contentRef}
        className="absolute min-w-[450px] max-w-[600px] bg-white rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="text-lg font-semibold">Profile</span>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <div>Hello</div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
}

export default ModalLink;
