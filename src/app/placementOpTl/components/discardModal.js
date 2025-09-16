// placementOpTl/components/DiscardModal.js
'use client';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const DiscardModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Discard Changes?</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <RiCloseCircleLine size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            You have unsaved changes. Are you sure you want to discard them?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-[#ece3d8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#ffebb3]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscardModal;