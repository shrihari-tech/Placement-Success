'use client';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const ViewOpportunityDetailsModal = ({ isOpen, onClose, opportunityData, allStudentData }) => {
  if (!isOpen || !opportunityData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  // --- Corrected getStudentData function ---
  const getStudentData = (bookingId) => {
    // If it's already a full student object (unlikely from current save logic, but safe)
    if (typeof bookingId === 'object' && bookingId !== null && bookingId.bookingId) {
      return bookingId;
    }

    // If it's a string or number (booking ID), find the student in the passed allStudentData
    if (typeof bookingId === 'string' || typeof bookingId === 'number') {
      // Use find with safe string comparison to handle potential type differences
      // .trim() handles accidental whitespace
      const student = allStudentData?.find(
        (s) => String(s.bookingId).trim() === String(bookingId).trim()
      );

      if (student) {
        return student;
      }
    }

    // Fallback if student not found or bookingId is invalid
    // Use the bookingId itself for display if available
    const fallbackId = (typeof bookingId === 'string' || typeof bookingId === 'number') ? bookingId : "unknown";
    return {
      // bookingId: fallbackId,
      // name: "N/A",
      // email: "N/A",
      // phone: "N/A",
      // epicStatus: "N/A",
      // attendance: "N/A"
      bookingId: fallbackId,
      name: bookingId.name || "N/A",
      email: bookingId.email || "N/A",
      phone: bookingId.phone || "N/A",
      epicStatus: bookingId.epicStatus || "N/A",
      attendance: bookingId.attendance || "N/A"

    };
  };

  // Create array of student objects for display
  const studentsToDisplay = opportunityData.selectedStudents?.map(getStudentData) || [];
  console.log("Selected Students:", opportunityData.selectedStudents);
console.log("All Student Data:", allStudentData);


  // --- Optional Debug logging (remove in production) ---
  // if (isOpen && opportunityData) {
  //   console.log("Opportunity Data:", opportunityData);
  //   console.log("allStudentData length (in Modal):", allStudentData?.length);
  //   console.log("Selected Students IDs (in Modal):", opportunityData.selectedStudents);
  //   console.log("Students to Display (in Modal):", studentsToDisplay);
  //   if (studentsToDisplay.length > 0) {
  //     console.log("First student resolved (in Modal):", studentsToDisplay[0]);
  //   }
  // }
  // console.log("allStudentData sample (in Modal):", allStudentData?.slice(0, 5));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Opportunity Details</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
            <RiCloseCircleLine size={24} />
          </button>
        </div>

        {/* Opportunity Details - Purple Theme */}
        <div className="flex justify-evenly gap-2 md:gap-1 flex-wrap items-center mb-6 p-3 bg-[#ECE6F0] rounded">
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Company: </span> {opportunityData.companyName}
            </p>
          </div>
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Date: </span> {formatDate(opportunityData.driveDate)}
            </p>
          </div>
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Role: </span> {opportunityData.driveRole}
            </p>
          </div>
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Package: </span> {opportunityData.package}
            </p>
          </div>
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Batch: </span> {opportunityData.selectedBatch}
            </p>
          </div>
          <div className="bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition">
            <p className="text-sm p-1">
              <span className="font-semibold">Domain: </span> {opportunityData.domain}
            </p>
          </div>
        </div>

        {/* Students Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Students ({studentsToDisplay.length})</h3>
          {studentsToDisplay.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto max-h-[60vh]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        S.No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Email ID
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Phone No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Epic Status
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsToDisplay.map((student, index) => (
                      <tr key={student.bookingId || index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {student.name}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {student.email}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {student.phone}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {student.epicStatus}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                          {student.attendance !== undefined ? `${student.attendance}%` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No students selected for this opportunity</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOpportunityDetailsModal;