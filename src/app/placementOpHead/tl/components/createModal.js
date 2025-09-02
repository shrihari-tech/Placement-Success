// placementOpHead/tl/components/createModal.js
"use client";
import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { notification } from 'antd';
import DiscardConfirmationModal from "./discardModal";
import SaveConfirmationModal from "./saveModal";

const CreateUserModal = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Placement TL",
    password: "welcome123",
  });

  const [errors, setErrors] = useState({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const changesMade = Boolean(
    newUser.name ||
      newUser.email ||
      newUser.phone ||
      (newUser.password && newUser.password !== "welcome123")
  );

  useEffect(() => {
    if (!isOpen) {
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "Placement TL",
        password: "welcome123",
      });
      setErrors({});
      setShowDiscardModal(false);
      setShowConfirmSaveModal(false);
    }
  }, [isOpen]);

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
    let val = value;

    // Handle phone input (only digits)
    if (field === "phone") {
      val = value.replace(/[^0-9]/g, "");
    }

    setNewUser((prev) => ({ ...prev, [field]: val }));

    // Clear error for the field being edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Real-time validation
    const error = validateField(field, val);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    } else if (errors[field]) {
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
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name should contain only letters";
        }
        break;
      case "email":
        // Trim whitespace
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          error = "Email is required";
        } else {
          // Basic format check
          const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!basicRegex.test(trimmedValue)) {
            error = "Invalid email format";
          } else {
            // Split into local and domain parts
            const [localPart, domainPart] = trimmedValue.split("@");

            // Local part validation
            if (!localPart || localPart.length > 64) {
              error = "Invalid email format";
            }
            // Local part must start with a letter
            else if (!/^[a-zA-Z]/.test(localPart)) {
              error = "Email local part must start with a letter";
            }
            // Local part valid characters
            else if (!/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(localPart)) {
              error = "Invalid characters in email";
            }
            // Domain part validation
            else if (!domainPart || domainPart.length > 253) {
              error = "Invalid email format";
            } else {
              // Split domain into labels
              const domainLabels = domainPart.split(".");

              // Check if we have at least domain and TLD
              if (domainLabels.length < 2) {
                error = "Invalid email format";
              } else {
                // Validate each domain label
                for (let i = 0; i < domainLabels.length; i++) {
                  const label = domainLabels[i];

                  // Label cannot be empty
                  if (!label) {
                    error = "Invalid email format";
                    break;
                  }

                  // Label length check
                  if (label.length > 63) {
                    error = "Invalid email format";
                    break;
                  }

                  // First label (subdomain) validation
                  if (i === 0) {
                    // First label cannot start with number
                    if (/^[0-9]/.test(label)) {
                      error = "Invalid email format";
                      break;
                    }
                    // First label valid characters
                    if (
                      !/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(
                        label
                      )
                    ) {
                      error = "Invalid email format";
                      break;
                    }
                  }
                  // Last label (TLD) validation
                  else if (i === domainLabels.length - 1) {
                    // TLD must be at least 2 characters
                    if (label.length < 2) {
                      error = "Invalid email format";
                      break;
                    }
                    // TLD cannot be all numbers
                    if (/^[0-9]+$/.test(label)) {
                      error = "Invalid email format";
                      break;
                    }
                    // TLD valid characters (letters only recommended)
                    if (!/^[a-zA-Z]+$/.test(label)) {
                      error = "Invalid email format";
                      break;
                    }
                  }
                  // Middle labels (subdomains) validation
                  else {
                    // Middle labels cannot start with number
                    if (/^[0-9]/.test(label)) {
                      error = "Invalid email format";
                      break;
                    }
                    // Middle labels valid characters
                    if (
                      !/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(
                        label
                      )
                    ) {
                      error = "Invalid email format";
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone Number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Invalid phone number format";
        } else if (!/^[6-9]/.test(value)) {
          error = "Invalid phone number format";
        } else if (value.length !== 10) {
          error = "Invalid phone number format";
        }
        break;
      case "password":
        // Only validate password if it's been modified and not empty
        if (value && value.trim() !== "" && value !== "welcome123" && value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    // Always validate these required fields
    const fieldsToValidate = ["name", "email", "phone"];
    
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, newUser[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Check required fields are not empty
    if (!newUser.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!newUser.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!newUser.phone.trim()) {
      newErrors.phone = "Phone Number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    } else {
      api.error({
        message: 'Validation Error',
        description: 'Fill all the fields before submitting',
        placement: 'topRight',
        duration: 3,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: <RiCloseCircleLine className="text-[#9025a1] hover:text-[#731d80]" size={20} />,
      });
    }
  };

  const handleConfirmSave = () => {
    // Prepare the data to send
    const userDataToSend = { ...newUser };
    
    // Handle password field - only send if it's been meaningfully changed
    if (!userDataToSend.password || 
        userDataToSend.password.trim() === "" || 
        userDataToSend.password === "welcome123") {
      // Don't send password field at all - this preserves existing password
      delete userDataToSend.password;
    }
    
    onSave(userDataToSend);
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
    if (field === "password" || field === "role") return;
    handleChange(field, "");
  };

  if (!isOpen) return null;

  return (
    <>
<style jsx global>{`
        /* Custom notification styles */
        .ant-notification-notice-error {
          border-color: #9025a1 !important;
        }
        .ant-notification-notice-error .ant-notification-notice-icon {
          color: #9025a1 !important;
        }
        .ant-notification-notice-error .ant-notification-notice-message {
          color: #9025a1 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #9025a1 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #9025a1 !important;
        }
        /* Custom close icon styling */
        .ant-notification-notice-close {
          transition: all 0.3s ease;
        }
        /* Ensure progress bar container also uses the color */
        .ant-notification-notice-progress {
          background: rgba(144, 37, 161, 0.1) !important;
        }
      `}</style>
      {contextHolder}
      {/* Main Create User Modal */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleCancelClick}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Added padding-top to create space for floating labels */}
          <div className="pt-3 px-6 flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
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
            <div className="flex-1 overflow-y-auto pb-4 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Name */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="create-name"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.name ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#9025a1] peer`}
                    placeholder=" "
                    value={newUser.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <label
                    htmlFor="create-name"
                    className={`absolute px-2 text-sm ${
                      errors.name ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#9025a1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
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
                    } appearance-none focus:outline-none focus:border-[#9025a1] peer`}
                    placeholder=" "
                    value={newUser.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <label
                    htmlFor="create-email"
                    className={`absolute px-2 text-sm ${
                      errors.email ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#9025a1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
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
                    } appearance-none focus:outline-none focus:border-[#9025a1] peer`}
                    placeholder=" "
                    value={newUser.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="10"
                  />
                  <label
                    htmlFor="create-phone"
                    className={`absolute px-2 text-sm ${
                      errors.phone ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#9025a1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
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
                  <input
                    type="text"
                    id="create-role"
                    readOnly
                    value={newUser.role}
                    className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-100 rounded-sm border-2 border-gray-300 appearance-none focus:outline-none peer cursor-not-allowed"
                  />
                  <label
                    htmlFor="create-role"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-gray-100 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Password - With default value */}
                <div className="relative mb-4 md:col-span-2">
                  <input
                    type="text"
                    id="create-password"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.password ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#9025a1] peer`}
                    placeholder=" "
                    value={newUser.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <label
                    htmlFor="create-password"
                    className={`absolute px-2 text-sm ${
                      errors.password ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#9025a1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  {newUser.password && newUser.password !== "welcome123" && (
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
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 py-3 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancelClick}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="cursor-pointer px-4 py-2 bg-[#9025a1] text-white rounded-md hover:bg-[#731d80] focus:outline-none focus:ring-1 focus:ring-[#731d80]"
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
        userData={{
          ...newUser,
          // Pass the actual password value to the modal
          password: newUser.password
        }}
      />
    </>
  );
};

export default CreateUserModal;