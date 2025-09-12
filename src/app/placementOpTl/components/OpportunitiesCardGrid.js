'use client';
import React, { useState, useMemo } from 'react';
import OpportunitiesCard from './OpportunitiesCard';
import ViewOpportunityDetailsModal from './ViewOpportunityDetailsModal';

const OpportunitiesCardGrid = ({ items, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const itemsPerPage = 6;

  const { totalPages, currentItems, totalItems } = useMemo(() => {
    const total = items.length;
    const totalPagesCount = Math.ceil(total / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const current = items.slice(indexOfFirst, indexOfLast);
    return { totalPages: totalPagesCount, currentItems: current, totalItems: total };
  }, [items, currentPage]);

  const handlePageChange = (num) => setCurrentPage(num);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleViewDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setViewModalOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="col-span-full w-full py-8 sm:py-12 text-center">
        <div className="inline-block p-3 sm:p-4 bg-[#fff2cc] rounded-full mb-3 sm:mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-[#e6a901]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">No Entries Found</h3>
        <p className="text-sm sm:text-gray-500">Get started by creating a new entry.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 w-full">
        {currentItems.map((item, index) => {
          const globalIndex = totalItems - ((currentPage - 1) * itemsPerPage + index);
          return (
            <OpportunitiesCard
              key={item.id || item.bookingId || index}
              data={item}
              onViewDetails={handleViewDetails}
              serialNumber={globalIndex}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-4 sm:my-6 space-x-1 sm:space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded-full text-[#e6a901] hover:bg-[#fff2cc] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm ${currentPage === page ? 'bg-[#e6a901] text-white' : 'text-[#e6a901] hover:bg-[#fff2cc]'}`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={`ellipsis-${page}`} className="px-1 sm:px-2 py-1 text-[#e6a901] text-xs sm:text-sm">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded-full text-[#e6a901] hover:bg-[#fff2cc] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* View Details Modal */}
      <ViewOpportunityDetailsModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        opportunityData={selectedOpportunity}
      />
    </div>
  );
};

export default OpportunitiesCardGrid;