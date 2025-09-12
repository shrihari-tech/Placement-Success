"use client";
import { useState, useMemo } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { toast } from "sonner";
import { useDataContext } from "../../../context/dataContext";

export default function EditPlacementModal({ student, onClose, onSave }) {
  const { updateStudent } = useDataContext();

  const initialPlacement = useMemo(
    () => ({
      company: student.company || "",
      designation: student.designation || "",
      salary: student.salary || "",
      placedMonth: student.placedMonth || "",
    }),
    [student]
  );

  const [placement, setPlacement] = useState(initialPlacement);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);

  const changesMade =
    JSON.stringify(placement) !== JSON.stringify(initialPlacement);

  const validate = () => {
    let temp = {};

    if (!placement.company.trim()) temp.company = "Company is required";
    if (!placement.designation.trim())
      temp.designation = "Designation is required";

    if (!placement.salary) {
      temp.salary = "Salary is required";
    } else if (isNaN(placement.salary)) {
      temp.salary = "Salary must be a number";
    }

    if (!placement.placedMonth.trim())
      temp.placedMonth = "Placed Month is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (field, value) => {
    setPlacement((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = () => {
    if (validate()) {
      if (changesMade) {
        setShowConfirmModal(true);
      } else {
        onClose();
      }
    }
  };

  const handleConfirmSave = () => {
    updateStudent(student.bookingId, { ...student, ...placement });
    onSave && onSave({ ...student, ...placement });
    toast.success("Placement details updated successfully");
    setShowConfirmModal(false);
    onClose();
  };

  const handleDiscard = () => {
    setPlacement(initialPlacement);
    setDiscardModal(false);
    onClose();
  };

  const clearField = (field) => {
    handleChange(field, "");
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={() => (changesMade ? setDiscardModal(true) : onClose())}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-700 font-bold">
              Edit Placement Details
            </h2>
            <button
              onClick={() => (changesMade ? setDiscardModal(true) : onClose())}
              className="text-gray-500 hover:text-gray-700"
            >
              <RiCloseCircleLine size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div className="relative mb-4">
              <input
                type="text"
                value={placement.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder=" "
                className={`block px-4 pb-2 pt-5 w-full text-sm border-2 ${
                  errors.company ? "border-red-500" : "border-gray-400"
                } rounded-sm focus:border-[#6750A4]`}
              />
              <label className="absolute px-2 text-sm text-gray-500 -translate-y-3 scale-75 top-3.5 left-4 bg-white">
                Company
              </label>
              {placement.company && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => clearField("company")}
                >
                  <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            {/* Designation */}
            <div className="relative mb-4">
              <input
                type="text"
                value={placement.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                placeholder=" "
                className={`block px-4 pb-2 pt-5 w-full text-sm border-2 ${
                  errors.designation ? "border-red-500" : "border-gray-400"
                } rounded-sm focus:border-[#6750A4]`}
              />
              <label className="absolute px-2 text-sm text-gray-500 -translate-y-3 scale-75 top-3.5 left-4 bg-white">
                Designation
              </label>
              {placement.designation && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => clearField("designation")}
                >
                  <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            {/* Salary */}
            <div className="relative mb-4">
              <input
                type="text"
                value={placement.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder=" "
                className={`block px-4 pb-2 pt-5 w-full text-sm border-2 ${
                  errors.salary ? "border-red-500" : "border-gray-400"
                } rounded-sm focus:border-[#6750A4]`}
              />
              <label className="absolute px-2 text-sm text-gray-500 -translate-y-3 scale-75 top-3.5 left-4 bg-white">
                Salary (₹)
              </label>
              {placement.salary && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => clearField("salary")}
                >
                  <RiCloseCircleLine className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {errors.salary && (
                <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
              )}
            </div>

            {/* Placed Month */}
            <div className="relative mb-4">
              <input
                type="month"
                value={placement.placedMonth}
                onChange={(e) => handleChange("placedMonth", e.target.value)}
                className={`block px-4 py-3 w-full text-sm border-2 ${
                  errors.placedMonth ? "border-red-500" : "border-gray-400"
                } rounded-sm focus:border-[#6750A4]`}
              />
              {errors.placedMonth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.placedMonth}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => (changesMade ? setDiscardModal(true) : onClose())}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#cd5e77] text-white rounded-md hover:bg-[#cd5e78b0]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="w-[500px] bg-white rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium mb-4">Confirm Changes</h3>
            <p className="text-sm text-gray-600 mb-6">
              Update placement details for <strong>{student.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-[#cd5e77] text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Modal */}
      {discardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium mb-2">Discard Changes?</h3>
            <p className="text-sm text-gray-500 mb-6">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDiscardModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 bg-[#cd5e77] text-white rounded-md"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
