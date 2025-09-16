'use client';

import React, { useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const SelectStudentsModal = ({
  isOpen,
  onClose,
  opportunityDetails,
  filteredStudents,
  selectedStudents,
  setSelectedStudents,
  onSave,
}) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Update selectAllChecked state when filteredStudents or selectedStudents change
  useEffect(() => {
    if (filteredStudents && filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [filteredStudents, selectedStudents]);

  if (!isOpen || !opportunityDetails) return null;

  const handleSelectAllStudents = () => {
    if (selectAllChecked) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.bookingId));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleStudentSelect = (bookingId) => {
    setSelectedStudents(prevSelected =>
      prevSelected.includes(bookingId)
        ? prevSelected.filter(id => id !== bookingId)
        : [...prevSelected, bookingId]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-lg font-medium text-gray-700">Select Students for Opportunity</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
            <RiCloseCircleLine size={20} />
          </button>
        </div>

        {/* Opportunity Details Header */}
        <div className="flex justify-evenly gap-2 md:gap-1 flex-wrap items-center mb-4 p-3 bg-[#fff9e6] rounded flex-shrink-0">
          <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700">Company:</span> <span className='text-gray-700'>{opportunityDetails.companyName}</span></p>
          </div>
          <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700">Date:</span> <span className='text-gray-700'>{formatDate(opportunityDetails.driveDate)}</span></p>
          </div>
          <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700 ">Designation:</span> <span className='text-gray-700'>{opportunityDetails.driveRole}</span></p>
          </div>
          <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700">Package:</span> <span className='text-gray-700'>{opportunityDetails.package}</span></p>
          </div>
           <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700">Domain:</span> <span className='text-gray-700'>{opportunityDetails.domain}</span></p>
          </div>
          <div className={`bg-[#ece3d8] rounded-md border-t-3 border-[#a17640] shadow p-1 md:p-2`}>
            <p className="text-sm p-1"><span className="font-semibold text-gray-700">Batch:</span> <span className='text-gray-700'>{opportunityDetails.selectedBatch}</span></p>
          </div>
        </div>

        {/* Student Table - Scrollable Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto max-h-[40vh] flex-1">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">S.No</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">E-mail</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Epic Status</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Select All</span>
                      <input
                        type="checkbox"
                        checked={selectAllChecked}
                        onChange={handleSelectAllStudents}
                        className="h-4 w-4 cursor-pointer text-[#a17640] border-gray-300 rounded focus:ring-[#a17640]"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents && filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.bookingId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.name}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.email}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.phone}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.epicStatus}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.attendance !== undefined ? `${student.attendance}%` : 'N/A'}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.bookingId)}
                          onChange={() => handleStudentSelect(student.bookingId)}
                          className="h-4 w-4 cursor-pointer text-[#a17640] border-gray-300 rounded focus:ring-[#a17640]"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-sm text-gray-500">
                      No students found for this domain and batch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 flex-shrink-0">
          <div className="text-sm text-gray-600">
            {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer bg-[#ece3d8] text-[#4a4459] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#ffebb3]"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-2 rounded-xl text-sm font-medium"
              disabled={selectedStudents.length === 0}
            >
              Save Selected ({selectedStudents.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectStudentsModal;