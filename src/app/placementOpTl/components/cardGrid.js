// placementOpTl/components/CardGrid.js
'use client';
import React, { useState, useMemo } from 'react';
import Card from './card';

const CardGrid = ({ items, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
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

  if (items.length === 0) {
    return (
      <div className="col-span-full w-full py-12 text-center">
        <div className="inline-block p-4 bg-[#fff2cc] rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#e6a901]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Entries Found</h3>
        <p className="text-gray-500">Get started by adding a new entry.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 w-full">
        {currentItems.map((item, index) => {
          const globalIndex = totalItems - ((currentPage - 1) * itemsPerPage + index);
          return (
            <Card
              key={item.id || index}
              data={item}
              onViewDetails={onViewDetails}
              serialNumber={globalIndex}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center my-6 space-x-2">
          <button onClick={handlePrev} disabled={currentPage === 1} className="p-2 rounded-full text-[#e6a901] hover:bg-[#fff2cc]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer px-3 py-1 rounded-md text-sm ${currentPage === page ? 'bg-[#e6a901] text-white' : 'text-[#e6a901] hover:bg-[#fff2cc]'}`}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2 rounded-full text-[#e6a901] hover:bg-[#fff2cc]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardGrid;