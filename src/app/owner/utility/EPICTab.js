"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2, FiPlus, FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";

export default function EPICTab() {
  const [proficiencyLevels, setProficiencyLevels] = useState([
    { key: "excellent", label: "E" },
    { key: "intermediate", label: "I" },
    { key: "proficient", label: "P" },
    { key: "capable", label: "C" },
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProficiencyLevels, setFilteredProficiencyLevels] = useState(
    []
  );
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [editingProficiencyLevel, setEditingProficiencyLevel] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    key: "",
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
      setFilteredProficiencyLevels(proficiencyLevels);
    } else {
      const results = proficiencyLevels.filter(
        (level) =>
          level.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          level.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProficiencyLevels(results);
    }
    setSearchInitiated(true);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredProficiencyLevels([]);
    setSearchInitiated(false);
  };

  // Display data
  const displayProficiencyLevels = searchInitiated
    ? filteredProficiencyLevels
    : proficiencyLevels;

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.key.trim()) {
      errors.key = "Proficiency key is required";
    } else if (!/^[a-z0-9]+$/.test(formData.key)) {
      errors.key = "Key must contain only lowercase letters and numbers";
    } else if (
      proficiencyLevels.some(
        (pl) =>
          pl.key === formData.key && pl.key !== editingProficiencyLevel?.key
      )
    ) {
      errors.key = "Proficiency key must be unique";
    }

    if (!formData.label.trim()) {
      errors.label = "Proficiency label is required";
    } else if (
      proficiencyLevels.some(
        (pl) =>
          pl.label === formData.label && pl.key !== editingProficiencyLevel?.key
      )
    ) {
      errors.label = "Proficiency label must be unique";
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
    setFormData({ key: "", label: "" });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle edit
  const handleEdit = (level) => {
    setModalMode("edit");
    setEditingProficiencyLevel(level);
    setFormData({ key: level.key, label: level.label });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = (level) => {
    setDeleteConfirm(level);
  };

  const confirmDelete = () => {
    setProficiencyLevels((prev) =>
      prev.filter((pl) => pl.key !== deleteConfirm.key)
    );
    setDeleteConfirm(null);
    showToast("Proficiency level deleted successfully");

    // Update filtered results if search is active
    if (searchInitiated) {
      handleSearch();
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (!validateForm()) return;

    if (modalMode === "create") {
      setProficiencyLevels((prev) => [...prev, { ...formData }]);
      showToast("Proficiency level created successfully");
    } else {
      setProficiencyLevels((prev) =>
        prev.map((pl) =>
          pl.key === editingProficiencyLevel.key ? { ...formData } : pl
        )
      );
      showToast("Proficiency level updated successfully");
    }

    setShowModal(false);
    setEditingProficiencyLevel(null);

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
  }, [searchTerm, proficiencyLevels]);

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
          Proficiency Level Management
        </h1>
        <button
          onClick={handleCreate}
          className="bg-[#5f6a0a] hover:bg-[#676f21] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FiPlus size={16} />
          Add Proficiency Level
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
              Search proficiency levels...
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
                  Proficiency Key
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Proficiency Label
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayProficiencyLevels.length > 0 ? (
                displayProficiencyLevels.map((level, index) => (
                  <tr
                    key={level.key}
                    className="hover:bg-[#5f6a0a11] text-gray-600"
                  >
                    <td className="px-5 py-3 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-mono">
                      {level.key}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-medium">
                      {level.label}
                    </td>
                    <td className="px-5 py-3 text-center text-sm">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(level)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit Proficiency Level"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(level)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Delete Proficiency Level"
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
                    colSpan="4"
                    className="px-5 py-8 text-center text-gray-500 italic"
                  >
                    {searchInitiated
                      ? "No proficiency levels found matching your search."
                      : "No proficiency levels available."}
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
                ? "Add New Proficiency Level"
                : "Edit Proficiency Level"}
            </h2>

            <div className="space-y-4">
              {/* Proficiency Key */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.key}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      key: e.target.value.toLowerCase(),
                    }))
                  }
                  className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 ${
                    formErrors.key ? "border-[#5f6a0a]" : "border-gray-400"
                  } focus:outline-none focus:border-[#5f6a0a] peer`}
                />
                <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 left-4 peer-focus:text-xs peer-focus:text-[#5f6a0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Proficiency Key *
                </label>
                {formErrors.key && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.key}</p>
                )}
              </div>

              {/* Proficiency Label */}
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
                  Proficiency Label *
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
                  {modalMode === "create"
                    ? "Create Proficiency Level"
                    : "Update Proficiency Level"}
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
              Are you sure you want to delete the proficiency level 
              {deleteConfirm.key} ({deleteConfirm.label})? This action cannot
              be undone.
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
