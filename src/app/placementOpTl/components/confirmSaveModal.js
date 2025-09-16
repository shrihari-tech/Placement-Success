// placementOpTl/components/ConfirmSaveModal.js
'use client';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const ConfirmSaveModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Confirm Save</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <RiCloseCircleLine size={20} />
          </button>
        </div>
        <p className="mb-4 text-gray-700 text-sm">
          Are you sure you want to add <strong>{name}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer bg-[#ece3d8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#ffebb3]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-2.5 rounded-xl text-sm font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSaveModal;