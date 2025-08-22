// placementOpHead/tl/components/tlCardGrid.js
"use client";
import React, { useState, useMemo } from "react";
import TLCard from "./tlCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TLCardGrid = ({ teamLeaders, onViewDetails }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Match opportunities

  // Calculate total pages and current items using useMemo for performance
  // teamLeaders is already sorted in TLPage (newest first)
  const { totalPages, currentTLs, totalTLs } = useMemo(() => {
    const total = teamLeaders.length;
    const totalPagesCount = Math.ceil(total / itemsPerPage);

    // Calculate indices for slicing
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the array to get items for the current page
    const currentItems = teamLeaders.slice(indexOfFirstItem, indexOfLastItem);

    return {
      totalPages: totalPagesCount,
      currentTLs: currentItems,
      totalTLs: total,
    };
  }, [teamLeaders, currentPage, itemsPerPage]); // Added itemsPerPage to dependencies

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset to first page when teamLeaders change (e.g., after delete/create)
  // Use a ref to track previous length to avoid unnecessary resets
  const prevLengthRef = React.useRef(teamLeaders.length);
  React.useEffect(() => {
    // Only reset if the number of items actually changed (e.g., add/delete)
    // This prevents resetting on initial sort or re-renders with same data
    if (teamLeaders.length !== prevLengthRef.current) {
      setCurrentPage(1);
      prevLengthRef.current = teamLeaders.length;
    }
    // If we are on a page that no longer exists (e.g., deleted last item on page 2),
    // go to the last valid page.
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [teamLeaders.length, totalPages, currentPage]); // Depend on length and totalPages

  if (!teamLeaders || teamLeaders.length === 0) {
    return (
      <div className="col-span-full w-full py-12">
        <div className="text-center">
          <div className="inline-block p-4 bg-[#FAEFF1] rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[#CD5E77]"
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
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No Team Leaders Found
          </h3>
          <p className="text-gray-500">
            Get started by creating a new Team Leader.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* TL Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 w-full">
        {currentTLs.map((tl, index) => {
          // --- Calculate Serial Number in Descending Order ---
          // For descending order (1 = newest):
          // Serial Number = Total Items - ( (Current Page - 1) * Items Per Page + Index )
          const globalIndex =
            totalTLs - ((currentPage - 1) * itemsPerPage + index);
          // --- End of Serial Number Calculation ---
          return (
            <TLCard
              key={tl.id}
              teamLeader={tl}
              onViewDetails={onViewDetails}
              serialNumber={globalIndex} // Pass the descending serial number
            />
          );
        })}
      </div>

      {/* Pagination Controls - Match opportunities style */}
      {/* Ensure totalPages > 1 to show pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-6 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#cd5e77] hover:bg-[#f0ced6]" // Match TL color scheme
            }`}
            aria-label="Previous Page"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            // Show first, last, current, and nearby pages (similar logic to opportunities)
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentPage === pageNumber
                      ? "bg-[#cd5e77] text-white" // Active page
                      : "text-[#cd5e77] hover:bg-[#f0ced6]" // Inactive page
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            // Show ellipsis for gaps
            else if (
              (pageNumber === currentPage - 2 && pageNumber > 2) ||
              (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
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
                : "text-[#cd5e77] hover:bg-[#f0ced6]" // Match TL color scheme
            }`}
            aria-label="Next Page"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TLCardGrid;
