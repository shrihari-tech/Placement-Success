"use client";

import { useState, useEffect, useCallback } from 'react';
import { useDataContext } from '../context/dataContext';
import { FiEye, FiEdit, FiTrash2, FiChevronDown } from 'react-icons/fi';
import { RiCloseCircleLine } from "react-icons/ri";
import { Toaster, toast } from 'sonner';
import Image from 'next/image';

export default function DomainManagement() {
  const { studentData , domains, batches, students, performanceStatuses , batchHead} = useDataContext();
  const [activeTab, setActiveTab] = useState('Student Data');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('');
  const [selectedPerformance, setSelectedPerformance] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter batches based on selected domain
  const domainBatches = selectedDomain 
    ? batches.filter(batch => batch.domain === selectedDomain)
    : [];

  // Reset all filters
  const handleReset = () => {
    setSelectedDomain('');
    setSelectedBatch('');
    setSelectedStatus('');
    setSelectedPlacement('');
    setSelectedPerformance('');
    setSearchInitiated(false);
    setFilteredStudents([]);
  };

  // Handle search
  const handleSearch = useCallback(() => {
    if (!selectedDomain) {
      toast.error('Please select a domain first');
      return;
    }

    let results = students.filter(student => student.domain === selectedDomain);

    if (selectedBatch) {
      results = results.filter(student => student.batch === selectedBatch);
    }

    if (selectedStatus) {
      results = results.filter(student => student.status === selectedStatus);
    }

    if (selectedPlacement) {
      results = results.filter(student => student.placement === selectedPlacement);
    }

    if (selectedPerformance) {
      results = results.filter(student => student.performance === selectedPerformance);
    }

    setFilteredStudents(results);
    setSearchInitiated(true);
    toast.success(`${results.length} students found`);
  }, [selectedDomain, selectedBatch, selectedStatus, selectedPlacement, selectedPerformance, students]);

  // Handle view student action
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  // Handle edit student action
  const handleEditStudent = (student) => {
    toast.info(`Edit student ${student.name}`);
  };

  // Handle delete student action
  const handleDeleteStudent = (student) => {
    toast.warning(`Delete student ${student.name}`);
  };

  // Performance badge color
  const getPerformanceBadgeColor = (performance) => {
    switch(performance) {
      case 'Excellent': return 'bg-purple-100 text-purple-800';
      case 'Proficient': return 'bg-blue-100 text-blue-800';
      case 'Ideal': return 'bg-green-100 text-green-800';
      case 'Capable': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen mt-16 md:mt-1">
      <Toaster position="top-right" />
      
      {/* Main content */}
      <div className={`px-3 pt-20 flex-1 bg-[#F8FAFD] mb-12 ${showStudentModal ? 'pointer-events-none' : ''}`}>
        
        {/* Header with domain name */}
        <div className="fixed top-15 md:top-0 ms-[-19px] border-b-2 border-gray-300 flex items-center justify-between bg-white w-full py-9 px-4 z-20">
          <h1 className="fixed pl-3 text-xl text-gray-800 font-semibold">
            Domain Management - {batchHead || 'Select a Domain'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-16 mb-6">
          <div className="flex bg-[#ECE6F0] rounded-xl p-1 mb-4 relative">
            <div
              className={`absolute top-1 bottom-1 bg-[#F8FAFD] rounded-lg shadow-sm transition-all
                duration-300 ease-in-out z-0
                ${
                  activeTab === 'Student Data'
                    ? 'left-1 w-[calc(25%-0.5rem)]'
                    : activeTab === 'Scores'
                    ? 'left-[calc(25%+0.25rem)] w-[calc(25%-0.5rem)]'
                    : activeTab === 'Opportunities'
                    ? 'left-[calc(50%+0.25rem)] w-[calc(25%-0.5rem)]'
                    : 'left-[calc(75%+0.25rem)] w-[calc(25%-0.5rem)]'
                }`}
            />
            {['Student Data', 'Scores', 'Opportunities', 'Batches'].map((tab) => (
              <span
                key={tab}
                className={`flex-1 items-center text-gray-800 text-center py-2 text-xs font-semibold select-none cursor-pointer relative z-10
                  ${activeTab === tab ? 'text-indigo-600' : 'text-black'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Search Section */}
        {activeTab === 'Student Data' && (
          <div id="search-container" className="bg-[#F4F3FF] py-3 rounded-xl" tabIndex={0}>
            <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
              
              {/* Domain Dropdown */}
              <div className="relative">
                <input
                  type="text"
                  id="domain-select"
                  className={`block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                  placeholder=" "
                  readOnly
                  value={selectedDomain}
                  onClick={() => document.getElementById('domain-dropdown').classList.toggle('hidden')}
                />
                <label htmlFor="domain-select" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Domain
                </label>
                {selectedDomain && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDomain('');
                      setSelectedBatch('');
                    }}
                    className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                  >
                    <RiCloseCircleLine size={20} />
                  </button>
                )}
                <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                <div id="domain-dropdown" className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-md hidden">
                  {/* {domains.map((domain) => (
                    <div
                      key={domain}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedDomain(domain);
                        setSelectedBatch('');
                        document.getElementById('domain-dropdown').classList.add('hidden');
                      }}
                    >
                      {domain}
                    </div>
                  ))} */}
                </div>
              </div>

              {/* Batch Dropdown (only visible when domain is selected) */}
              {selectedDomain && (
                <div className="relative">
                  <input
                    type="text"
                    id="batch-select"
                    className={`block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                    placeholder=" "
                    readOnly
                    value={selectedBatch}
                    onClick={() => document.getElementById('batch-dropdown').classList.toggle('hidden')}
                  />
                  <label htmlFor="batch-select" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                    Batch
                  </label>
                  {selectedBatch && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBatch('');
                      }}
                      className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                      <RiCloseCircleLine size={20} />
                    </button>
                  )}
                  <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                  <div id="batch-dropdown" className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-md hidden">
                    {domainBatches.map((batch) => (
                      <div
                        key={batch.id}
                        tabIndex={0}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedBatch(batch.batchNo);
                          document.getElementById('batch-dropdown').classList.add('hidden');
                        }}
                      >
                        {batch.batchNo}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Dropdown */}
              <div className="relative">
                <input
                  type="text"
                  id="status-select"
                  className={`block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                  placeholder=" "
                  readOnly
                  value={selectedStatus}
                  onClick={() => document.getElementById('status-dropdown').classList.toggle('hidden')}
                />
                <label htmlFor="status-select" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Status
                </label>
                {selectedStatus && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStatus('');
                    }}
                    className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                  >
                    <RiCloseCircleLine size={20} />
                  </button>
                )}
                <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                <div id="status-dropdown" className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-md hidden">
                  {['Completed', 'Ongoing'].map((status) => (
                    <div
                      key={status}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedStatus(status);
                        document.getElementById('status-dropdown').classList.add('hidden');
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Dropdown */}
              <div className="relative">
                <input
                  type="text"
                  id="placement-select"
                  className={`block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                  placeholder=" "
                  readOnly
                  value={selectedPlacement}
                  onClick={() => document.getElementById('placement-dropdown').classList.toggle('hidden')}
                />
                <label htmlFor="placement-select" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  Placement
                </label>
                {selectedPlacement && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlacement('');
                    }}
                    className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                  >
                    <RiCloseCircleLine size={20} />
                  </button>
                )}
                <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                <div id="placement-dropdown" className="absolute z-10 w-full bg-[#f3edf7] border border-gray-300 rounded-md shadow-md hidden">
                  {['Placed', 'Not Placed', 'Yet to be Placed', 'Not Interested'].map((placement) => (
                    <div
                      key={placement}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedPlacement(placement);
                        document.getElementById('placement-dropdown').classList.add('hidden');
                      }}
                    >
                      {placement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Dropdown */}
              
              {/* Search and Reset Buttons */}
              <div className="flex gap-2 md:justify-end">
                <button
                  onClick={handleSearch}
                  className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-5 py-4 rounded-xl text-sm font-semibold"
                >
                  View Students
                </button>
                <button
                  onClick={handleReset}
                  className="cursor-pointer bg-[#f1ecfb] hover:bg-[#E8DEF8] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  <Image src='/reset.svg' alt="Reset Icon" width={20} height={20} className="object-contain" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Table (only visible after search) */}
        {searchInitiated && (
          <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">S.No</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">EPIC ID</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Batch</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Performance</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Placement</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-[#e1cfff] hover:text-[#4005a0]">
                    <td className="px-4 text-gray-700 text-center py-3 text-sm whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.name}</td>
                    <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.email}</td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{student.bookingId}</td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{student.epicId}</td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{student.batch}</td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      {student.status === 'Completed' ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Ongoing
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      <span className={`${getPerformanceBadgeColor(student.performance)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                        {student.performance}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      {student.placement === 'Placed' ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Placed
                        </span>
                      ) : student.placement === 'Not Placed' ? (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Not Placed
                        </span>
                      ) : student.placement === 'Yet to be Placed' ? (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Yet to be Placed
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Not Interested
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="cursor-pointer p-1 hover:bg-gray-100 rounded text-black"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other Tabs Content */}
        {activeTab === 'Scores' && (
          <div className="bg-white rounded-2xl shadow-sm mt-6 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Scores Content</h2>
            <p className="text-gray-600">This section will display student scores and performance metrics.</p>
          </div>
        )}

        {activeTab === 'Opportunities' && (
          <div className="bg-white rounded-2xl shadow-sm mt-6 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Opportunities Content</h2>
            <p className="text-gray-600">This section will display job opportunities and placement information.</p>
          </div>
        )}

        {activeTab === 'Batches' && (
          <div className="bg-white rounded-2xl shadow-sm mt-6 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Batches Content</h2>
            <p className="text-gray-600">This section will display batch information and management tools.</p>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowStudentModal(false)}
        >
          <div
            className="w-[650px] bg-[#F8FAFD] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Student Details</h2>
              <button
                onClick={() => setShowStudentModal(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 font-sans text-gray-800">
              {/* Basic Info */}
              <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
                <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Basic Information</h3>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Name:</span> {selectedStudent.name}
                </p>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Email:</span> {selectedStudent.email}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold">Phone:</span> {selectedStudent.phone}
                </p>
              </div>

              {/* Academic Info */}
              <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
                <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Academic Information</h3>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Domain:</span> {selectedStudent.domain}
                </p>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Batch:</span> {selectedStudent.batch}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold">Status:</span> {selectedStudent.status}
                </p>
              </div>

              {/* IDs */}
              <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
                <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Identification</h3>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Booking ID:</span> {selectedStudent.bookingId}
                </p>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">EPIC ID:</span> {selectedStudent.epicId}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold">Student ID:</span> {selectedStudent.id}
                </p>
              </div>

              {/* Performance Info */}
              <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
                <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Performance Information</h3>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Status:</span> 
                  <span className={`ml-2 ${getPerformanceBadgeColor(selectedStudent.performance)} px-2.5 py-0.5 rounded`}>
                    {selectedStudent.performance}
                  </span>
                </p>
                <p className="text-base font-medium text-gray-600 mb-2">
                  <span className="font-bold">Placement:</span> {selectedStudent.placement}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowStudentModal(false)}
                className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}