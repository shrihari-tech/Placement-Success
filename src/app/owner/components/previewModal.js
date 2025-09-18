// src/app/heads/components/previewModal.js
"use client";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { FaChartLine, FaMedal } from "react-icons/fa";

export default function PreviewModal({
  isOpen,
  onClose,
  data,
  isEditMode = false,
  setIsEditMode,
  onUpdate,
  onDelete,
}) {
  if (!isOpen || !data) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header — no border */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-bold text-gray-800">Student Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close"
          >
            <RiCloseCircleLine size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content — no border */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#ebeecf] flex items-center justify-center mr-3">
              <FiUser className="h-5 w-5 text-[#6d790b]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{data.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#ebeecf] flex items-center justify-center mr-3">
              <FiMail className="h-5 w-5 text-[#6d790b]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{data.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#ebeecf] flex items-center justify-center mr-3">
              <FiPhone className="h-5 w-5 text-[#6d790b]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{data.phone}</p>
            </div>
          </div>

          {/* Attendance */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#ebeecf] flex items-center justify-center mr-3">
              <FaChartLine className="h-5 w-5 text-[#6d790b]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Attendance</p>
              <p className="font-medium text-gray-800">{data.attendance}%</p>
            </div>
          </div>

          {/* Epic Status */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#ebeecf] flex items-center justify-center mr-3">
              <FaMedal className="h-5 w-5 text-[#6d790b]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Epic Status</p>
              <p className="font-medium text-gray-800">{data.epicStatus}</p>
            </div>
          </div>
        </div>

        {/* Footer — no top border */}
        <div className="flex justify-end space-x-3 p-6">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#6d790b] rounded hover:bg-[#4e5708] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
