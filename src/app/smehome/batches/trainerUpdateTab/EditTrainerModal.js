"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../../../context/dataContext";
import { toast } from "sonner";

export default function EditTrainerModal({ student, onClose, onSave }) {
  const { updateStudent, batchesNames } = useDataContext();
  const [EditDiscarddModel, setEditDiscarddModel] = useState(false);
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
  });
  const initialStudent = useMemo(
    () => ({
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
    }),
    [student, batchesNames]
  );

  // --- New State for Tabs ---
  const [activeTab, setActiveTab] = useState("Personal Data"); // Default to Personal Data
  const tabs = ["Personal Data"];
  // --- End New State ---

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showEpicStatusDropdown, setShowEpicStatusDropdown] = useState(false);
  const [showPlacementDropdown, setShowPlacementDropdown] = useState(false);
  const batchDropdownRef = useRef(null);
  const epicDropdownRef = useRef(null);
  const placementDropdownRef = useRef(null);
  const modeDropdownRef = useRef(null);

  // Check for changes
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

  const validateFields = () => {
    let tempErrors = {};
    // Name
    if (!editingStudent.name || !editingStudent.name.trim())
      tempErrors.name = "Name is required";
    // Email
    if (!editingStudent.email || !editingStudent.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(editingStudent.email)) {
      tempErrors.email = "Email is invalid";
    }
    // Phone
    if (!editingStudent.phone || !editingStudent.phone.trim()) {
      tempErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(editingStudent.phone)) {
      tempErrors.phone = "Phone must be 10 digits";
    }
    // Batch
    if (!editingStudent.batch || !editingStudent.batch.trim())
      tempErrors.batch = "Batch is required";
    // EPIC Status
    if (!editingStudent.epicStatus || !editingStudent.epicStatus.trim())
      tempErrors.epicStatus = "EPIC Status is required";
    // Placement
    if (!editingStudent.placement || !editingStudent.placement.trim())
      tempErrors.placement = "Placement Status is required";
    // Mode
    if (!editingStudent.mode || !editingStudent.mode.trim())
      tempErrors.mode = "Mode of Study is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setEditingStudent((prev) => ({ ...prev, [field]: value }));
    // Live validation for the field
    setErrors((prev) => {
      const newErrors = { ...prev };
      // Name
      if (field === "name") {
        if (!value || !value.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
      }
      // Email
      if (field === "email") {
        if (!value || !value.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          newErrors.email = "Email is invalid";
        else delete newErrors.email;
      }
      // Phone
      if (field === "phone") {
        if (!value || !value.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(value))
          newErrors.phone = "Phone must be 10 digits";
        else delete newErrors.phone;
      }
      // Batch
      if (field === "batch") {
        if (!value || !value.trim()) newErrors.batch = "Batch is required";
        else delete newErrors.batch;
      }
      // EPIC Status
      if (field === "epicStatus") {
        if (!value || !value.trim())
          newErrors.epicStatus = "EPIC Status is required";
        else delete newErrors.epicStatus;
      }
      // Placement
      if (field === "placement") {
        if (!value || !value.trim())
          newErrors.placement = "Placement Status is required";
        else delete newErrors.placement;
      }
      // Mode
      if (field === "mode") {
        if (!value || !value.trim())
          newErrors.mode = "Mode of Study is required";
        else delete newErrors.mode;
      }
      // If all errors are gone, clear all
      if (Object.keys(newErrors).length === 0) return {};
      return newErrors;
    });
  };

  const handleSave = () => {
    if (validateFields()) {
      if (changesMade) {
        setShowConfirmModal(true);
      } else {
        // No changes, just close
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

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-700 font-bold">
                Trainer Update
              </h2>
              <button
                onClick={() =>
                  changesMade ? setEditDiscarddModel(true) : onClose()
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={24} />
              </button>
            </div>

            <div>
              {/* Personal Data Tab Content */}

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
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
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
                <div className="relative mb-4 z-100" ref={placementDropdownRef}>
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
              </div>
            </div>
            {/* End Tab Content */}

            <div className="flex justify-end space-x-3 mt-6">
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
