// placementOpTl/components/createModal.js
"use client";
import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { notification } from "antd";
import DiscardModal from "./discardModal";
import ConfirmSaveModal from "./confirmSaveModal";

const CreateModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const changesMade = Boolean(
    formData.name ||
      formData.company ||
      formData.address ||
      formData.email ||
      formData.phone
  );

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        company: "",
        address: "",
        email: "",
        phone: "",
      });
      setErrors({});
      setShowDiscardModal(false);
      setShowConfirmModal(false);
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
    if (field === "phone") {
      val = value.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({ ...prev, [field]: val }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }

    const error = validateField(field, val);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateField = (field, value) => {
    if (!value && value !== "") return "This field is required";
    const trimmedValue = String(value).trim();

    switch (field) {
      case "name":
        if (!trimmedValue) return "Name is required";
        if (!/^[a-zA-Z\s]+$/.test(trimmedValue))
          return "Name should contain only letters";
        return "";

      case "email":
        if (!trimmedValue) return "Email is required";
        const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicRegex.test(trimmedValue)) return "Invalid email format";

        const [localPart, domainPart] = trimmedValue.split("@");
        if (!localPart || localPart.length > 64) return "Invalid email format";
        if (!/^[a-zA-Z]/.test(localPart))
          return "Email local part must start with a letter";
        if (!/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(localPart))
          return "Invalid characters in email";
        if (!domainPart || domainPart.length > 253)
          return "Invalid email format";

        const domainLabels = domainPart.split(".");
        if (domainLabels.length < 2) return "Invalid email format";

        for (let i = 0; i < domainLabels.length; i++) {
          const label = domainLabels[i];
          if (!label) return "Invalid email format";
          if (label.length > 63) return "Invalid email format";

          if (i === 0) {
            if (/^[0-9]/.test(label)) return "Invalid email format";
            if (
              !/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(
                label
              )
            )
              return "Invalid email format";
          } else if (i === domainLabels.length - 1) {
            if (label.length < 2) return "Invalid email format";
            if (/^[0-9]+$/.test(label)) return "Invalid email format";
            if (!/^[a-zA-Z]+$/.test(label)) return "Invalid email format";
          } else {
            if (/^[0-9]/.test(label)) return "Invalid email format";
            if (
              !/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(
                label
              )
            )
              return "Invalid email format";
          }
        }
        return "";

      case "phone":
        if (!trimmedValue) return "Phone is required";
        if (!/^\d+$/.test(trimmedValue)) return "Invalid phone number format";
        if (!/^[6-9]/.test(trimmedValue)) return "Phone must start with 6-9";
        if (trimmedValue.length !== 10) return "Phone must be 10 digits";
        return "";

      case "company":
      case "address":
        return trimmedValue ? "" : "This field is required";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ["name", "company", "address", "email", "phone"];
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    } else {
      api.error({
        message: "Validation Error",
        description: "Fill all the required fields before submitting",
        placement: "topRight",
        duration: 3,
        showProgress: true,
        pauseOnHover: true,
        style: {
          borderColor: "#a17640",
          color: "#a17640",
        },
        className: "custom-ant-notification",
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#a17640] hover:text-[#906a39]"
            size={20}
          />
        ),
      });
    }
  };

  const handleConfirmSave = () => {
    onSave({ ...formData, id: Date.now() });
    setShowConfirmModal(false);
    onClose();
  };

  const handleCancel = () => {
    if (changesMade) {
      setShowDiscardModal(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    onClose();
  };

  const clearField = (field) => {
    handleChange(field, "");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Ant Design Notification Holder */}
      {contextHolder}

      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleCancel}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-3 px-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-700">
                Add Company SPOC
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
              >
                <RiCloseCircleLine size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-4 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Name */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="spoc-name"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.name ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <label
                    htmlFor="spoc-name"
                    className={`absolute px-2 text-sm  ${
                      errors.name ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  {formData.name && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => clearField("name")}
                      aria-label="Clear name"
                    >
                      <RiCloseCircleLine className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    </button>
                  )}
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Company */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="spoc-company"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.company ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                    placeholder=" "
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                  <label
                    htmlFor="spoc-company"
                    className={`absolute px-2 text-sm ${
                      errors.company ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Company <span className="text-red-500">*</span>
                  </label>
                  {formData.company && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => clearField("company")}
                      aria-label="Clear company"
                    >
                      <RiCloseCircleLine className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    </button>
                  )}
                  {errors.company && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative mb-4">
                  <input
                    type="email"
                    id="spoc-email"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.email ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <label
                    htmlFor="spoc-email"
                    className={`absolute px-2 text-sm ${
                      errors.email ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  {formData.email && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => clearField("email")}
                      aria-label="Clear email"
                    >
                      <RiCloseCircleLine className="text-gray-400 cursor-pointer hover:text-gray-600" />
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
                    id="spoc-phone"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.phone ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="10"
                  />
                  <label
                    htmlFor="spoc-phone"
                    className={`absolute px-2 text-sm ${
                      errors.phone ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  {formData.phone && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => clearField("phone")}
                      aria-label="Clear phone"
                    >
                      <RiCloseCircleLine className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    </button>
                  )}
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="relative mb-4 md:col-span-2">
                  <textarea
                    id="spoc-address"
                    rows="3"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                      errors.address ? "border-red-500" : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#a17640] peer`}
                    placeholder=" "
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                  <label
                    htmlFor="spoc-address"
                    className={`absolute px-2 text-sm ${
                      errors.address ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-white transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7`}
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  {formData.address && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => clearField("address")}
                      aria-label="Clear address"
                    >
                      <RiCloseCircleLine className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    </button>
                  )}
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 py-3 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="cursor-pointer px-4 py-2 bg-[#a17640] text-white rounded-md hover:bg-[#906a39]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DiscardModal
        isOpen={showDiscardModal}
        onClose={handleDiscard}
        onConfirm={handleDiscard}
      />
      <ConfirmSaveModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        name={formData.name || "SPOC"}
      />
    </>
  );
};

export default CreateModal;
