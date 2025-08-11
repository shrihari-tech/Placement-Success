// EditStudentModal.jsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../../../context/dataContext"; // Ensure this path is correct for your project structure
import { toast } from "sonner";

export default function EditStudentModal({ student, onClose, onSave }) {
  // Destructure data from context
  const {
    updateStudent,
    batchesNames,
    batchData,
    fullstackOpportunities,
    dataanalyticsOpportunities,
    marketingOpportunities,
    sapOpportunities,
    devopsOpportunities,
    bankingOpportunities,
  } = useDataContext();

  const [editingStudent, setEditingStudent] = useState({
    ...student,
    mode:
      typeof student.mode === "string" && student.mode
        ? student.mode
        : "Online",
    batch:
      typeof student.batch === "string" && student.batch
        ? student.batch
        : batchesNames.length > 0
          ? batchesNames[0]
          : "",
    // Initialize potentially missing fields
    address: student.address ?? "",
    ug: student.ug ?? "",
    pg: student.pg ?? "",
    experience: student.experience ?? "",
    attendance: student.attendance ?? "",
    mile1: student.mile1 ?? "",
    mile2: student.mile2 ?? "",
    mile3: student.mile3 ?? "",
    irc: student.irc ?? "",
    status: student.status ?? "",
    domainScore: student.domainScore ?? "",
    aptitudeScore: student.aptitudeScore ?? "",
    communicationScore: student.communicationScore ?? "",
    // epicStatus and placement are handled by the table now, not dropdowns
  });

  const initialStudent = useMemo(() => ({ ...editingStudent }), []);
  const [activeTab, setActiveTab] = useState("Personal Data");
  const tabs = ["Personal Data", "Score Card", "Placement"];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [EditDiscarddModel, setEditDiscarddModel] = useState(false);

  const batchDropdownRef = useRef(null);
  const modeDropdownRef = useRef(null);

  const changesMade = JSON.stringify(editingStudent) !== JSON.stringify(initialStudent);

  useEffect(() => {
    function handleClickOutside(event) {
      if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) {
        setShowModeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (field, value) => {
    setEditingStudent((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (field === "name") {
        if (!value || !value.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
      }

      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !value.trim())
          newErrors.email = "Email is required";
        else if (!emailRegex.test(value))
          newErrors.email = "Invalid email format";
        else delete newErrors.email;
      }

      if (field === "phone") {
        const phoneRegex = /^[0-9]{10}$/;
        if (!value || !value.trim())
          newErrors.phone = "Phone is required";
        else if (!phoneRegex.test(value))
          newErrors.phone = "Phone must be 10 digits";
        else delete newErrors.phone;
      }

      if (field === "batch") {
        if (!value || !value.trim()) newErrors.batch = "Batch is required";
        else delete newErrors.batch;
      }

      if (field === "mode") {
        if (!value || !value.trim()) newErrors.mode = "Mode of Study is required";
        else delete newErrors.mode;
      }

      // Validation for other fields if needed (Address, UG, PG, Experience, Attendance)
      if (field === "address") {
        if (!value || !value.trim()) newErrors.address = "Address is required";
        else delete newErrors.address;
      }

      if (field === "ug") {
        if (!value || !value.trim()) newErrors.ug = "U.G is required";
        else delete newErrors.ug;
      }

      if (field === "pg") {
        if (!value || !value.trim()) newErrors.pg = "P.G is required";
        else delete newErrors.pg;
      }

      if (field === "experience") {
        const num = parseFloat(value);
        if (value === "" || isNaN(num) || num < 0) {
          newErrors.experience = "Valid experience (in years) is required";
        } else {
          delete newErrors.experience;
        }
      }

      if (field === "attendance") {
        const num = parseFloat(value);
        if (value === "" || isNaN(num) || num < 0 || num > 100) {
          newErrors.attendance = "Attendance must be between 0 and 100";
        } else {
          delete newErrors.attendance;
        }
      }

      // If all errors are gone, clear all
      if (Object.keys(newErrors).length === 0) return {};
      return newErrors;
    });
  };

  const validateFields = () => {
    let isValid = true;
    // Updated required fields list to remove epicStatus and placement dropdowns
    const requiredFields = [
      "name", "email", "phone", "batch", "mode", "ug", "pg", "experience", "attendance"
    ];

    requiredFields.forEach((field) => {
       validateField(field, editingStudent[field]);
       if (!editingStudent[field] || (typeof editingStudent[field] === 'string' && !editingStudent[field].trim())) {
         isValid = false;
       }
       // Special handling for numbers
       if (field === "experience" || field === "attendance") {
         const num = parseFloat(editingStudent[field]);
         if (isNaN(num) || num < 0 || (field === "attendance" && num > 100)) {
           isValid = false;
           setErrors(prev => ({ ...prev, [field]: `Invalid ${field}` }));
         }
       }
    });

    // Also check for any existing errors in the errors state
    if (Object.keys(errors).length > 0) {
        isValid = false;
    }

    return isValid;
  };

  // --- Updated studentDomain logic based on actual batch prefixes ---
  const studentDomain = useMemo(() => {
    if (!editingStudent.batch) return null;
    const upperBatch = editingStudent.batch.toUpperCase();

    // Handle 3-character prefixes first
    if (upperBatch.startsWith("SAP")) return "sap";
    if (upperBatch.startsWith("DV")) return "devops"; // DevOps
    if (upperBatch.startsWith("BK")) return "banking"; // Banking

    // Handle 2-character prefixes
    const twoCharPrefix = upperBatch.substring(0, 2);
    switch (twoCharPrefix) {
      case "FS": return "fullstack";
      case "DA": return "dataanalytics";
      case "MK": return "marketing";
      // Add other 2-char prefixes if needed
      default:
        console.warn(`Unknown batch prefix '${twoCharPrefix}' for batch '${editingStudent.batch}'`);
        return null;
    }
  }, [editingStudent.batch]);

  // --- Get opportunities relevant to the student's domain ---
  const relevantOpportunities = useMemo(() => {
    switch (studentDomain) {
      case "fullstack":
        return fullstackOpportunities || [];
      case "dataanalytics":
        return dataanalyticsOpportunities || [];
      case "banking":
        return bankingOpportunities || [];
      case "marketing":
        return marketingOpportunities || [];
      case "sap":
        return sapOpportunities || [];
      case "devops":
        return devopsOpportunities || [];
      default:
        return [];
    }
  }, [studentDomain, fullstackOpportunities, dataanalyticsOpportunities, bankingOpportunities, marketingOpportunities, sapOpportunities, devopsOpportunities]);


  const handleSave = () => {
    if (validateFields()) {
      if (changesMade) {
        setShowConfirmModal(true);
      } else {
        onClose();
      }
    }
  };

  const handleConfirmSave = () => {
    const updatedStudent = {
      ...editingStudent,
      mode:
        typeof editingStudent.mode === "string" && editingStudent.mode
          ? editingStudent.mode
          : "Online",
    };
    updateStudent(updatedStudent.bookingId, updatedStudent);
    onSave && onSave(updatedStudent);
    setShowConfirmModal(false);
    setEditingStudent(initialStudent);
    onClose();
    toast.success("Student updated successfully");
  };

  const clearField = (field) => {
    handleChange(field, "");
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Update</h3>
            <p className="mb-4 text-gray-700 text-sm">
              Are you sure you want to update student{" "}
              <strong className="text-m">{initialStudent.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="cursor-pointer bg-[#cd5e77] hover:bg-[#b9556b] text-white px-4 py-2.5 rounded-xl text-sm font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Confirmation Modal */}
      {EditDiscarddModel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Discard Changes?</h3>
            <p className="mb-4 text-gray-700 text-sm">
              Are you sure you want to discard changes for <strong>{initialStudent.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditDiscarddModel(false)}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditingStudent(initialStudent);
                  setEditDiscarddModel(false);
                  onClose();
                }}
                className="cursor-pointer bg-[#cd5e77] hover:bg-[#b9556b] text-white px-4 py-2.5 rounded-xl text-sm font-medium"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-700 font-bold">Edit Student</h2>
              <button
                onClick={() => (changesMade ? setEditDiscarddModel(true) : onClose())}
                className="text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="w-full mt-4 mb-6">
              <div className="relative">
                <div className="flex border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                        activeTab === tab
                          ? "text-[#cd5e77] border-b-2 border-[#cd5e77]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content - Scrollable */}
            <div className="flex-grow overflow-y-auto pr-2 -mr-2">
              {/* Personal Data Tab Content */}
              {activeTab === "Personal Data" && (
                <div className="p-1">
                  {/* Booking ID - Read Only */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      id="bookingId"
                      readOnly
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-100 rounded-sm border-2 border-gray-300 appearance-none focus:outline-none peer"
                      placeholder=" "
                      value={editingStudent.bookingId}
                    />
                    <label
                      htmlFor="bookingId"
                      className="absolute px-2 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-gray-100"
                    >
                      Booking ID <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Name */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      id="name"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <label
                      htmlFor="name"
                      className={`absolute px-2 text-sm ${
                        errors.name ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="relative mb-4">
                    <input
                      type="email"
                      id="email"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute px-2 text-sm ${
                        errors.email ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="relative mb-4">
                    <input
                      type="tel"
                      id="phone"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.phone ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        handleChange("phone", val);
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <label
                      htmlFor="phone"
                      className={`absolute px-2 text-sm ${
                        errors.phone ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("phone")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* Batch */}
                  <div className="relative mb-4" ref={batchDropdownRef}>
                    <div
                      className={`flex justify-between items-center px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.batch ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] cursor-pointer`}
                      onClick={() => setShowBatchDropdown(!showBatchDropdown)}
                    >
                      <span className={editingStudent.batch ? "text-gray-900" : "text-gray-500"}>
                        {editingStudent.batch || "Select Batch"}
                      </span>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${
                          showBatchDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="batch"
                      className={`absolute px-2 text-sm ${
                        errors.batch ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Batch <span className="text-red-500">*</span>
                    </label>
                    {errors.batch && <p className="mt-1 text-xs text-red-500">{errors.batch}</p>}
                    {showBatchDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {batchesNames.map((batch) => (
                          <div
                            key={batch}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleChange("batch", batch);
                              setShowBatchDropdown(false);
                            }}
                          >
                            {batch}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mode */}
                  <div className="relative mb-4" ref={modeDropdownRef}>
                    <div
                      className={`flex justify-between items-center px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.mode ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] cursor-pointer`}
                      onClick={() => setShowModeDropdown(!showModeDropdown)}
                    >
                      <span className={editingStudent.mode ? "text-gray-900" : "text-gray-500"}>
                        {editingStudent.mode || "Select Mode"}
                      </span>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${
                          showModeDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="mode"
                      className={`absolute px-2 text-sm ${
                        errors.mode ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Mode <span className="text-red-500">*</span>
                    </label>
                    {errors.mode && <p className="mt-1 text-xs text-red-500">{errors.mode}</p>}
                    {showModeDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {["Online", "Offline"].map((mode) => (
                          <div
                            key={mode}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleChange("mode", mode);
                              setShowModeDropdown(false);
                            }}
                          >
                            {mode}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="relative mb-4">
                    <textarea
                      id="address"
                      rows="3"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.address ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer resize-none`}
                      placeholder=" "
                      value={editingStudent.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                    <label
                      htmlFor="address"
                      className={`absolute px-2 text-sm ${
                        errors.address ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    {editingStudent.address && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={() => clearField("address")}
                      >
                        <RiCloseCircleLine size={18} />
                      </button>
                    )}
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                  </div>

                  {/* U.G (Under Graduation) */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      id="ug"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.ug ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.ug}
                      onChange={(e) => handleChange("ug", e.target.value)}
                    />
                    <label
                      htmlFor="ug"
                      className={`absolute px-2 text-sm ${
                        errors.ug ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      U.G <span className="text-red-500">*</span>
                    </label>
                    {errors.ug && <p className="mt-1 text-xs text-red-500">{errors.ug}</p>}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("ug")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* P.G (Post Graduation) */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      id="pg"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.pg ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.pg}
                      onChange={(e) => handleChange("pg", e.target.value)}
                    />
                    <label
                      htmlFor="pg"
                      className={`absolute px-2 text-sm ${
                        errors.pg ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      P.G <span className="text-red-500">*</span>
                    </label>
                    {errors.pg && <p className="mt-1 text-xs text-red-500">{errors.pg}</p>}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("pg")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* Experience */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="experience"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.experience ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                      min="0"
                      step="0.1"
                    />
                    <label
                      htmlFor="experience"
                      className={`absolute px-2 text-sm ${
                        errors.experience ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Experience (Years) <span className="text-red-500">*</span>
                    </label>
                    {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("experience")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Score Card Tab Content */}
              {activeTab === "Score Card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                  {/* Mile 1 */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="mile1"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.mile1 ?? ""}
                      onChange={(e) => handleChange("mile1", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="mile1"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Mile 1
                    </label>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("mile1")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* Mile 2 */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="mile2"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.mile2 ?? ""}
                      onChange={(e) => handleChange("mile2", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="mile2"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Mile 2
                    </label>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("mile2")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* Mile 3 */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="mile3"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.mile3 ?? ""}
                      onChange={(e) => handleChange("mile3", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="mile3"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Mile 3
                    </label>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("mile3")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* IRC */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="irc"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.irc ?? ""}
                      onChange={(e) => handleChange("irc", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="irc"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      IRC
                    </label>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => clearField("irc")}
                    >
                      <RiCloseCircleLine size={18} />
                    </button>
                  </div>

                  {/* Attendance Input - Editable */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="attendance"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.attendance ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.attendance ?? ""}
                      onChange={(e) => handleChange("attendance", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="attendance"
                      className={`absolute px-2 text-sm ${
                        errors.attendance ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Attendance <span className="text-red-500">*</span>
                    </label>
                    {editingStudent.attendance !== "" && editingStudent.attendance != null && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-7 pr-3 flex items-center"
                        onClick={() => clearField("attendance")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.attendance && <p className="mt-1 text-xs text-red-500">{errors.attendance}</p>}
                  </div>

                  {/* Domain Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="domainScore"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.domainScore ?? ""}
                      onChange={(e) => handleChange("domainScore", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="domainScore"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Domain Score
                    </label>
                    {editingStudent.domainScore !== "" && editingStudent.domainScore != null && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-7 pr-3 flex items-center"
                        onClick={() => clearField("domainScore")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {/* Aptitude Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="aptitudeScore"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.aptitudeScore ?? ""}
                      onChange={(e) => handleChange("aptitudeScore", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="aptitudeScore"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Aptitude Score
                    </label>
                    {editingStudent.aptitudeScore !== "" && editingStudent.aptitudeScore != null && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-7 pr-3 flex items-center"
                        onClick={() => clearField("aptitudeScore")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {/* Communication Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="communicationScore"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.communicationScore ?? ""}
                      onChange={(e) => handleChange("communicationScore", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="communicationScore"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Communication Score
                    </label>
                    {editingStudent.communicationScore !== "" && editingStudent.communicationScore != null && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-7 pr-3 flex items-center"
                        onClick={() => clearField("communicationScore")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {/* Status Input */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      id="status"
                      className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer"
                      placeholder=" "
                      value={editingStudent.status ?? ""}
                      onChange={(e) => handleChange("status", e.target.value)}
                    />
                    <label
                      htmlFor="status"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Status
                    </label>
                    {editingStudent.status && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        onClick={() => clearField("status")}
                      >
                        <RiCloseCircleLine size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Placement Tab Content - Updated */}
              {activeTab === "Placement" && (
                <div className="p-1">
                  {/* Opportunities Table - Replaces Epic Status and Placement dropdowns */}
                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      Opportunities for {studentDomain ? studentDomain.charAt(0).toUpperCase() + studentDomain.slice(1) : 'Student\'s Domain'}
                    </h3>
                    {relevantOpportunities && relevantOpportunities.length > 0 ? (
                      <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {relevantOpportunities.map((opportunity) => (
                              <tr key={opportunity.id} className="hover:bg-gray-50">
                                {/* Use the correct field names from your Opportunities data structure */}
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{opportunity.companyName}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{opportunity.domain}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{opportunity.driveRole}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    opportunity.status === 'Open' ? 'bg-green-100 text-green-800' :
                                    opportunity.status === 'Closed' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {opportunity.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        {studentDomain ? (
                          relevantOpportunities ? (
                            <p>No opportunities are currently available for the <strong>{studentDomain}</strong> domain.</p>
                          ) : (
                            <p>Error: Could not retrieve opportunities for the <strong>{studentDomain}</strong> domain.</p>
                          )
                        ) : editingStudent.batch ? (
                          <p>Unable to determine the domain for batch <strong>'{editingStudent.batch}'</strong>. Please check the batch format.</p>
                        ) : (
                          <p>The student is not assigned to a batch. Opportunities are shown based on the batch domain.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => (changesMade ? setEditDiscarddModel(true) : onClose())}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-[#cd5e77] text-white rounded-md hover:bg-[#b9556b] focus:outline-none focus:ring-1 focus:ring-[#a44b5f]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
