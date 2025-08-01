"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiPlus,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../context/dataContext";

export default function StudentDataPage() {
  const {
    studentData,
    batchHead,
    addOpportunity,
    batchingvalue,
    getOpportunitiesByDomain,
  } = useDataContext();
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignFormData, setAssignFormData] = useState({
    companyName: "",
    driveDate: "",
    driveRole: "",
    package: "",
    selectedBatch: selectedBatch || "",
  });
  const [assignErrors, setAssignErrors] = useState({});
  const [isAssignFormDirty, setIsAssignFormDirty] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showStudentSelectModal, setShowStudentSelectModal] = useState(false);
  const [studentSelectModelDiscard, setStudentSelectModelDiscard] =
    useState(false);
  const [opportunityDetails, setOpportunityDetails] = useState(null);
  const [filteredBatchStudents, setFilteredBatchStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewOpportunityDetails, setViewOpportunityDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const batchDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const placementDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (opportunityDetails?.selectedBatch) {
      const studentsInBatch = studentData.filter(
        (student) => student.batch === opportunityDetails.selectedBatch
      );
      setFilteredBatchStudents(studentsInBatch);
      setSelectedStudents([]);
    } else {
      setFilteredBatchStudents([]);
      setSelectedStudents([]);
    }
  }, [opportunityDetails, studentData]);

  const batchesNames = useMemo(() => {
    return [...new Set(studentData.map((s) => s.batch))];
  }, [studentData]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (searchInitiated) {
        setCurrentPage(1);
      }
    }
  }, [searchResults]);

  useEffect(() => {
    setCurrentPage(1);
  }, [batchingvalue, batchHead]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
      }
      if (
        placementDropdownRef.current &&
        !placementDropdownRef.current.contains(event.target)
      ) {
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (
      showAssignModal ||
      showStudentSelectModal ||
      showViewModal ||
      showDiscardConfirm ||
      studentSelectModelDiscard
    ) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    }
    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    };
  }, [
    showAssignModal,
    showStudentSelectModal,
    showViewModal,
    showDiscardConfirm,
    studentSelectModelDiscard,
  ]);

  const handleSearch = useCallback(() => {
    const term = searchTerm.trim().toLowerCase();
    const allOpportunities =
      getOpportunitiesByDomain(batchingvalue)?.filter(
        (opportunity) => opportunity.createdDomain === batchHead
      ) || [];
    const sortedOpportunities = [...allOpportunities].sort(
      (a, b) => (b.id || 0) - (a.id || 0)
    );

    if (term) {
      const results = sortedOpportunities.filter((opportunity) =>
        opportunity.companyName.toLowerCase().includes(term)
      );
      setSearchResults(results);
      setSearchInitiated(true);
      setCurrentPage(1);
    } else {
      setSearchResults(sortedOpportunities);
      setSearchInitiated(true);
      setCurrentPage(1);
    }
  }, [searchTerm, batchingvalue, batchHead, getOpportunitiesByDomain]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  const resetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchInitiated(false);
    setCurrentPage(1);
  };

  const handleOpenAssignModal = () => {
    setShowAssignModal(true);
    setAssignFormData({
      companyName: "",
      driveDate: "",
      driveRole: "",
      package: "",
      selectedBatch: selectedBatch || "",
      createdDomain: batchHead || "",
    });
    setAssignErrors({});
    setIsAssignFormDirty(false);
    setShowDiscardConfirm(false);
  };

  const handleAssignFormChange = (e) => {
    const { id, value } = e.target;
    setAssignFormData((prev) => ({ ...prev, [id]: value }));
    if (id === "driveDate") {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) {
        setAssignErrors((prev) => ({
          ...prev,
          driveDate: "The drive date cannot be earlier than today.",
        }));
        return;
      }
    }
    if (assignErrors[id]) {
      setAssignErrors((prev) => ({ ...prev, [id]: "" }));
    }
    setIsAssignFormDirty(true);
  };

  const handleAssignFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    if (!assignFormData.companyName.trim()) {
      errors.companyName = "Company Name is required.";
      isValid = false;
    }
    if (!assignFormData.driveDate) {
      errors.driveDate = "Drive Date is required.";
      isValid = false;
    }
    const today = new Date().toISOString().split("T")[0];
    if (assignFormData.driveDate < today) {
      errors.driveDate = "The drive date cannot be earlier than today.";
      isValid = false;
    }
    if (!assignFormData.driveRole.trim()) {
      errors.driveRole = "Drive Role is required.";
      isValid = false;
    }
    if (!assignFormData.package.trim()) {
      errors.package = "Package is required.";
      isValid = false;
    }
    if (!assignFormData.selectedBatch) {
      errors.selectedBatch = "Please select a batch.";
      isValid = false;
    }

    if (!isValid) {
      setAssignErrors(errors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setOpportunityDetails(assignFormData);
    setShowStudentSelectModal(true);
  };

  const handleCloseAssignModal = () => {
    if (isAssignFormDirty) {
      setShowDiscardConfirm(true);
    } else {
      setShowAssignModal(false);
      setIsAssignFormDirty(false);
      setAssignErrors({});
    }
  };

  const confirmDiscardAssign = () => {
    setShowAssignModal(false);
    setShowDiscardConfirm(false);
    setIsAssignFormDirty(false);
    setAssignErrors({});
  };

  const cancelDiscardAssign = () => {
    setShowDiscardConfirm(false);
  };

  const handleStudentSelect = (bookingId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(bookingId)) {
        return prevSelected.filter((id) => id !== bookingId);
      } else {
        return [...prevSelected, bookingId];
      }
    });
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === filteredBatchStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(
        filteredBatchStudents.map((student) => student.bookingId)
      );
    }
  };

  const selectedStudentDiscard = () => {
    if (selectedStudents.length === 0) {
      setShowStudentSelectModal(false);
      return;
    }
    if (selectedStudents.length > 0) {
      setStudentSelectModelDiscard(true);
      return;
    }
  };

  const handleSaveSelectedStudents = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student.");
      return;
    }
    let domainKey = batchingvalue;
    if (!domainKey && opportunityDetails?.selectedBatch) {
      domainKey = opportunityDetails.selectedBatch;
    }
    if (!domainKey) {
      toast.error(
        "No domain selected. Please select a domain or batch before saving."
      );
      return;
    }
    const existingOpportunities = getOpportunitiesByDomain(batchingvalue) || [];
    const maxId = Math.max(...existingOpportunities.map((o) => o.id || 0), 0);

    const opportunity = {
      id: maxId + 1,
      ...opportunityDetails,
      selectedStudents,
      domain: domainKey,
      createdDomain: batchHead || "",
    };

    addOpportunity(opportunity);
    setShowAssignModal(false);
    setShowStudentSelectModal(false);
    setSelectedStudents([]);
    setOpportunityDetails(null);
    toast.success(
      ` ${selectedStudents.length}  student(s) assigned successfully!`
    );
    resetSearch();
    setCurrentPage(1);
  };

  const handleCloseStudentSelectModal = () => {
    setShowStudentSelectModal(false);
    setSelectedStudents([]);
    setOpportunityDetails(null);
  };

  const handleViewOpportunity = (opportunity) => {
    setViewOpportunityDetails(opportunity);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewOpportunityDetails(null);
  };

  const getFilteredBatches = () => {
    if (batchHead === "Full Stack Development") {
      return batchesNames.filter((batch) => batch.startsWith("FS"));
    } else if (batchHead === "Data Analytics & Science") {
      return batchesNames.filter((batch) =>
        ["DA", "BK", "DM", "DAP", "DV"].includes(batch.substring(0, 2))
      );
    }
    return batchesNames;
  };

  const baseOpportunities =
    getOpportunitiesByDomain(batchingvalue)?.filter(
      (opportunity) => opportunity.createdDomain === batchHead
    ) || [];
  const sortedBaseOpportunities = [...baseOpportunities].sort(
    (a, b) => (b.id || 0) - (a.id || 0)
  );
  const opportunitiesToDisplay = searchInitiated
    ? searchResults
    : sortedBaseOpportunities;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpportunities = opportunitiesToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(opportunitiesToDisplay.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-right" />
      <div className={`flex-1 bg-[#F8FAFD]`} ref={searchContainerRef}>
        <div className="bg-[#F4F3FF] w-full flex flex-col md:flex-row justify-center rounded-xl gap-5 py-6 px-5">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Company Name"
              className="px-2 py-3.5 w-[250px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] cursor-pointer"
            />
            {searchTerm && (
              <button
                onClick={resetSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
          <div>
            <button
              onClick={handleSearch}
              className=" cursor-pointer bg-[#6750A4] hover:bg-[#5a4a8f] text-white px-4 py-4 rounded-xl text-sm font-semibold flex items-center gap-1"
            >
              <FaSearch className="inline-block" /> Search
            </button>
          </div>
          <div>
            <button
              onClick={resetSearch}
              className="cursor-pointer bg-[#E8DEF8] hover:bg-[#d1c3ea] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              <Image
                src="/reset.svg"
                alt="Reset Icon"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              Reset
            </button>
          </div>

          <div>
            <button
              onClick={handleOpenAssignModal}
              className=" cursor-pointer bg-[#6750A4] hover:bg-[#5a4a8f] text-white px-4 py-4 rounded-xl text-sm font-semibold flex items-center gap-1"
            >
              <FiPlus /> Assign
            </button>
          </div>
        </div>
        <div>
          {/* opportunities showing model */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-[-20px] md:mt-4 w-full">
            {currentOpportunities.length > 0 ? (
              currentOpportunities.map((opportunity, index) => (
                <div
                  key={index + indexOfFirstItem} // Use global index for unique key
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mb-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[280px]"
                >
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#6750A4]/5 rounded-bl-full"></div>
                  {/* Company header */}
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 pr-6">
                      {opportunity.companyName}
                    </h2>
                    <div className="bg-[#6750A4]/10 text-[#6750A4] text-xs font-semibold px-2 py-1 rounded-full">
                      #{" "}
                      {opportunitiesToDisplay.length -
                        (indexOfFirstItem + index)}{" "}
                      {/* Display global serial number */}
                    </div>
                  </div>
                  {/* Details grid */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6750A4]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Drive Date</p>
                        <p className="font-medium">{opportunity.driveDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6750A4]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="font-medium">{opportunity.driveRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6750A4]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Package</p>
                        <p className="font-medium">{opportunity.package}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6750A4]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Batch</p>
                        <p className="font-medium">
                          {opportunity.selectedBatch}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* View button */}
                  <button
                    onClick={() => handleViewOpportunity(opportunity)}
                    className="w-full cursor-pointer bg-gradient-to-r from-[#6750A4] to-[#5a4a8f] hover:from-[#5a4a8f] hover:to-[#4d3f7a] text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FiEye className="h-4 w-4" /> View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full w-full py-12">
                <div className="text-center">
                  <div className="inline-block p-4 bg-[#E8DEF8] rounded-full mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-[#6750A4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {searchInitiated && "No Opportunities Found"}
                  </h3>
                  {/* <p className="text-gray-500">
                    {searchInitiated && "There are currently no opportunities available for your domain."}
                  </p> */}
                  {/* {searchInitiated && (
                    <button
                      onClick={resetSearch}
                      className="mt-4 px-4 py-2 bg-[#6750A4] text-white rounded-lg text-sm font-medium hover:bg-[#5a4a8f]"
                    >
                      Clear Search
                    </button>
                  )} */}
                </div>
              </div>
            )}
          </div>

          {/* --- Pagination Controls --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center my-6 space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6750A4] hover:bg-[#E8DEF8]"
                }`}
                aria-label="Previous Page"
              >
                <FiChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show first, last, current, and nearby pages
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-[#6750A4] text-white"
                          : "text-[#6750A4] hover:bg-[#E8DEF8]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                // Show ellipsis for gaps
                else if (
                  (pageNumber === currentPage - 2 && pageNumber > 2) ||
                  (pageNumber === currentPage + 2 &&
                    pageNumber < totalPages - 1)
                ) {
                  return (
                    <span
                      key={`ellipsis-${pageNumber}`}
                      className="px-2 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6750A4] hover:bg-[#E8DEF8]"
                }`}
                aria-label="Next Page"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* --- New Assign Modal --- */}
        {showAssignModal && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={handleCloseAssignModal} // Close on backdrop click
          >
            <div
              className="w-full max-w-md bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up" // Added animation class (define in CSS)
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Assign Opportunity</h2>
                <button
                  onClick={handleCloseAssignModal}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <RiCloseCircleLine size={20} />
                </button>
              </div>
              <form onSubmit={handleAssignFormSubmit}>
                {/* Company Name */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="companyName"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2  ${
                      assignErrors.companyName
                        ? "border-red-500"
                        : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                    placeholder=" "
                    value={assignFormData.companyName}
                    onChange={handleAssignFormChange}
                  />
                  <label
                    htmlFor="companyName"
                    className={`absolute px-2 text-sm  ${
                      assignErrors.companyName
                        ? "text-red-500"
                        : "text-gray-500"
                    } duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Company Name
                  </label>
                  {assignErrors.companyName && (
                    <p className="text-red-500 text-xs mt-1">
                      {assignErrors.companyName}
                    </p>
                  )}
                </div>
                {/* Drive Date */}
                <div className="relative mb-4">
                  <input
                    type="date" // Changed to date type
                    id="driveDate"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2  ${
                      assignErrors.driveDate
                        ? "border-red-500"
                        : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                    placeholder=" " //
                    value={assignFormData.driveDate}
                    onChange={handleAssignFormChange}
                  />
                  <label
                    htmlFor="driveDate"
                    className={`absolute px-2 text-sm  ${
                      assignErrors.driveDate ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Drive Date
                  </label>
                  {assignErrors.driveDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {assignErrors.driveDate}
                    </p>
                  )}
                </div>
                {/* Drive Role */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="driveRole"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2  ${
                      assignErrors.driveRole
                        ? "border-red-500"
                        : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                    placeholder=" "
                    value={assignFormData.driveRole}
                    onChange={handleAssignFormChange}
                  />
                  <label
                    htmlFor="driveRole"
                    className={`absolute px-2 text-sm  ${
                      assignErrors.driveRole ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Drive Role
                  </label>
                  {assignErrors.driveRole && (
                    <p className="text-red-500 text-xs mt-1">
                      {assignErrors.driveRole}
                    </p>
                  )}
                </div>
                {/* Package */}
                <div className="relative mb-4">
                  <input
                    type="text" // Can be text or number depending on format (e.g., "5 LPA")
                    id="package"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2  ${
                      assignErrors.package
                        ? "border-red-500"
                        : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                    placeholder=" "
                    value={assignFormData.package}
                    onChange={handleAssignFormChange}
                  />
                  <label
                    htmlFor="package"
                    className={`absolute px-2 text-sm  ${
                      assignErrors.package ? "text-red-500" : "text-gray-500"
                    } duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Package
                  </label>
                  {assignErrors.package && (
                    <p className="text-red-500 text-xs mt-1">
                      {assignErrors.package}
                    </p>
                  )}
                </div>
                {/* Custom Batch Dropdown for Assign Modal */}
                <div className="relative mb-6" ref={batchDropdownRef}>
                  <input
                    type="text"
                    id="selectedBatch"
                    maxLength={16}
                    placeholder=" "
                    value={assignFormData.selectedBatch}
                    onChange={(e) => {
                      setAssignFormData((prev) => ({
                        ...prev,
                        selectedBatch: e.target.value,
                      }));
                      setShowBatchDropdown(true);
                      // Clear error for batch field
                      if (assignErrors.selectedBatch) {
                        setAssignErrors((prev) => ({
                          ...prev,
                          selectedBatch: "",
                        }));
                      }
                      setIsAssignFormDirty(true);
                    }}
                    onClick={() => setShowBatchDropdown(!showBatchDropdown)}
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2  ${
                      assignErrors.selectedBatch
                        ? "border-red-500"
                        : "border-gray-400"
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="selectedBatch"
                    className={`absolute px-2 text-sm  ${
                      assignErrors.selectedBatch
                        ? "text-red-500"
                        : "text-gray-500"
                    } duration-300 bg-[#F8FAFD] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6`}
                  >
                    Select Batch
                  </label>
                  <FiChevronDown
                    className="absolute top-5 right-3 text-gray-500 pointer-events-none"
                    size={16}
                  />
                  {assignFormData.selectedBatch && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssignFormData((prev) => ({
                          ...prev,
                          selectedBatch: "",
                        }));
                        setShowBatchDropdown(false);
                        setIsAssignFormDirty(true);
                      }}
                      className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      <RiCloseCircleLine size={20} />
                    </button>
                  )}
                  {showBatchDropdown && (
                    <div
                      className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md"
                      style={{
                        maxHeight: batchesNames.length > 5 ? "200px" : "auto",
                        overflowY: batchesNames.length > 5 ? "auto" : "visible",
                      }}
                    >
                      {batchesNames
                        .filter(
                          (batchName) =>
                            !assignFormData.selectedBatch ||
                            batchName
                              .toLowerCase()
                              .includes(
                                assignFormData.selectedBatch.toLowerCase()
                              )
                        )
                        .map((batchName) => (
                          <div
                            key={batchName}
                            tabIndex={0}
                            className={`px-4 py-2 cursor-pointer hover:bg-[#e8def8] flex items-center gap-2`}
                            style={{
                              color:
                                assignFormData.selectedBatch === batchName
                                  ? "#6750A4"
                                  : "#4a4459",
                              backgroundColor:
                                assignFormData.selectedBatch === batchName
                                  ? "#e8def8"
                                  : "transparent",
                            }}
                            onClick={() => {
                              setAssignFormData((prev) => ({
                                ...prev,
                                selectedBatch: batchName,
                              }));
                              setShowBatchDropdown(false);
                              setIsAssignFormDirty(true);
                              // Clear error for batch field
                              if (assignErrors.selectedBatch) {
                                setAssignErrors((prev) => ({
                                  ...prev,
                                  selectedBatch: "",
                                }));
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setAssignFormData((prev) => ({
                                  ...prev,
                                  selectedBatch: batchName,
                                }));
                                setShowBatchDropdown(false);
                                setIsAssignFormDirty(true);
                                if (assignErrors.selectedBatch) {
                                  setAssignErrors((prev) => ({
                                    ...prev,
                                    selectedBatch: "",
                                  }));
                                }
                              }
                            }}
                          >
                            {batchName}
                          </div>
                        ))}
                      {getFilteredBatches().length === 0 && (
                        <div className="px-4 py-2 text-gray-500">
                          No batches found
                        </div>
                      )}
                    </div>
                  )}
                  {assignErrors.selectedBatch && (
                    <p className="text-red-500 text-xs mt-1">
                      {assignErrors.selectedBatch}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={handleCloseAssignModal}
                    className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" // Submit button
                    className="cursor-pointer bg-[#6750a4] text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* --- New Student Selection Modal --- */}
        {showStudentSelectModal && opportunityDetails && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={selectedStudentDiscard} // Close on backdrop click
          >
            <div
              className="w-full max-w-4xl bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up" // Added animation class
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  Select Students for Opportunity
                </h2>
                <button
                  onClick={selectedStudentDiscard}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <RiCloseCircleLine size={20} />
                </button>
              </div>
              {/* Display Opportunity Details */}
              <div className="flex justify-evenly flex-wrap gap-2 items-center mb-4 p-3 bg-[#ECE6F0] rounded">
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold">Company: </span>{" "}
                    {opportunityDetails.companyName}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Date: </span>{" "}
                    {opportunityDetails.driveDate}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Role: </span>{" "}
                    {opportunityDetails.driveRole}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Package: </span>{" "}
                    {opportunityDetails.package}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Batch: </span>{" "}
                    {opportunityDetails.selectedBatch}
                  </p>
                </div>
              </div>
              {/* Student Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto max-h-[60vh]">
                  {" "}
                  {/* Add max height and overflow for scrolling */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          S.No{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Name{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          E-mail{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Phone{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Epic Status{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Attendance{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          <div className="flex flex-row">
                            <div className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Select All
                            </div>{" "}
                            <div className="pt-3">
                              <input
                                type="checkbox"
                                onClick={handleSelectAllStudents}
                                className="h-4 w-4 cursor-pointer text-[#6750A4] border-gray-300 rounded focus:ring-[#6750A4]"
                              />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBatchStudents.length > 0 ? (
                        filteredBatchStudents.map((student, index) => (
                          <tr
                            key={student.bookingId}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {index + 1}{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {student.name}{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {student.email}{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {student.phone}{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {student.epicStatus}{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {" "}
                              {student.attendance}%{" "}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedStudents.includes(
                                  student.bookingId
                                )}
                                onChange={() =>
                                  handleStudentSelect(student.bookingId)
                                }
                                className="h-4 w-4 cursor-pointer text-[#6750A4] border-gray-300 rounded focus:ring-[#6750A4]"
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-4 py-6 text-center text-sm text-gray-500"
                          >
                            No students found for the selected batch.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={selectedStudentDiscard}
                  className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2 rounded-xl text-sm font-medium"
                >
                  {" "}
                  Back
                </button>
                {/* <button
                 onClick={handleSelectAllStudents}
                 className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2 rounded-xl text-sm font-medium"
               >
                 Select All
               </button> */}
                <button
                  onClick={handleSaveSelectedStudents}
                  className="cursor-pointer bg-[#6750a4] text-white px-4 py-2 rounded-xl text-sm font-medium"
                  disabled={selectedStudents.length === 0} // Disable if no students selected
                >
                  Save Selected ({selectedStudents.length})
                </button>
              </div>
            </div>
          </div>
        )}
        {/* --- New View Modal --- */}
        {showViewModal && viewOpportunityDetails && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={handleCloseViewModal} // Close on backdrop click
          >
            <div
              className="w-full max-w-4xl bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up" // Added animation class
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium"> Opportunity Details </h2>
                <button
                  onClick={handleCloseViewModal}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <RiCloseCircleLine size={20} />
                </button>
              </div>
              {/* Display Opportunity Details */}
              <div className="flex justify-evenly gap-2 md:gap-1 flex-wrap items-center mb-4 p-3 bg-[#ECE6F0] rounded">
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Company: </span>{" "}
                    {viewOpportunityDetails.companyName}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Date: </span>{" "}
                    {viewOpportunityDetails.driveDate}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Role: </span>{" "}
                    {viewOpportunityDetails.driveRole}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Package: </span>{" "}
                    {viewOpportunityDetails.package}
                  </p>
                </div>
                <div
                  className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
                >
                  <p className="text-sm p-1">
                    <span className="font-semibold"> Batch: </span>{" "}
                    {viewOpportunityDetails.selectedBatch}
                  </p>
                </div>
              </div>
              {/* Student Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto max-h-[60vh]">
                  {" "}
                  {/* Add max height and overflow for scrolling */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          S.No{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Name{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Email ID{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Phone No{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Epic Status{" "}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {" "}
                          Attendance{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Array.isArray(viewOpportunityDetails.selectedStudents) &&
                      viewOpportunityDetails.selectedStudents.length > 0 ? (
                        viewOpportunityDetails.selectedStudents
                          .slice(0, 8)
                          .map((bookingId, index) => {
                            const student = studentData.find(
                              (s) => s.bookingId === bookingId
                            );
                            if (!student) return null; // Skip if student not found
                            return (
                              <tr key={bookingId} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {index + 1}{" "}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {student.name}{" "}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {student.email}{" "}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {student.phone}{" "}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {student.epicStatus}{" "}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                  {" "}
                                  {student.attendance}%{" "}
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-6 text-center text-sm text-gray-500"
                          >
                            No students assigned to this opportunity.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* --- New Discard Confirmation Modal for Assign --- */}
        {showDiscardConfirm && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={cancelDiscardAssign} // Clicking backdrop cancels
          >
            <div
              className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-medium text-gray-800 mb-2">
                {" "}
                Discard Changes?{" "}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelDiscardAssign}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDiscardAssign}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6750A4] rounded hover:bg-[#675b86]"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
        {/* --- New Discard Confirmation Modal for Assign --- */}
        {studentSelectModelDiscard && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              setStudentSelectModelDiscard(false);
              e.stopPropagation();
            }} // Clicking backdrop cancels
          >
            <div
              className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-medium text-gray-800 mb-2">
                {" "}
                Discard Changes?{" "}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setStudentSelectModelDiscard(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowStudentSelectModal(false);
                    setStudentSelectModelDiscard(false);
                    setSelectedStudents([]);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6750A4] rounded hover:bg-[#675b86]"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
