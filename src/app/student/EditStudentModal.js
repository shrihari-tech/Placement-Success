"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from '../context/dataContext';
import { toast } from 'sonner';

export default function EditStudentModal({ student, onClose, onSave }) {
  const { studentData, updateStudent } = useDataContext();
  const [editingStudent, setEditingStudent] = useState(student);
  const [initialStudent] = useState(student);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showEpicDropdown, setShowEpicDropdown] = useState(false);
  const [showPlacementDropdown, setShowPlacementDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  const batchDropdownRef = useRef(null);
  const epicDropdownRef = useRef(null);
  const placementDropdownRef = useRef(null);

  // Check for changes
  const changesMade = JSON.stringify(editingStudent) !== JSON.stringify(initialStudent);

  useEffect(() => {
    function handleClickOutside(event) {
      if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
      if (epicDropdownRef.current && !epicDropdownRef.current.contains(event.target)) {
        setShowEpicDropdown(false);
      }
      if (placementDropdownRef.current && !placementDropdownRef.current.contains(event.target)) {
        setShowPlacementDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (field, value) => {
    setEditingStudent(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors };
    switch (field) {
      case 'name':
        if (!value) {
          newErrors.name = 'Name is required';
        } else if (value.length < 3) {
          newErrors.name = 'Name must be at least 3 characters';
        } else if (value.length > 50) {
          newErrors.name = 'Name must be less than 50 characters';  
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'bookingId':
        if (!value) {
          newErrors.bookingId = 'Booking ID is required';
        } else if (studentData.some(s => s.bookingId === value && s.bookingId !== student.bookingId)) {
          newErrors.bookingId = 'Booking ID already exists';
        } else {
          delete newErrors.bookingId;
        }
        break;
        case 'batch':
        if (!value) {
          newErrors.batch = 'batch is required';
        } else {
          delete newErrors.batch;
        }
        break;
      default:
        delete newErrors[field];
    }
    setErrors(newErrors);
  };

    const batchesNames = useMemo(() => {
      return [...new Set(studentData.map(s => s.batch))];
    }, [studentData]);

  const handleEpicStatusChange = (value) => {
    handleChange("epicStatus", value);
    setShowEpicDropdown(false);
  };

  const handlePlacementChange = (value) => {
    handleChange("placement", value);
    setShowPlacementDropdown(false);
  };

  const handleSaveEdit = () => {
    if (changesMade && Object.keys(errors).length === 0) {
      setShowConfirmModal(true);
    } else {
      toast.error("Please fix all errors before saving");
    }
  };

  const handleConfirmSave = () => {
    updateStudent(editingStudent.bookingId, editingStudent);
    onSave && onSave(editingStudent); // Call onSave prop if provided
    onClose();
    toast.success("Student updated successfully");
  };

  const handleCancel = () => {
    setEditingStudent(initialStudent);
    setShowConfirmModal(false);
    onClose();
  };

  const clearField = (field) => {
    handleChange(field, '');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
        <div className="relative w-auto bg-white p-10 rounded-sm shadow-lg" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-sm font-bold">Edit Student</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <RiCloseCircleLine size={20} />
            </button>
          </div>
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative mb-4 w-full">
              <input
                id="name"
                type="text"
                value={editingStudent.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`peer w-full rounded border-2 px-4 pb-2 pt-5  text-sm ${errors.name ? 'border-red-500' : 'border-gray-400'} transition-all focus:border-[#6750A4] focus:outline-none`}
              />
              <label
                htmlFor="name"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Name
              </label>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              {editingStudent.name && (
                <button onClick={() => clearField("name")} className="cursor-pointer absolute top-4.5 right-3 text-gray-400 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )}
            </div>
            {/* Email */}
            <div className="relative mb-4 w-full">
              <input
                id="email"
                type="email"
                value={editingStudent.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`peer w-full rounded border-2 px-4 pb-2 pt-5  text-sm ${errors.email ? 'border-red-500' : 'border-gray-400'} transition-all focus:border-[#6750A4] focus:outline-none`}
              />
              <label
                htmlFor="email"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Email
              </label>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              {editingStudent.email && (
                <button onClick={() => clearField("email")} className="cursor-pointer absolute top-4.5 right-3 text-gray-500 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )}
            </div>
            {/* Booking ID */}
            <div className="relative mb-4 w-full">
              <input
                id="bookingId"
                type="text"
                value={editingStudent.bookingId}
                onChange={(e) => handleChange("bookingId", e.target.value)}
                className={`peer w-full rounded border-2 px-4 pb-2 pt-5 text-sm ${errors.bookingId ? 'border-red-500' : 'border-gray-400'} transition-all focus:border-[#6750A4] focus:outline-none`}
              />
              <label
                htmlFor="bookingId"
                              className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Booking ID
              </label>
              {errors.bookingId && <p className="mt-1 text-xs text-red-500">{errors.bookingId}</p>}
              {editingStudent.bookingId && (
                <button onClick={() => clearField("bookingId")} className="cursor-pointer absolute top-4.5 right-3 text-gray-500 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )}
            </div>
            {/* Batch Dropdown */}
            <div className="relative mb-4">
              <input
                type="text"
                id="batch"
                placeholder=" "
                value={editingStudent.batch}
                onChange={(e) => {
                  handleChange("batch", e.target.value);
                  setShowBatchDropdown(true);
                }}
                onFocus={() => setShowBatchDropdown(true)}
                className={`peer w-full rounded border-2 px-4 pb-2 pt-5 text-sm ${errors.batch ? 'border-red-500' : 'border-gray-400'} transition-all focus:border-[#6750A4] focus:outline-none`}
              />
              <label
                htmlFor="batch"
                className={`absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 
                  `}
              >
                Batch
              </label>
              {errors.batch && <p className="mt-1 text-xs text-red-500">{errors.batch}</p>}
              <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
              {showBatchDropdown && (
                <div
                  className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
                  ref={batchDropdownRef}
                >
                  {batchesNames
                    .filter(batch =>
                      batch?.toLowerCase().includes(editingStudent.batch?.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((batch) => (
                      <div
                        key={batch}
                        tabIndex={0}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleChange("batch", batch);
                          setShowBatchDropdown(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleChange("batch", batch);
                            setShowBatchDropdown(false);
                          }
                        }}
                      >
                        {batch}
                      </div>
                    ))}
                  {/* If no matches, show a message */}
                  {batchesNames.filter(batch =>
                    batch?.toLowerCase().includes(editingStudent.batch?.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-2 text-gray-400">No batches found</div>
                  )}
                </div>
              )}
              {/* {editingStudent.batch && (
                <button onClick={() => clearField("batch")} className="cursor-pointer absolute top-4.5 right-8 text-gray-500 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )} */}
            </div>
            {/* EPIC Status Dropdown */}
            <div className="relative mb-4">
              <input
                type="text"
                id="epic-status"
                readOnly
                placeholder=" "
                value={editingStudent.epicStatus}
                onClick={() => setShowEpicDropdown(!showEpicDropdown)}
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              />
              <label
                htmlFor="epic-status"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                EPIC Status
              </label>
              <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
              {showEpicDropdown && (
                <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md" ref={epicDropdownRef}>
                  {['Excellent', 'Proficient', 'Ideal', 'Capable'].map((status) => (
                    <div
                      key={status}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleEpicStatusChange(status)}
                      onKeyDown={(e) => { if (e.key === "Enter") { handleEpicStatusChange(status); } }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
              {/* {editingStudent.epicStatus && (
                <button onClick={() => clearField("epicStatus")} className="cursor-pointer absolute top-4.5 right-8 text-gray-500 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )} */}
            </div>
            {/* Placement Dropdown */}
            <div className="relative mb-4">
              <input
                type="text"
                id="placement"
                readOnly
                placeholder=" "
                value={editingStudent.placement}
                onClick={() => setShowPlacementDropdown(!showPlacementDropdown)}
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              />
              <label
                htmlFor="placement"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Placement
              </label>
              
              <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
              {showPlacementDropdown && (
                <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md" ref={placementDropdownRef}>
                  {['Placed', 'Yet to Place', 'Not Placed', 'Not Interested'].map((placement) => (
                    <div
                      key={placement}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handlePlacementChange(placement)}
                      onKeyDown={(e) => { if (e.key === "Enter") { handlePlacementChange(placement); } }}
                    >
                      {placement}
                    </div>
                  ))}
                </div>
              )}
              {/* {editingStudent.placement && (
                <button onClick={() => clearField("placement")} className="cursor-pointer absolute top-4.5 right-8 text-gray-500 hover:text-gray-700">
                  <RiCloseCircleLine size={20} />
                </button>
              )} */}
            </div>
          </div>
          {/* Footer Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button onClick={handleCancel} className="cursor-pointer rounded-2xl px-4 py-3 bg-[#f1ecfb] text-gray-400 hover:bg-[#e8def8] hover:text-[#4a4459]">
              Cancel
            </button>
            <button 
              onClick={handleSaveEdit}
              className={`cursor-pointer rounded-2xl px-4 py-3 text-white bg-[#6750a4] hover:bg-[#56438d] ${!changesMade || Object.keys(errors).length > 0 ? 'cursor-not-allowed bg-[#b5a9d4]' : ''}`}
              disabled={!changesMade || Object.keys(errors).length > 0}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowConfirmModal(false)}>
          <div className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Changes</h2>
              <button onClick={() => setShowConfirmModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-4 text-gray-700 text-sm">
              Are you sure you want to update student <strong className='text-m'>{editingStudent.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirmModal(false)} className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleConfirmSave} className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}