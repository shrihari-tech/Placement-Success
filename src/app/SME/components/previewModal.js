// src/app/SME/components/previewModal.js
"use client";
import React, { useState, useEffect } from "react";
import {
  RiCloseCircleLine,
  // RiEdit2Fill, // Removed
  // RiDeleteBin6Line, // Removed
} from "react-icons/ri";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiTag,
  FiBookOpen,
} from "react-icons/fi";

const PreviewModal = ({
  isOpen,
  onClose,
  data,
  // isEditMode = false, // Removed
  // setIsEditMode, // Removed
  // onDelete, // Removed
  // onUpdate, // Removed
}) => {
  // All state and effects are kept intact for consistency, even if unused
  const [editData, setEditData] = useState({
    ...data,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const { confirmPassword, ...originalDataWithoutPwd } = {
      ...data,
      password: "",
    };

    const changed =
      Object.keys(originalDataWithoutPwd).some(
        (key) => editData[key] !== originalDataWithoutPwd[key]
      ) ||
      editData.password !== "" ||
      editData.confirmPassword !== "";

    setIsChanged(changed);
  }, [editData, data]);

  useEffect(() => {
    setEditData({
      ...data,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowDeleteConfirmModal(false);
  }, [data]);

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

  // All handlers kept for reference, though not used
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
    const fieldsToValidate = ["name", "email", "phone", "company"];

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
      // onUpdate(dataToSave); // Would be called if onUpdate existed
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    // onDelete(data.id); // Would be called if onDelete existed
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
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[120vh]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            {/* Header — Only Close Button */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl text-gray-700 font-bold">Details</h2>
              <div className="flex items-center space-x-2">
                {/* ❌ Edit & Delete buttons removed */}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Close"
                >
                  <RiCloseCircleLine size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-0 pb-2">
              {/* ❌ Removed isEditMode condition — always show preview */}
              <div className="space-y-1">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiUser className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">{data.name}</p>
                  </div>
                </div>

                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiMail className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{data.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiPhone className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">{data.phone}</p>
                  </div>
                </div>

                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiBriefcase className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Company</p>
                    <p className="font-medium text-gray-800">{data.company}</p>
                  </div>
                </div>

                {/* Designation */}
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiBriefcase className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Designation</p>
                    <p className="font-medium text-gray-800">
                      {data.designation || "-"}
                    </p>
                  </div>
                </div>

                {/* Package */}
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiTag className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Package</p>
                    <p className="font-medium text-gray-800">
                      {data.salary || "-"}
                    </p>
                  </div>
                </div>

                {/* Batch */}
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiBookOpen className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Batch</p>
                    <p className="font-medium text-gray-800">
                      {data.batch || "-"}
                    </p>
                  </div>
                </div>

                {/* Placed Month */}
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f3edf7] flex items-center justify-center mr-3">
                    <FiCalendar className="h-5 w-5 text-[#6750a4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Placed Month</p>
                    <p className="font-medium text-gray-800">
                      {data.placedMonth || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3  border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className=" cursor-pointer px-3 py-1.5 border bg-[#6750a4] border-[#6750a4] rounded-md text-white hover:bg-[#6650a4d1] focus:outline-none focus:ring-1 focus:ring-[#6750a4] text-sm"
              >
                Close
              </button>
              {/* ❌ Removed Save Changes button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewModal;
