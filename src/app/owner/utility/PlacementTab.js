"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2, FiPlus, FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";

export default function PlacementTab() {
  const [eligibilityStatuses, setEligibilityStatuses] = useState([
    { id: 1, label: "Eligible" },
    { id: 2, label: "Ineligible" },
    { id: 3, label: "Required" },
    { id: 4, label: "Not required" },
  ]);

  // Counter for generating unique IDs
  const [nextId, setNextId] = useState(5);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEligibilityStatuses, setFilteredEligibilityStatuses] =
    useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [editingEligibilityStatus, setEditingEligibilityStatus] =
    useState(null);

  // Form states
  const [formData, setFormData] = useState({
    label: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Search function
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredEligibilityStatuses(eligibilityStatuses);
    } else {
      const results = eligibilityStatuses.filter((status) =>
        status.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEligibilityStatuses(results);
    }
    setSearchInitiated(true);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredEligibilityStatuses([]);
    setSearchInitiated(false);
  };

  // Display data
  const displayEligibilityStatuses = searchInitiated
    ? filteredEligibilityStatuses
    : eligibilityStatuses;

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.label.trim()) {
      errors.label = "Eligibility status label is required";
    } else if (
      eligibilityStatuses.some(
        (es) =>
          es.label.toLowerCase() === formData.label.toLowerCase() &&
          es.id !== editingEligibilityStatus?.id
      )
    ) {
      errors.label = "Eligibility status label must be unique";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Handle create
  const handleCreate = () => {
    setModalMode("create");
    setFormData({ label: "" });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle edit
  const handleEdit = (status) => {
    setModalMode("edit");
    setEditingEligibilityStatus(status);
    setFormData({ label: status.label });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = (status) => {
    setDeleteConfirm(status);
  };

  const confirmDelete = () => {
    setEligibilityStatuses((prev) =>
      prev.filter((es) => es.id !== deleteConfirm.id)
    );
    setDeleteConfirm(null);
    showToast("Eligibility status deleted successfully");

    // Update filtered results if search is active
    if (searchInitiated) {
      handleSearch();
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (!validateForm()) return;

    if (modalMode === "create") {
      const newStatus = {
        id: nextId,
        label: formData.label.trim(),
      };
      setEligibilityStatuses((prev) => [...prev, newStatus]);
      setNextId((prev) => prev + 1);
      showToast("Eligibility status created successfully");
    } else {
      setEligibilityStatuses((prev) =>
        prev.map((es) =>
          es.id === editingEligibilityStatus.id
            ? { ...es, label: formData.label.trim() }
            : es
        )
      );
      showToast("Eligibility status updated successfully");
    }

    setShowModal(false);
    setEditingEligibilityStatus(null);

    // Update filtered results if search is active
    if (searchInitiated) {
      setTimeout(() => handleSearch(), 100);
    }
  };

  // Auto-search when typing
  useEffect(() => {
    if (searchInitiated && searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, eligibilityStatuses]);

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Placement Status Management
        </h1>
        <button
          onClick={handleCreate}
          className="bg-[#5f6a0a] hover:bg-[#676f21] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FiPlus size={16} />
          Add Placement Status
        </button>
      </div>

      {/* Search Filters */}
      <div className="bg-[#d2d5b6] py-3 rounded-xl mb-6">
        <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block px-4 pb-2 pt-5 w-[300px] text-sm text-[#5f6a0a] bg-[#d2d5b6] rounded-sm border-2 border-[#5f6a0ad7] focus:outline-none focus:border-[#676f21] peer"
              autoComplete="off"
            />
            <label className="absolute px-2 text-sm text-[#5f6a0ad7] duration-300 bg-[#d2d5b6] transform -translate-y-4 scale-75 top-4 left-4 peer-focus:text-xs peer-focus:text-[#676f21] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
              Search eligibility statuses...
            </label>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#5f6a0a] hover:bg-[#676f21] text-white px-5 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <FaSearch /> Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#e2e2e2] hover:bg-[#eaeaea] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm w-full overflow-x-auto">
        <div className="w-full max-w-full overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  S.No
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Status Label
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayEligibilityStatuses.length > 0 ? (
                displayEligibilityStatuses.map((status, index) => (
                  <tr
                    key={status.id}
                    className="hover:bg-[#5f6a0a11] text-gray-600"
                  >
                    <td className="px-5 py-3 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-medium">
                      {status.label}
                    </td>
                    <td className="px-5 py-3 text-center text-sm">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(status)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit Eligibility Status"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(status)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Delete Eligibility Status"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-5 py-8 text-center text-gray-500 italic"
                  >
                    {searchInitiated
                      ? "No eligibility statuses found matching your search."
                      : "No eligibility statuses available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {modalMode === "create"
                ? "Add New Eligibility Status"
                : "Edit Eligibility Status"}
            </h2>

            <div className="space-y-4">
              {/* Status Label */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.label}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, label: e.target.value }))
                  }
                  className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                    formErrors.label ? "border-red-400" : "border-gray-400"
                  } focus:outline-none focus:border-[#5f6a0a] peer`}
                />
                <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 left-4 peer-focus:text-xs peer-focus:text-[#5f6a0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Status Label *
                </label>
                {formErrors.label && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.label}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-[#5f6a0a] hover:bg-[#5f6a0a] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  {modalMode === "create" ? "Create Status" : "Update Status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the eligibility status 
              {deleteConfirm.label}? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
