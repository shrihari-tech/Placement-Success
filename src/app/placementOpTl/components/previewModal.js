// placementOpTl/components/PreviewModal.js
'use client';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin } from 'react-icons/fi';

const PreviewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Details</h2>
            <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-700">
              <RiCloseCircleLine size={24} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
                <FiUser className="h-5 w-5 text-[#e6a901]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">{data.name}</p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
                <FiMail className="h-5 w-5 text-[#e6a901]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
                <FiPhone className="h-5 w-5 text-[#e6a901]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
                <FiBriefcase className="h-5 w-5 text-[#e6a901]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Company</p>
                <p className="font-medium">{data.company}</p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
                <FiMapPin className="h-5 w-5 text-[#e6a901]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="font-medium">{data.address}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 bg-[#e6a901] text-white rounded-md hover:bg-[#cc9601]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;