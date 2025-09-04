"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../../../context/dataContext"; // Ensure this path is correct for your project structure
import { toast } from "sonner";
import Tabs from "../../components/tab";

export default function EditStudentModal({ student, onClose, onSave, isOpen }) {
  // Destructure opportunities data from context
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
    // Ensure other fields are initialized to prevent undefined errors
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
    epicStatus: student.epicStatus ?? "",
    placement: student.placement ?? "",
  });

  const initialStudent = useMemo(() => ({ ...editingStudent }), []);
  const [activeTab, setActiveTab] = useState("Personal Data");
  // Added Placement tab
  const tabs = ["Personal Data", "Score Card", "Placement"];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showEpicStatusDropdown, setShowEpicStatusDropdown] = useState(false);
  const [showPlacementDropdown, setShowPlacementDropdown] = useState(false);
  const [EditDiscarddModel, setEditDiscarddModel] = useState(false);

  const batchDropdownRef = useRef(null);
  const epicDropdownRef = useRef(null);
  const placementDropdownRef = useRef(null);
  const modeDropdownRef = useRef(null);

  const changesMade =
    JSON.stringify(editingStudent) !== JSON.stringify(initialStudent);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
      if (
        epicDropdownRef.current &&
        !epicDropdownRef.current.contains(event.target)
      ) {
        setShowEpicStatusDropdown(false);
      }
      if (
        placementDropdownRef.current &&
        !placementDropdownRef.current.contains(event.target)
      ) {
        setShowPlacementDropdown(false);
      }
      if (
        modeDropdownRef.current &&
        !modeDropdownRef.current.contains(event.target)
      ) {
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
        if (!value || !value.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(value))
          newErrors.email = "Invalid email format";
        else delete newErrors.email;
      }
      if (field === "phone") {
        const phoneRegex = /^[0-9]{10}$/;
        if (!value || !value.trim()) newErrors.phone = "Phone is required";
        else if (!phoneRegex.test(value))
          newErrors.phone = "Phone must be 10 digits";
        else delete newErrors.phone;
      }
      if (field === "batch") {
        if (!value || !value.trim()) newErrors.batch = "Batch is required";
        else delete newErrors.batch;
      }
      if (field === "epicStatus") {
        if (!value || !value.trim())
          newErrors.epicStatus = "EPIC Status is required";
        else delete newErrors.epicStatus;
      }
      if (field === "placement") {
        if (!value || !value.trim())
          newErrors.placement = "Placement Status is required";
        else delete newErrors.placement;
      }
      if (field === "mode") {
        if (!value || !value.trim())
          newErrors.mode = "Mode of Study is required";
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
    const requiredFields = [
      "name",
      "email",
      "phone",
      "batch",
      "mode",
      "epicStatus",
      "placement",
      "ug",
      "pg",
      "experience",
      "attendance",
    ];
    requiredFields.forEach((field) => {
      validateField(field, editingStudent[field]);
      if (
        !editingStudent[field] ||
        (typeof editingStudent[field] === "string" &&
          !editingStudent[field].trim())
      ) {
        isValid = false;
      }
      // Special handling for numbers
      if (field === "experience" || field === "attendance") {
        const num = parseFloat(editingStudent[field]);
        if (isNaN(num) || num < 0 || (field === "attendance" && num > 100)) {
          isValid = false;
          // Ensure error is set if validation fails here
          setErrors((prev) => ({ ...prev, [field]: `Invalid ${field}` }));
        }
      }
    });
    // Also check for any existing errors in the errors state
    if (Object.keys(errors).length > 0) {
      isValid = false;
    }
    return isValid;
  };

  // Determine the student's domain based on their batch prefix
  const studentDomain = useMemo(() => {
    if (!editingStudent.batch) return null;
    const batchPrefix = editingStudent.batch.substring(0, 2).toUpperCase();
    switch (batchPrefix) {
      case "FS":
        return "fullstack";
      case "DA":
        return "dataanalytics";
      case "BK":
        return "banking";
      case "MK":
        return "marketing";
      case "SA":
        return "sap";
      case "DV":
        return "devops";
      default:
        return null;
    }
  }, [editingStudent.batch]);

  // Get opportunities relevant to the student's domain
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
  }, [
    studentDomain,
    fullstackOpportunities,
    dataanalyticsOpportunities,
    bankingOpportunities,
    marketingOpportunities,
    sapOpportunities,
    devopsOpportunities,
  ]);

  // Filter opportunities assigned to this specific student
  const assignedOpportunities = useMemo(() => {
    if (!editingStudent?.bookingId || !relevantOpportunities) {
      return [];
    }
    return relevantOpportunities.filter(
      (opportunity) =>
        Array.isArray(opportunity.selectedStudents) &&
        opportunity.selectedStudents.includes(editingStudent.bookingId)
    );
  }, [editingStudent?.bookingId, relevantOpportunities]);

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

  const handleCancel = () => {
    setEditingStudent(initialStudent);
    setShowConfirmModal(false);
    onClose();
  };

  const clearField = (field) => {
    handleChange(field, "");
  };

  useEffect(() => {
    if (isOpen) {
      // Store scroll position
      const scrollY = window.scrollY;
      // Apply scroll lock
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        // Restore styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={() => (changesMade ? setEditDiscarddModel(true) : onClose())}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Make the modal content scrollable */}
          <div className="p-6 flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-700 font-bold">Edit Student</h2>
              <button
                onClick={() =>
                  changesMade ? setEditDiscarddModel(true) : onClose()
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={24} />
              </button>
            </div>

            {/* Tabs - Updated to Bootstrap nav-tabs style */}
        <Tabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs} 
        />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              {/* Personal Data Tab Content */}
              {activeTab === "Personal Data" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Name
                    </label>
                    {editingStudent.name && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("name")}
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
                      Email
                    </label>
                    {editingStudent.email && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("email")}
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
                        // Only allow numbers
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
                      Phone
                    </label>
                    {editingStudent.phone && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("phone")}
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
                  {/* Mode of Study Dropdown */}
                  <div className="relative mb-4" ref={modeDropdownRef}>
                    <input
                      type="text"
                      id="mode"
                      readOnly
                      placeholder=" "
                      value={editingStudent.mode || ""}
                      onClick={() => setShowModeDropdown(!showModeDropdown)}
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer`}
                    />
                    <label
                      htmlFor="mode"
                      className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                    >
                      Mode of Study
                    </label>
                    <FiChevronDown
                      className="absolute top-5 right-3 text-gray-500 pointer-events-none"
                      size={16}
                    />
                    {showModeDropdown && (
                      <div className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {["Online", "Offline"].map((mode) => (
                          <div
                            key={mode}
                            tabIndex={0}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              handleChange("mode", mode);
                              setShowModeDropdown(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleChange("mode", mode);
                                setShowModeDropdown(false);
                              }
                            }}
                          >
                            {mode}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Placement Dropdown */}
                  <div className="relative mb-4" ref={placementDropdownRef}>
                    {" "}
                    {/* Removed z-100 */}
                    <input
                      type="text"
                      id="placement"
                      readOnly
                      placeholder=" "
                      value={editingStudent.placement || ""}
                      onClick={() =>
                        setShowPlacementDropdown(!showPlacementDropdown)
                      }
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.placement ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer`}
                    />
                    <label
                      htmlFor="placement"
                      className={`absolute px-2 text-sm ${
                        errors.placement ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Placement
                    </label>
                    <FiChevronDown
                      className="absolute top-5 right-3 text-gray-500 pointer-events-none"
                      size={16}
                    />
                    {showPlacementDropdown && (
                      <div className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {[
                          "Placed",
                          "Not Placed",
                          "Yet to Place",
                          "Not Required",
                        ].map((status) => (
                          <div
                            key={status}
                            tabIndex={0}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              handleChange("placement", status);
                              setShowPlacementDropdown(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleChange("placement", status);
                                setShowPlacementDropdown(false);
                              }
                            }}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.placement && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.placement}
                      </p>
                    )}
                  </div>
                  {/* Address */}
                  <div className="relative mb-4 md:col-span-2">
                    <textarea
                      id="address"
                      rows="3"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.address ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer resize-none`}
                      placeholder=" "
                      value={editingStudent.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                    <label
                      htmlFor="address"
                      className={`absolute px-2 text-sm ${
                        errors.address ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Address
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
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
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
                      value={editingStudent.ug || ""}
                      onChange={(e) => handleChange("ug", e.target.value)}
                    />
                    <label
                      htmlFor="ug"
                      className={`absolute px-2 text-sm ${
                        errors.ug ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Under Graduation (U.G)
                    </label>
                    {editingStudent.ug && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("ug")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.ug && (
                      <p className="text-red-500 text-xs mt-1">{errors.ug}</p>
                    )}
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
                      value={editingStudent.pg || ""}
                      onChange={(e) => handleChange("pg", e.target.value)}
                    />
                    <label
                      htmlFor="pg"
                      className={`absolute px-2 text-sm ${
                        errors.pg ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Post Graduation (P.G)
                    </label>
                    {editingStudent.pg && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => clearField("pg")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.pg && (
                      <p className="text-red-500 text-xs mt-1">{errors.pg}</p>
                    )}
                  </div>
                  {/* Experience */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="experience"
                      className={`block px-4 pb-2  pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.experience ? "border-red-500" : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.experience || ""}
                      onChange={(e) =>
                        handleChange("experience", e.target.value)
                      }
                      min="0"
                      step="0.5"
                    />
                    <label
                      htmlFor="experience"
                      className={`absolute px-2 text-sm ${
                        errors.experience ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Experience (in years)
                    </label>
                    {editingStudent.experience && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-7 pr-3 flex items-center"
                        onClick={() => clearField("experience")}
                      >
                        <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.experience}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* Score Card Tab Content */}
              {/* Score Card Tab Content */}
              {activeTab === "Score Card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
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
                      onChange={(e) =>
                        handleChange("attendance", e.target.value)
                      }
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="attendance"
                      className={`absolute px-2 text-sm ${
                        errors.attendance ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Attendance (%)
                    </label>
                    {editingStudent.attendance !== "" &&
                      editingStudent.attendance != null && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-7 pr-3 flex items-center"
                          onClick={() => clearField("attendance")}
                        >
                          <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    {errors.attendance && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.attendance}
                      </p>
                    )}
                  </div>
                  {/* Domain Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="domainScore"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.domainScore
                          ? "border-red-500"
                          : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.domainScore ?? ""}
                      onChange={(e) =>
                        handleChange("domainScore", e.target.value)
                      }
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="domainScore"
                      className={`absolute px-2 text-sm ${
                        errors.domainScore ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Domain Score
                    </label>
                    {editingStudent.domainScore !== "" &&
                      editingStudent.domainScore != null && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-10 pr-3 flex items-center"
                          onClick={() => clearField("domainScore")}
                        >
                          <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    {errors.domainScore && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.domainScore}
                      </p>
                    )}
                  </div>
                  {/* Aptitude Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="aptitudeScore"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.aptitudeScore
                          ? "border-red-500"
                          : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.aptitudeScore ?? ""}
                      onChange={(e) =>
                        handleChange("aptitudeScore", e.target.value)
                      }
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="aptitudeScore"
                      className={`absolute px-2 text-sm ${
                        errors.aptitudeScore ? "text-red-500" : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Aptitude Score
                    </label>
                    {editingStudent.aptitudeScore !== "" &&
                      editingStudent.aptitudeScore != null && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-10 pr-3 flex items-center"
                          onClick={() => clearField("aptitudeScore")}
                        >
                          <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    {errors.aptitudeScore && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.aptitudeScore}
                      </p>
                    )}
                  </div>
                  {/* Communication Score Input */}
                  <div className="relative mb-4">
                    <input
                      type="number"
                      id="communicationScore"
                      className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                        errors.communicationScore
                          ? "border-red-500"
                          : "border-gray-400"
                      } appearance-none focus:outline-none focus:border-[#cd5e77] peer`}
                      placeholder=" "
                      value={editingStudent.communicationScore ?? ""}
                      onChange={(e) =>
                        handleChange("communicationScore", e.target.value)
                      }
                      min="0"
                      max="100"
                    />
                    <label
                      htmlFor="communicationScore"
                      className={`absolute px-2 text-sm ${
                        errors.communicationScore
                          ? "text-red-500"
                          : "text-gray-500"
                      } duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                    >
                      Communication Score
                    </label>
                    {editingStudent.communicationScore !== "" &&
                      editingStudent.communicationScore != null && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-10 pr-3 flex items-center"
                          onClick={() => clearField("communicationScore")}
                        >
                          <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    {errors.communicationScore && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.communicationScore}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* Placement Tab Content - Updated/Added */}
              {activeTab === "Placement" && (
                <div className="p-1">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Opportunities Assigned
                  </h3>
                  {assignedOpportunities.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              S.No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {assignedOpportunities.map((opp, index) => (
                            <tr key={opp.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {opp.companyName || "N/A"}{" "}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {opp.status || "Assigned"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p>No opportunities assigned to this student.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() =>
                  changesMade ? setEditDiscarddModel(true) : onClose()
                }
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
      {/* Confirm Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Changes</h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
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
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Discard Changes?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditDiscarddModel(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[#cd5e77] text-white rounded-xl hover:bg-[#b9556b] focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
