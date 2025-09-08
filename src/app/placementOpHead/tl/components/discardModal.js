// placementOpHead/tl/components/discardModal.js
"use client";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const DiscardConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Discard Changes?
            </h3>
            <button
              onClick={onClose} // Treat closing 'X' as cancel
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <RiCloseCircleLine size={24} />
            </button>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-500 mb-6">
            You have unsaved changes. Are you sure you want to discard them?
          </p>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose} // Cancel button
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm} // Confirm discard button
              className="px-4 py-2 bg-[#9025a1] text-white rounded-xl hover:bg-[#731d80] focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscardConfirmationModal;
