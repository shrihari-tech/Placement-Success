// placementOpTl/components/PreviewModal.js
'use client';
import React, { useState, useEffect } from 'react';
import {
  RiCloseCircleLine,
  RiEdit2Fill,
  RiDeleteBin6Line,
} from 'react-icons/ri';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin } from 'react-icons/fi';

const PreviewModal = ({
  isOpen,
  onClose,
  data,
  isEditMode = false,
  setIsEditMode,
  onDelete,
  onUpdate,
}) => {
  const [editData, setEditData] = useState({
    ...data,
    password: "", // Optional: include if you want password editing
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  // Reset form when data changes or mode switches
  useEffect(() => {
    setEditData({
      ...data,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowDeleteConfirmModal(false);
  }, [data]);

  // Scroll lock effect (optional, copied from TL modal)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handlers
  const handleChange = (field, value) => {
    if (field === "phone") {
      const val = value.replace(/[^0-9]/g, "");
      setEditData((prev) => ({ ...prev, [field]: val }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "phone":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) error = "Phone is required";
        else if (!phoneRegex.test(value))
          error = "Phone must be exactly 10 digits";
        break;
      case "password":
        if (value && value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== editData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ["name", "email", "phone", "company", "address"];

    if (editData.password || editData.confirmPassword) {
      fieldsToValidate.push("password", "confirmPassword");
    }

    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, editData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      const { confirmPassword, ...dataToSave } = editData;
      if (!dataToSave.password) {
        delete dataToSave.password;
      }
      onUpdate(dataToSave);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(data.id); // Assumes `data` has an `id` field
    setShowDeleteConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
  };

  const clearField = (field) => {
    handleChange(field, "");
  };

  if (!isOpen || !data) return null;

  return (
    <>
      {/* Main Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        {/* Main Modal Container */}
        <div
          className={`bg-white rounded-lg shadow-xl w-full ${
            isEditMode ? 'max-w-2xl' : 'max-w-sm max-h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl text-gray-700 font-bold">
                {isEditMode ? "Edit Details" : "Details"}
              </h2>
              <div className="flex items-center space-x-2">
                {!isEditMode && (
                  <>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="text-gray-500 hover:text-[#a17640] cursor-pointer"
                      aria-label="Edit"
                    >
                      <RiEdit2Fill size={20} />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="text-gray-500 hover:text-[#a17640] cursor-pointer"
                      aria-label="Delete"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Close"
                >
                  <RiCloseCircleLine size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-0 pb-2">
              {isEditMode ? (
                // --- Edit Form ---
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="relative mb-3">
                    <input
                      type="text"
                      id="edit-name"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                      placeholder=" "
                      value={editData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <label
                      htmlFor="edit-name"
                      className={`absolute px-2 text-sm ${
                        errors.name ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    {editData.name && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("name")}
                        aria-label="Clear name"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative mb-3">
                    <input
                      type="email"
                      id="edit-email"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                      placeholder=" "
                      value={editData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <label
                      htmlFor="edit-email"
                      className={`absolute px-2 text-sm ${
                        errors.email ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    {editData.email && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("email")}
                        aria-label="Clear email"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="relative mb-3">
                    <input
                      type="tel"
                      id="edit-phone"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.phone ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                      placeholder=" "
                      value={editData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        handleChange("phone", val);
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="10"
                    />
                    <label
                      htmlFor="edit-phone"
                      className={`absolute px-2 text-sm ${
                        errors.phone ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    {editData.phone && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("phone")}
                        aria-label="Clear phone"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="relative mb-3">
                    <input
                      type="text"
                      id="edit-company"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.company ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                      placeholder=" "
                      value={editData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                    <label
                      htmlFor="edit-company"
                      className={`absolute px-2 text-sm ${
                        errors.company ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Company <span className="text-red-500">*</span>
                    </label>
                    {editData.company && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("company")}
                        aria-label="Clear company"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="relative mb-3 col-span-2">
                    <textarea
                      id="edit-address"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.address ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                      placeholder=" "
                      value={editData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      rows="2"
                    />
                    <label
                      htmlFor="edit-address"
                      className={`absolute px-2 text-sm ${
                        errors.address ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    {editData.address && (
                      <button
                        type="button"
                        className="absolute top-4 right-3 flex items-center"
                        onClick={() => clearField("address")}
                        aria-label="Clear address"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>



                  
                </div>
              ) : (
                // --- Preview Details ---
                <div className="space-y-3">
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#ece3d8] flex items-center justify-center mr-3">
                      <FiUser className="h-5 w-5 text-[#a17640]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-800">{data.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#ece3d8] flex items-center justify-center mr-3">
                      <FiMail className="h-5 w-5 text-[#a17640]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{data.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#ece3d8] flex items-center justify-center mr-3">
                      <FiPhone className="h-5 w-5 text-[#a17640]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">{data.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#ece3d8] flex items-center justify-center mr-3">
                      <FiBriefcase className="h-5 w-5 text-[#a17640]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Company</p>
                      <p className="font-medium text-gray-800">{data.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#ece3d8] flex items-center justify-center mr-3">
                      <FiMapPin className="h-5 w-5 text-[#a17640]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium text-gray-800">{data.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
              >
                {isEditMode ? "Cancel" : "Close"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-3 py-1.5 bg-[#a17640] text-white rounded-md hover:bg-[#906a39] focus:outline-none focus:ring-1 focus:ring-[#906a39] text-sm"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Are you sure you want to delete <strong>{data.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-3 py-1.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-3 py-1.5 bg-[#a17640] text-white rounded-xl hover:bg-[#906a39] focus:outline-none focus:ring-1 focus:bg-[#a17640] text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewModal;