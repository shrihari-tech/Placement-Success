// placementOpHead/tl/components/tlPreviewModal.js
"use client";
import React, { useState, useEffect } from "react";
import {
  RiCloseCircleLine,
  RiEdit2Fill,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiLock } from "react-icons/fi";

const TLPreviewModal = ({
  isOpen,
  onClose,
  teamLeader,
  isEditMode,
  setIsEditMode,
  onDelete,
  onUpdate,
}) => {
  const [editData, setEditData] = useState({
    ...teamLeader,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // --- State for Delete Confirmation Modal ---
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  // --- Effects ---

  useEffect(() => {
    // Reset password fields when switching TLs or modes
    setEditData({
      ...teamLeader,
      password: "", // Reset to empty for editing
      confirmPassword: "", // Reset to empty for editing
    });
    setErrors({});
    setShowDeleteConfirmModal(false);
  }, [teamLeader]);

  // Effect to handle scroll lock when the modal is open
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

  // --- Handlers ---

  // Handle input changes in the edit form
  const handleChange = (field, value) => {
    // Specific handling for phone to ensure only digits
    if (field === "phone") {
      const val = value.replace(/[^0-9]/g, "");
      setEditData((prev) => ({ ...prev, [field]: val }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error for the field being edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate a single field
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
      // Password validation (only if editing and fields are touched)
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

  // Validate the entire form before saving
  const validateForm = () => {
    const newErrors = {};
    // Validate all basic fields
    const fieldsToValidate = ["name", "email", "phone"];
    // Only validate password fields if the user has entered something
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

  // Handle the "Save Changes" button click
  const handleSaveChanges = () => {
    if (validateForm()) {
      // Prepare data to send back, excluding confirmPassword
      const { confirmPassword, ...dataToSave } = editData;
      // Only include password in the update if it was actually entered/changed
      if (!dataToSave.password) {
        delete dataToSave.password; // Don't send empty password
      }
      // Call the onUpdate function passed from the parent component
      onUpdate(dataToSave);
    }
  };

  // Handle the delete icon click (shows confirmation modal)
  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true);
  };

  // Handle the confirm delete button click in the confirmation modal
  const handleConfirmDelete = () => {
    // Call the onDelete function passed from the parent component, passing the TL ID
    onDelete(teamLeader.id);
    setShowDeleteConfirmModal(false); // Close the delete confirmation modal
    // The parent component should handle closing the main preview modal
  };

  // Handle the cancel delete button click in the confirmation modal
  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
  };

  // Handle clearing individual fields in the edit form
  const clearField = (field) => {
    handleChange(field, "");
  };

  // --- Rendering ---

  // Don't render anything if the modal is not open or no teamLeader data is provided
  if (!isOpen || !teamLeader) return null;

  return (
    <>
      {/* Main Preview/Edit Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose} // Clicking the backdrop closes the main modal
      >
        {/* Main Modal Container */}
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh]"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          {/* Modal Content Container - Reduced padding */}
          <div className="p-4 flex flex-col h-full max-h-[90vh]">
            {/* Header - Reduced bottom margin */}
            <div className="flex justify-between items-center mb-2">
              {/* Modal Title */}
              <h2 className="text-xl text-gray-700 font-bold">
                {isEditMode ? "Edit Team Leader" : "Team Leader Details"}
              </h2>
              {/* Action Icons (Edit, Delete, Close) */}
              <div className="flex items-center space-x-2">
                {/* Show Edit and Delete icons only in Preview mode */}
                {!isEditMode ? (
                  <>
                    {/* Edit Icon */}
                    <button
                      onClick={() => setIsEditMode(true)} // Switch to edit mode
                      className="text-gray-500 hover:text-[#cd5e77] cursor-pointer"
                      aria-label="Edit"
                    >
                      <RiEdit2Fill size={20} />
                    </button>
                    {/* Delete Icon */}
                    <button
                      onClick={handleDeleteClick} // Show delete confirmation
                      className="text-gray-500 hover:text-[#cd5e77] cursor-pointer"
                      aria-label="Delete"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </>
                ) : null}
                {/* Close Icon (always present) */}
                <button
                  onClick={onClose} // Close the main modal
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Close"
                >
                  <RiCloseCircleLine size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area - Adjusted padding */}
            <div className="flex-1 overflow-y-auto px-0 pb-2">
              {" "}
              {/* Reduced px and pb */}
              {/* Conditional Rendering: Edit Form or Preview Details */}
              {isEditMode ? (
                // --- Edit Form (when isEditMode is true) ---
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {" "}
                  {/* Reduced gap */}
                  {/* Name Input */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="text"
                      id="edit-name"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`} /* Reduced px, pt */
                      placeholder=" "
                      value={editData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <label
                      htmlFor="edit-name"
                      className={`absolute px-2 text-sm ${
                        errors.name ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`} /* Adjusted top, left */
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
                  {/* Email Input */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="email"
                      id="edit-email"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`} /* Reduced px, pt */
                      placeholder=" "
                      value={editData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <label
                      htmlFor="edit-email"
                      className={`absolute px-2 text-sm ${
                        errors.email ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`} /* Adjusted top, left */
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* Phone Input */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="tel"
                      id="edit-phone"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.phone ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`} /* Reduced px, pt */
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
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`} /* Adjusted top, left */
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  {/* Role Input (Read-only in Edit Mode) */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="text"
                      id="edit-role"
                      readOnly
                      value={editData.role}
                      className="block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-gray-100 rounded-sm border-2 border-gray-300 appearance-none focus:outline-none peer cursor-not-allowed" /* Reduced px, pt */
                    />
                    <label
                      htmlFor="edit-role"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-gray-100 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" /* Adjusted top, left */
                    >
                      Role <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {/* Password Input */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="text" // Keep as password type for editing
                      id="edit-password"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.password ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`} /* Reduced px, pt */
                      placeholder=" "
                      value={editData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <label
                      htmlFor="edit-password"
                      className={`absolute px-2 text-sm ${
                        errors.password ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`} /* Adjusted top, left */
                    >
                      New Password
                    </label>
                    {editData.password && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("password")}
                        aria-label="Clear password"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* Confirm Password Input */}
                  <div className="relative mb-3">
                    {" "}
                    {/* Reduced mb */}
                    <input
                      type="text" // Keep as password type for editing
                      id="edit-confirmPassword"
                      className={`block px-3 pb-2 pt-4 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`} /* Reduced px, pt */
                      placeholder=" "
                      value={editData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                    />
                    <label
                      htmlFor="edit-confirmPassword"
                      className={`absolute px-2 text-sm ${
                        errors.confirmPassword
                          ? "text-red-500"
                          : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`} /* Adjusted top, left */
                    >
                      Confirm New Password
                    </label>
                    {editData.confirmPassword && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("confirmPassword")}
                        aria-label="Clear confirm password"
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                // --- Preview Details (when isEditMode is false) ---
                <div className="space-y-3">
                  {" "}
                  {/* Reduced space-y */}
                  {/* Name Preview */}
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    {" "}
                    {/* Reduced p */}
                    <div className="w-10 h-10 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
                      {" "}
                      {/* Reduced mr */}
                      <FiUser className="h-5 w-5 text-[#cd5e77]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-800">
                        {teamLeader.name}
                      </p>
                    </div>
                  </div>
                  {/* Email Preview */}
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    {" "}
                    {/* Reduced p */}
                    <div className="w-10 h-10 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
                      {" "}
                      {/* Reduced mr */}
                      <FiMail className="h-5 w-5 text-[#cd5e77]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">
                        {teamLeader.email}
                      </p>
                    </div>
                  </div>
                  {/* Phone Preview */}
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    {" "}
                    {/* Reduced p */}
                    <div className="w-10 h-10 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
                      {" "}
                      {/* Reduced mr */}
                      <FiPhone className="h-5 w-5 text-[#cd5e77]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {teamLeader.phone}
                      </p>
                    </div>
                  </div>
                  {/* Role Preview */}
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    {" "}
                    {/* Reduced p */}
                    <div className="w-10 h-10 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
                      {" "}
                      {/* Reduced mr */}
                      <FiBriefcase className="h-5 w-5 text-[#cd5e77]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="font-medium text-gray-800">
                        {teamLeader.role}
                      </p>
                    </div>
                  </div>
                  {/* Password Preview - Added */}
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    {" "}
                    {/* Reduced p */}
                    <div className="w-10 h-10 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
                      {" "}
                      {/* Reduced mr */}
                      <FiLock className="h-5 w-5 text-[#cd5e77]" />{" "}
                      {/* Added FiLock import if not already present */}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Password</p>
                      {/* Display the password. Consider security implications. */}
                      <p className="font-medium text-gray-800">
                        {teamLeader.password || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons - Adjusted margin and padding */}
            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
              {" "}
              {/* Reduced mt (now pt) */}
              {/* Cancel/Close Button */}
              <button
                type="button"
                onClick={onClose} // Close the main modal
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm" /* Reduced px, py */
              >
                {isEditMode ? "Cancel" : "Close"}
              </button>
              {/* Save Changes Button (only shown in Edit mode) */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleSaveChanges} // Trigger save logic
                  className="px-3 py-1.5 bg-[#cd5e77] text-white rounded-md hover:bg-[#b9556b] focus:outline-none focus:ring-1 focus:ring-[#a44b5f] text-sm" /* Reduced px, py */
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {showDeleteConfirmModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCancelDelete} // Clicking backdrop cancels delete
        >
          {/* Delete Confirmation Modal Container */}
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Delete Confirmation Content */}
            <div className="p-5">
              {" "}
              {/* Reduced padding */}
              {/* Title */}
              <h3 className="text-base font-medium text-gray-900 mb-2">
                {" "}
                {/* Reduced text size and margin */}
                Confirm Delete
              </h3>
              {/* Message */}
              <p className="text-sm text-gray-500 mb-5">
                {" "}
                {/* Reduced margin */}
                Are you sure you want to delete Team Leader{" "}
                <strong>{teamLeader.name}</strong>? This action cannot be
                undone.
              </p>
              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                {" "}
                {/* Reduced space-x */}
                {/* Cancel Delete Button */}
                <button
                  type="button"
                  onClick={handleCancelDelete} // Cancel delete
                  className="px-3 py-1.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm" /* Reduced px, py, rounded */
                >
                  Cancel
                </button>
                {/* Confirm Delete Button */}
                <button
                  type="button"
                  onClick={handleConfirmDelete} // Confirm delete
                  className="px-3 py-1.5 bg-[#cd5e77] text-white rounded-xl hover:bg-[#b9556b] focus:outline-none focus:ring-1 focus:bg-[#cd5e77] text-sm" /* Reduced px, py, rounded */
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

export default TLPreviewModal;
