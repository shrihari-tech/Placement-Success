// placementOpHead/tl/components/saveModal.js
"use client";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const SaveConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  tlName = "Team Leader",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Confirm Save</h2>
          <button
            onClick={onClose} // Treat closing 'X' as cancel
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <RiCloseCircleLine size={20} />
          </button>
        </div>

        {/* Message */}
        <p className="mb-4 text-gray-700 text-sm">
          Are you sure you want to create Team Leader <strong>{tlName}</strong>?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose} // Cancel button
            className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#d9d2eb]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Confirm save button
            className="cursor-pointer bg-[#cd5e77] hover:bg-[#b9556b] text-white px-4 py-2.5 rounded-xl text-sm font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmationModal;
