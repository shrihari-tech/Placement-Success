"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2, FiPlus, FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import Image from "next/image";

export default function DomainTab() {
  // const [domains, setDomains] = useState([
  //   { key: "fullstack", label: "Full Stack Development" },
  //   { key: "dataanalytics", label: "Data Analytics & Science" },
  //   { key: "marketing", label: "Digital Marketing" },
  //   { key: "sap", label: "SAP" },
  //   { key: "banking", label: "Banking & Financial Services" },
  //   { key: "devops", label: "DevOps" },
  // ]);

  const [domains, setDomains] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [editingDomain, setEditingDomain] = useState(null);

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
      setFilteredDomains(domains);
    } else {
      const results = domains.filter(
        (domain) =>
          domain.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          domain.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDomains(results);
    }
    setSearchInitiated(true);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredDomains([]);
    setSearchInitiated(false);
  };

  // Display data
  const displayDomains = searchInitiated ? filteredDomains : domains;

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.key.trim()) {
      errors.key = "Domain key is required";
    } else if (!/^[a-z0-9]+$/.test(formData.key)) {
      errors.key = "Key must contain only lowercase letters and numbers";
    } else if (
      domains.some(
        (d) => d.key === formData.key && d.key !== editingDomain?.key
      )
    ) {
      errors.key = "Domain key must be unique";
    }

    if (!formData.label.trim()) {
      errors.label = "Domain label is required";
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
  // const handleEdit = (domain) => {
  //   setModalMode("edit");
  //   setEditingDomain(domain);
  //   setFormData({ key: domain.key, label: domain.label });
  //   setFormErrors({});
  //   setShowModal(true);
  // };
  const handleEdit = async (domain) => {
    try {
      const resp = await axios.get(`http://localhost:5000/domain/${domain.id}`);
      setModalMode("edit");
      setEditingDomain(resp.data);
      setFormData({ key: resp.data.key, label: resp.data.label });
      setFormErrors({});
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching domain:", err);
      showToast("Failed to fetch domain details", "error");
    }
  };

  // Handle delete
  const handleDelete = (domain) => {
    setDeleteConfirm(domain);
  };

  const confirmDelete = () => {
    setDomains((prev) => prev.filter((d) => d.key !== deleteConfirm.key));
    setDeleteConfirm(null);
    showToast("Domain deleted successfully");

    // Update filtered results if search is active
    if (searchInitiated) {
      handleSearch();
    }
  };

  // Handle form submit
  // const handleSubmit = () => {
  //   if (!validateForm()) return;

  //   if (modalMode === "create") {
  //     setDomains((prev) => [...prev, { ...formData }]);
  //     showToast("Domain created successfully");
  //   } else {
  //     setDomains((prev) =>
  //       prev.map((d) => (d.key === editingDomain.key ? { ...formData } : d))
  //     );
  //     showToast("Domain updated successfully");
  //   }

  //   setShowModal(false);
  //   setEditingDomain(null);

  //   // Update filtered results if search is active
  //   if (searchInitiated) {
  //     setTimeout(() => handleSearch(), 100);
  //   }
  // };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (modalMode === "create") {
        const response = await axios.post(
          "http://localhost:5000/domain/createDomain",
          formData
        );
        showToast("Domain created successfully");
        setDomains((prev) => [...prev, { ...formData, id: response.data.id }]);
        // refresh list
        const refreshed = await axios.get(
          "http://localhost:5000/domain/allDomains"
        );
        setDomains(refreshed.data);
      } else {
        // You may also need an update endpoint in backend, for now we just update locally
        // setDomains((prev) =>
        //   prev.map((d) => (d.key === editingDomain.key ? { ...formData } : d))
        // );
        await axios.put(
          `http://localhost:5000/domain/${editingDomain.id}`,
          formData
        );
        setDomains((prev) =>
          prev.map((d) =>
            d.id === editingDomain.id ? { ...editingDomain, ...formData } : d
          )
        );
        showToast("Domain updated successfully");
      }

      setShowModal(false);
      setEditingDomain(null);

      // Update filtered results if search is active
      if (searchInitiated) {
        setTimeout(() => handleSearch(), 100);
      }
    } catch (err) {
      console.error("Error creating domain:", err);
      showToast("Failed to create domain", "error");
    }
  };

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/domain/allDomains"
        );
        setDomains(response.data); // assuming backend sends [{id, key, label}, ...]
      } catch (err) {
        console.error("Error fetching domains:", err);
        showToast("Failed to load domains", "error");
      }
    };

    fetchDomains();
  }, []);

  // Auto-search when typing
  useEffect(() => {
    if (searchInitiated && searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, domains]);

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
        <h1 className="text-2xl font-bold text-gray-800">Domain Management</h1>
        <button
          onClick={handleCreate}
          className="bg-[#5f6a0a] hover:bg-[#676f21] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FiPlus size={16} />
          Add Domain
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
              Search domains...
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
                  Domain Key
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Domain Label
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayDomains.length > 0 ? (
                displayDomains.map((domain, index) => (
                  <tr
                    key={domain.key || domain.id}
                    className="hover:bg-[#5f6a0a11] text-gray-600"
                  >
                    <td className="px-5 py-3 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-mono  ">
                      {domain.key}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-medium">
                      {domain.label}
                    </td>
                    <td className="px-5 py-3 text-center text-sm">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(domain)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit Domain"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(domain)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Delete Domain"
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
                      ? "No domains found matching your search."
                      : "No domains available."}
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
              {modalMode === "create" ? "Add New Domain" : "Edit Domain"}
            </h2>

            <div className="space-y-4">
              {/* Domain Key */}
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
                  disabled={modalMode === "edit"}
                />
                <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-4 scale-75 top-4 left-4 peer-focus:text-xs peer-focus:text-[#5f6a0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Domain Key *
                </label>
                {formErrors.key && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.key}</p>
                )}
              </div>

              {/* Domain Label */}
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
                  Domain Label *
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
                  {modalMode === "create" ? "Create Domain" : "Update Domain"}
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
              Are you sure you want to delete the domain {deleteConfirm.label}?
              This action cannot be undone.
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
