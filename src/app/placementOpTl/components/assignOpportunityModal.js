// placementOpTl/components/assignOpportunityModal.js
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { notification } from 'antd'; // Import antd notification
import { RiCloseCircleLine } from 'react-icons/ri';
import { FiChevronDown } from 'react-icons/fi';
// Remove the sonner import

// Define a mapping from domain keys to their batch prefixes
const DOMAIN_PREFIX_MAP = {
  fullstack: "FS",
  dataanalytics: "DA",
  marketing: "MK",
  sap: "SAP",
  devops: "DV",
  banking: "BK",
};

const AssignOpportunityModal = ({ isOpen, onClose, onSubmit, formData, setFormData, domains, allStudentData = [], notificationApi }) => { // Accept notificationApi prop
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState({});
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);

  // If notificationApi isn't passed, use the hook locally (fallback)
  const [localApi, contextHolder] = notificationApi ? [notificationApi, null] : notification.useNotification();
  const api = notificationApi || localApi;

  const domainDropdownRef = useRef(null);
  const batchDropdownRef = useRef(null);

  // --- Extract unique batches from allStudentData based on selected domain ---
  const filteredBatches = useMemo(() => {
    if (localFormData.domain && DOMAIN_PREFIX_MAP[localFormData.domain]) {
      const prefix = DOMAIN_PREFIX_MAP[localFormData.domain];
      const batches = [...new Set(
        allStudentData
          .filter(student => student.batch?.startsWith(prefix))
          .map(student => student.batch)
      )].sort();
      return batches;
    }
    return [];
  }, [localFormData.domain, allStudentData]); // Depend on domain and allStudentData

  // Sync local form data with prop when modal opens or formData changes
  useEffect(() => {
    setLocalFormData(formData);
    setErrors({});
  }, [formData, isOpen]);

  // Effect to handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target)) {
        setShowDomainDropdown(false);
      }
      if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
    }
    if (isOpen) { // Only add listener if modal is open
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Add isOpen to dependency array

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [id]: value }));
    // Clear error for the field being changed
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    // Reset batch if domain changes
    if (id === 'domain') {
      setLocalFormData(prev => ({ ...prev, selectedBatch: '' }));
      setShowBatchDropdown(false);
      // Clear batch error if domain changes
      if (errors.selectedBatch) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.selectedBatch;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Domain validation
    if (!localFormData.domain?.trim()) {
      newErrors.domain = 'Domain is required.';
      isValid = false;
    }

    // Batch validation
    if (!localFormData.selectedBatch?.trim()) {
      newErrors.selectedBatch = 'Batch is required.';
      isValid = false;
    }

    // Company Name validation
    if (!localFormData.companyName?.trim()) {
      newErrors.companyName = 'Company Name is required.';
      isValid = false;
    }

    // Drive Date validation
    if (!localFormData.driveDate) {
      newErrors.driveDate = 'Drive Date is required.';
      isValid = false;
    } else {
      // Basic validation: Check if date string can be parsed
      const dateObj = new Date(localFormData.driveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for comparison

      if (isNaN(dateObj.getTime())) { // Invalid date string
         newErrors.driveDate = 'Invalid date format.';
         isValid = false;
      } else if (dateObj < today) {
        newErrors.driveDate = 'Drive Date cannot be in the past.';
        isValid = false;
      }
    }

    // Drive Role (Designation) validation
    if (!localFormData.driveRole?.trim()) {
      newErrors.driveRole = 'Designation is required.';
      isValid = false;
    }

    // Package validation
    if (!localFormData.package?.trim()) {
      newErrors.package = 'Package is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(localFormData);
    } else {
        // Show an antd notification for validation errors with custom style
        api.error({
          message: 'Validation Error',
          description: 'Please fill in all required fields correctly.',
          placement: 'topRight',
          duration: 4,
          showProgress: true,
          pauseOnHover: true,
          // The styling for the icon and colors will be handled by the global CSS in the parent component
        });
    }
  };

  const handleDomainSelect = (domainKey) => {
    setLocalFormData(prev => ({ ...prev, domain: domainKey, selectedBatch: '' }));
    setShowDomainDropdown(false);
    // Clear domain and batch errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.domain;
      delete newErrors.selectedBatch; // Also clear batch error as it's dependent
      return newErrors;
    });
  };

  const handleBatchSelect = (batchNo) => {
    setLocalFormData(prev => ({ ...prev, selectedBatch: batchNo }));
    setShowBatchDropdown(false);
    // Clear batch error
    if (errors.selectedBatch) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.selectedBatch;
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* Include the context holder if we are using the local hook */}
      {contextHolder}
      {/* Add custom styles for antd notifications to match #a17640 - only if using local hook */}
      {!notificationApi && (
        <style jsx global>{`
          /* Custom antd notification styles for #a17640 */
          .ant-notification-notice-success,
          .ant-notification-notice-error,
          .ant-notification-notice-warning,
          .ant-notification-notice-info {
            border-color: #a17640 !important;
          }
          .ant-notification-notice-success .ant-notification-notice-icon,
          .ant-notification-notice-error .ant-notification-notice-icon,
          .ant-notification-notice-warning .ant-notification-notice-icon,
          .ant-notification-notice-info .ant-notification-notice-icon {
            color: #a17640 !important;
          }
          .ant-notification-notice-success .ant-notification-notice-message,
          .ant-notification-notice-error .ant-notification-notice-message,
          .ant-notification-notice-warning .ant-notification-notice-message,
          .ant-notification-notice-info .ant-notification-notice-message {
            color: #a17640 !important;
          }
          .ant-notification-notice-close:hover {
            background-color: #a17640 !important;
            color: white !important;
          }
          .ant-notification-notice-progress-bar {
            background: #a17640 !important;
          }
          /* Custom close icon styling */
          .ant-notification-notice-close {
            transition: all 0.3s ease;
          }
          /* Ensure progress bar container also uses the color */
          .ant-notification-notice-progress {
            background: rgba(230, 169, 1, 0.1) !important; /* Light version of #a17640 */
          }
        `}</style>
      )}
      <div className="w-full max-w-md bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-700">Assign Opportunity</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
            <RiCloseCircleLine size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Domain Dropdown */}
          <div className="relative mb-2" ref={domainDropdownRef}>
            <input
              type="text"
              id="domain"
              readOnly
              placeholder=" "
              value={localFormData.domain ? (domains.find(d => d.key === localFormData.domain)?.label || localFormData.domain) : ''}
              onClick={() => setShowDomainDropdown(!showDomainDropdown)}
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.domain ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer cursor-pointer`}
            />
            <label htmlFor="domain" className={` px-2 text-sm ${errors.domain ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}>
              Select Domain <span className="text-red-500">*</span>
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {localFormData.domain && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDomainSelect(''); // Clear selection
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear domain"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showDomainDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
                {domains && Array.isArray(domains) && domains.length > 0 ? (
                  domains.map((domainObj) => (
                    <div
                      key={domainObj.key}
                      className={`px-4 py-2 cursor-pointer hover:bg-[#e2d5c5] ${localFormData.domain === domainObj.key ? 'bg-[#e8def8]' : ''}`}
                      style={{ color: localFormData.domain === domainObj.key ? '#6750A4' : '#4a4459' }}
                      onClick={() => handleDomainSelect(domainObj.key)}
                    >
                      {domainObj.label}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No domains available</div>
                )}
              </div>
            )}
             {/* Error message for Domain Dropdown */}
             {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
          </div>

          {/* Batch Dropdown */}
          <div className="relative mb-2" ref={batchDropdownRef}>
            <input
              type="text"
              id="selectedBatch"
              readOnly
              placeholder=" "
              value={localFormData.selectedBatch || ''}
              onClick={(e) => {
                if (!localFormData.domain) {
                    // Optionally trigger domain error if clicked without domain
                    setErrors(prev => ({ ...prev, domain: 'Please select a domain first.' }));
                    return;
                }
                setShowBatchDropdown(!showBatchDropdown);
              }}
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.selectedBatch ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer cursor-pointer ${!localFormData.domain ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!localFormData.domain} // Disable if no domain selected
            />
            <label htmlFor="selectedBatch" className={` px-2 text-sm ${errors.selectedBatch ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}>
              Select Batch <span className="text-red-500">*</span>
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {localFormData.selectedBatch && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBatchSelect(''); // Clear selection
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear batch"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}

            {/* Batch Dropdown Options */}
            {showBatchDropdown && localFormData.domain && (
              <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batchNo) => (
                    <div
                      key={batchNo}
                      className={`px-4 py-2 cursor-pointer hover:bg-[#e2d5c5] ${localFormData.selectedBatch === batchNo ? 'bg-[#e8def8]' : ''}`}
                      style={{ color: localFormData.selectedBatch === batchNo ? '#6750A4' : '#4a4459' }}
                      onClick={() => handleBatchSelect(batchNo)}
                    >
                      {batchNo}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No batches found for selected domain
                  </div>
                )}
              </div>
            )}
             {/* Error message for Batch Dropdown */}
             {errors.selectedBatch && <p className="text-red-500 text-xs mt-1">{errors.selectedBatch}</p>}
          </div>

          {/* Company Name */}
          <div className="relative mb-2">
            <input
              type="text"
              id="companyName"
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.companyName ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer`}
              placeholder=" "
              value={localFormData.companyName || ''}
              onChange={handleChange}
            />
            <label htmlFor="companyName" className={` px-2 text-sm  ${errors.companyName ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 pointer-events: none`}>
              Company Name <span className="text-red-500">*</span>
            </label>
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>

          {/* Drive Date - Corrected to use YYYY-MM-DD value for type="date" */}
          <div className="relative mb-2">
            <input
              type="date" // Keep as 'date'
              id="driveDate"
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.driveDate ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer`}
              placeholder=" "
              value={localFormData.driveDate || ''} 
              onChange={handleChange}
            />
            <label htmlFor="driveDate" className={` px-2 text-sm ${errors.driveDate ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}>
              Drive Date <span className="text-red-500">*</span>
            </label>
            {errors.driveDate && <p className="text-red-500 text-xs mt-1">{errors.driveDate}</p>}
          </div>

          {/* Designation (Drive Role) */}
          <div className="relative mb-2">
            <input
              type="text"
              id="driveRole"
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.driveRole ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer`}
              placeholder=" "
              value={localFormData.driveRole || ''}
              onChange={handleChange}
            />
            <label htmlFor="driveRole" className={` px-2 text-sm ${errors.driveRole ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}>
              Designation <span className="text-red-500">*</span>
            </label>
            {errors.driveRole && <p className="text-red-500 text-xs mt-1">{errors.driveRole}</p>}
          </div>

          {/* Package */}
          <div className="relative mb-2">
            <input
              type="text"
              id="package"
              className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${errors.package ? "border-red-500" : "border-gray-400"} appearance-none focus:outline-none focus:border-[#a17640] peer`}
              placeholder=" "
              value={localFormData.package || ''}
              onChange={handleChange}
            />
            <label htmlFor="package" className={` px-2 text-sm ${errors.package ? "text-red-500" : "text-gray-500"} duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}>
              Package <span className="text-red-500">*</span>
            </label>
            {errors.package && <p className="text-red-500 text-xs mt-1">{errors.package}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-[#ece3d8] text-[#4a4459] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#f5f1eb]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-2 rounded-xl text-sm font-medium"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignOpportunityModal;