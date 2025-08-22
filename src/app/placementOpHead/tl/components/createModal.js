// placementOpHead/tl/components/createModal.js
"use client";
import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
// import { FiChevronDown } from "react-icons/fi"; // Not needed anymore
import DiscardConfirmationModal from "./discardModal";
import SaveConfirmationModal from "./saveModal";

const CreateUserModal = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    // Changed default role
    role: "Placement TL",
    // Set default password
    password: "welcome123",
    // Removed confirmPassword
  });

  const [errors, setErrors] = useState({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  // Removed showRoleDropdown state as it's not needed

  // Check if any changes have been made (excluding role and default password)
  const changesMade = Boolean(
    newUser.name ||
      newUser.email ||
      newUser.phone ||
      (newUser.password && newUser.password !== "welcome123") // Only consider changed passwords
  );

  // Close modals and reset state on unmount or when closed
  useEffect(() => {
    if (!isOpen) {
      // Reset form and errors when modal closes, keeping default password
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "Placement TL", // Reset to default
        password: "welcome123", // Reset to default
        // Removed confirmPassword
      });
      setErrors({});
      setShowDiscardModal(false);
      setShowConfirmSaveModal(false);
      // setShowRoleDropdown(false); // Removed
    }
  }, [isOpen]);

  // Handle scroll lock like in EditStudentModal
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

  const handleChange = (field, value) => {
    // Specific handling for phone to ensure only digits
    if (field === "phone") {
      const val = value.replace(/[^0-9]/g, "");
      setNewUser((prev) => ({ ...prev, [field]: val }));
    } else {
      setNewUser((prev) => ({ ...prev, [field]: value }));
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

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        // Improved email regex for better validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "phone":
        // Enforce exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) error = "Phone is required";
        else if (!phoneRegex.test(value))
          error = "Phone must be exactly 10 digits";
        break;
      // Removed case 'role' as it's fixed
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      // Removed case 'confirmPassword'
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    // Removed 'confirmPassword' from fieldsToValidate
    const fieldsToValidate = ["name", "email", "phone", "password"];
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, newUser[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSave = () => {
    onSave(newUser);
    setShowConfirmSaveModal(false);
    onClose();
  };

  const handleCancelClick = () => {
    if (changesMade) {
      setShowDiscardModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    onClose();
  };

  const handleCloseDiscard = () => {
    setShowDiscardModal(false);
  };

  const clearField = (field) => {
    // Prevent clearing the default password or role
    if (field === "password" || field === "role") return;
    handleChange(field, "");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Create User Modal */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleCancelClick}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-700 font-bold">
                Create Team Leader
              </h2>
              <button
                onClick={handleCancelClick}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <RiCloseCircleLine size={24} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="create-name"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.name ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                    placeholder=" "
                    value={newUser.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <label
                    htmlFor="create-name"
                    className={`absolute px-2 text-sm ${
                      errors.name ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  {newUser.name && (
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
                <div className="relative mb-4">
                  <input
                    type="email"
                    id="create-email"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.email ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                    placeholder=" "
                    value={newUser.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <label
                    htmlFor="create-email"
                    className={`absolute px-2 text-sm ${
                      errors.email ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  {newUser.email && (
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
                <div className="relative mb-4">
                  <input
                    type="tel"
                    id="create-phone"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.phone ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                    placeholder=" "
                    value={newUser.phone}
                    onChange={(e) => handleChange("phone", e.target.value)} // Use handleChange which filters digits
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="10" // Helps limit input length
                  />
                  <label
                    htmlFor="create-phone"
                    className={`absolute px-2 text-sm ${
                      errors.phone ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  {newUser.phone && (
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

                {/* Role - Static Value */}
                <div className="relative mb-4">
                  {/* Use a read-only input to display the fixed role */}
                  <input
                    type="text"
                    id="create-role"
                    readOnly
                    value={newUser.role} // This will always be 'Placement TL'
                    className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-100 rounded-sm border-2 border-gray-300 appearance-none focus:outline-none peer cursor-not-allowed" // Added bg-gray-100 and cursor-not-allowed
                  />
                  <label
                    htmlFor="create-role"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-gray-100 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" // Added bg-gray-100
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Password - With default value */}
                <div className="relative mb-4 md:col-span-2">
                  {" "}
                  {/* Span 2 columns if needed */}
                  <input
                    type="text"
                    id="create-password"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.password ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                    placeholder=" "
                    value={newUser.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <label
                    htmlFor="create-password"
                    className={`absolute px-2 text-sm ${
                      errors.password ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Password <span className="text-red-500">*</span>{" "}
                    {/* (Default: welcome123) - Optional hint */}
                  </label>
                  {/* Optional: Add a small hint about the default password */}
                  {/* <p className="text-xs text-gray-500 mt-1">Default password is 'welcome123'. User can change it later.</p> */}
                  {newUser.password &&
                    newUser.password !== "welcome123" && ( // Only show clear button if value was changed
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

                {/* Removed Confirm Password section entirely */}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="px-4 py-2 bg-[#cd5e77] text-white rounded-md hover:bg-[#b9556b] focus:outline-none focus:ring-1 focus:ring-[#a44b5f]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discard Confirmation Modal */}
      <DiscardConfirmationModal
        isOpen={showDiscardModal}
        onClose={handleCloseDiscard}
        onConfirm={handleConfirmDiscard}
      />

      {/* Save Confirmation Modal */}
      <SaveConfirmationModal
        isOpen={showConfirmSaveModal}
        onClose={() => setShowConfirmSaveModal(false)}
        onConfirm={handleConfirmSave}
        tlName={newUser.name}
      />
    </>
  );
};

export default CreateUserModal;
