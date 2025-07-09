"use client";

import { FiEye, FiEdit, FiTrash2, FiMoreVertical, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import { RefreshCcw } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function BatchModel() {

  const [batches, setBatches] = useState([
    { id: 1, batchNo: 'RP31', status: 'Ongoing', startDate: '11 Nov 2024', endDate: '11 May 2025', mode: 'Offline' },
    { id: 2, batchNo: 'RP27', status: 'Completed', startDate: '15 Apr 2024', endDate: '12 Jun 2025', mode: 'Offline' },
    { id: 3, batchNo: 'RP31-B', status: 'Ongoing', startDate: '15 Apr 24', endDate: '09 Feb 2025', mode: 'Online' },
    { id: 4, batchNo: 'RP32', status: 'Ongoing', startDate: '15 Apr 24', endDate: '09 Feb 2025', mode: 'Offline' },
    { id: 5, batchNo: 'RP33', status: 'Completed', startDate: '01 Jan 2024', endDate: '30 Jun 2024', mode: 'Online' },
    { id: 6, batchNo: 'RP34', status: 'Ongoing', startDate: '01 Mar 2024', endDate: '31 Dec 2024', mode: 'Offline' },
    { id: 7, batchNo: 'RP35', status: 'Completed', startDate: '15 Feb 2024', endDate: '15 Aug 2024', mode: 'Online' },
    { id: 8, batchNo: 'RP36', status: 'Ongoing', startDate: '01 May 2024', endDate: '01 Nov 2024', mode: 'Offline' },
    { id: 9, batchNo: 'RP37', status: 'Completed', startDate: '10 Apr 2024', endDate: '10 Oct 2024', mode: 'Online' },
    { id: 10, batchNo: 'RP38', status: 'Ongoing', startDate: '20 Mar 2024', endDate: '20 Sep 2024', mode: 'Offline' }
  ]);

  const [filteredBatches, setFilteredBatches] = useState([]);
  const [activeTab, setActiveTab] = useState('Domain');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mode, setMode] = useState('Off');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showNewBatchModeDropdown, setShowNewBatchModeDropdown] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // New state for batch sections
  const [batchSections, setBatchSections] = useState({
    Domain: { startDate: '', endDate: '' },
    Aptitude: { startDate: '', endDate: '' },
    Communication: { startDate: '', endDate: '' }
  });

  const [newBatch, setNewBatch] = useState({
    batchNo: '',
    status: 'Ongoing',
    mode: 'Offline',
    sections: {
      Domain: { startDate: '', endDate: '' },
      Aptitude: { startDate: '', endDate: '' },
      Communication: { startDate: '', endDate: '' }
    }
  });

  useEffect(() => {
    const ongoing = batches.filter(b => b.status === 'Ongoing').length;
    const completed = batches.filter(b => b.status === 'Completed').length;
    setOngoingCount(ongoing);
    setCompletedCount(completed);
  }, [batches]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const toggleActions = (id) => {
    setShowActions(showActions === id ? null : id);
  };

  const handleAction = (action, batchId) => {
    if (action === 'delete') {
      handleDeleteBatch(batchId);
    } else {
      console.log(`${action} action for batch ${batchId}`);
    }
    setShowActions(null);
  };

  const handleDeleteBatch = (batchId) => {
    // Update the main batches array
    const updatedBatches = batches.filter(batch => batch.id !== batchId);
    setBatches(updatedBatches);

    // Also update the filteredBatches if search is active
    if (searchInitiated) {
      const updatedFilteredBatches = filteredBatches.filter(batch => batch.id !== batchId);
      setFilteredBatches(updatedFilteredBatches);
    }

    // Update counts
    const ongoing = updatedBatches.filter(b => b.status === 'Ongoing').length;
    const completed = updatedBatches.filter(b => b.status === 'Completed').length;
    setOngoingCount(ongoing);
    setCompletedCount(completed);

    console.log('Batch deleted. Updated batches:', updatedBatches);
  };

  const handleSearch = () => {
    let results = batches;

    if (searchTerm) {
      results = results.filter(batch => 
        batch.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (mode && mode !== 'Off') {
      results = results.filter(batch => 
        batch.mode.toLowerCase() === mode.toLowerCase()
      );
    }

    if (startDate) {
      results = results.filter(batch => 
        new Date(batch.startDate) >= new Date(startDate)
      );
    }

    if (endDate) {
      results = results.filter(batch => 
        new Date(batch.endDate) <= new Date(endDate)
      );
    }

    setFilteredBatches(results);
    setSearchInitiated(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setMode('Off');
    setFilteredBatches([]);
    setSearchInitiated(false);
  };

  const handleAddBatch = () => {
    // Validate required fields
    if (!newBatch.batchNo || !newBatch.mode) {
      toast.error('Please fill all required fields');
      return;
    }

    // Validate at least one section has dates
    const hasSectionDates = Object.values(newBatch.sections).some(
      section => section.startDate && section.endDate
    );

    if (!hasSectionDates) {
      toast.error('Please add dates for at least one section');
      return;
    }

    // Note: Date range validation is handled in handleSectionDateChange to prevent duplicate toasts
    // Since invalid dates cannot be saved due to real-time validation, we don't need to re-validate here

    // Create the new batch
    const newBatchEntry = {
      id: batches.length + 1,
      batchNo: newBatch.batchNo,
      status: newBatch.status,
      mode: newBatch.mode,
      startDate: newBatch.sections[activeTab].startDate,
      endDate: newBatch.sections[activeTab].endDate
    };

    const updatedBatches = [...batches, newBatchEntry];
    setBatches(updatedBatches);
    setShowModal(false);

    // Print the current stored data
    console.log('Current batches data:', updatedBatches);

    // Reset form
    setNewBatch({
      batchNo: '',
      status: 'Ongoing',
      mode: 'Offline',
      sections: {
        Domain: { startDate: '', endDate: '' },
        Aptitude: { startDate: '', endDate: '' },
        Communication: { startDate: '', endDate: '' }
      }
    });
  };

  const handleSectionDateChange = (section, field, value) => {
    setNewBatch(prev => {
      const updatedBatch = {
        ...prev,
        sections: {
          ...prev.sections,
          [section]: {
            ...prev.sections[section],
            [field]: value
          }
        }
      };

      // Validate date range when end date is changed
      if (field === 'endDate' && value && updatedBatch.sections[section].startDate) {
        const startDate = new Date(updatedBatch.sections[section].startDate);
        const endDate = new Date(value);

        if (endDate <= startDate) {
          toast.error(`End date must be after start date for ${section} section`);
          return prev; // Don't update state if validation fails
        }
      }

      // Validate date range when start date is changed and end date exists
      if (field === 'startDate' && value && updatedBatch.sections[section].endDate) {
        const startDate = new Date(value);
        const endDate = new Date(updatedBatch.sections[section].endDate);

        if (endDate <= startDate) {
          toast.error(`End date must be after start date for ${section} section`);
          return prev; // Don't update state if validation fails
        }
      }

      return updatedBatch;
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
     <Toaster position='top-right' reverseOrder={false}/>

      <div className={`flex-1 bg-[#eff4ff] overflow-y-auto width-full ${showModal ? 'pointer-events-none' : ''}`}>
        <div className="sticky top-0 flex items-center p-5 justify-between mb-6 bg-white ">
          <h1 className="text-lg font-semibold">Full Stack Development</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#3f2fb4] text-white text-xl px-4 py-2 rounded-lg shadow-sm"
          >
            <span className='bg-white px-1.5 mr-1.5 rounded-full text-[#3f2fb4]'>+</span> Add Batch
          </button>
        </div>
        <div className='p-3'>
          {/* Cards */}
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className="relative bg-[#efe6ff] w-full max-w-md h-36 rounded-[10px] shadow-[0px_10.345px_103.45px_0px_rgba(67,67,67,0.10)]">
              <div className="absolute left-6 top-6 text-black text-4xl font-medium leading-10">{ongoingCount}</div>
              <div className="absolute left-6 top-[84px] text-black text-xl font-normal leading-7">Ongoing Count</div>
              <div className="absolute right-4.5 top-6 w-12 h-9 rounded-full flex items-center justify-center">
                <Image
                  src="/onging count.png"
                  alt="Ongoing Icon"
                  width={30}
                  height={30}
                  className="w-10 h-8"
                />
              </div>
            </div>
            <div className="relative bg-[#efe6ff] w-full max-w-md h-36 rounded-[10px] shadow-[0px_10.345px_103.45px_0px_rgba(67,67,67,0.10)]">
              <div className="absolute left-6 top-6 text-black text-4xl font-medium leading-10">{completedCount}</div>
              <div className="absolute left-6 top-[84px] text-black text-xl font-normal leading-7">Completed Count</div>
              <div className="absolute right-4.5 top-6 w-12 h-9 rounded-full flex items-center justify-center">
                <Image
                  src="/completed count.png"
                  alt="Completed Icon"
                  width={30}
                  height={30}
                  className="w-10 h-7"
                />
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-[#E8DEF8] p-6 rounded-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-3 py-3">
              {/* Batch ID */}
              <div className="relative">
                <input
                  type="text"
                  id="batch-id"
                  className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#E8DEF8] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                  placeholder=" "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label
                  htmlFor="batch-id"
                  className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#E8DEF8] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                  Search by Batch number
                </label>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute top-4 right-3 bg-gray-300 p-1 rounded-full hover:bg-gray-500"
                  >
                    <X size={16} className="text-white" />
                  </button>
                )}
              </div>

              {/* Start Date */}
              <div className="relative">
                <input
                  id="start-date"
                  type='date'
                  value={startDate}
                  className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#E8DEF8] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label
                  htmlFor="start-date"
                  className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#E8DEF8] transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                  Start date
                </label>
              </div>

              {/* Mode Selector */}
              <div className="relative">
                <input
                  type="text"
                  id="mode"
                  className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#E8DEF8] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                  placeholder=" "
                  readOnly
                  value={mode === 'Off' ? '' : mode}
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                />
                <label
                  htmlFor="mode"
                  className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#E8DEF8] transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                  Mode
                </label>
                {mode && mode !== 'Off' && (
                  <button
                    onClick={() => setMode('Off')}
                    className="absolute top-4 right-3 bg-gray-300 p-1 rounded-full hover:bg-gray-500"
                  >
                    <X size={16} className="text-white" />
                  </button>
                )}
                {showModeDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    {['Online', 'Offline'].map((item) => (
                      <div
                        key={item}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setMode(item);
                          setShowModeDropdown(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* End Date */}
              <div className="relative md:col-start-2">
                <input
                  id="end-date"
                  type='date'
                  value={endDate}
                  className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#E8DEF8] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <label
                  htmlFor="end-date"
                  className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#E8DEF8] transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                  End date
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 md:col-start-3 md:justify-end md:pt-29">
                <button
                  onClick={handleReset}
                  className="bg-[#f1ecfb] px-6 py-2 rounded-2xl text-sm text-gray-700 flex items-center gap-1"
                >
                  <RefreshCcw /> Reset
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-[#5e4eff] text-white px-6 py-2 rounded-2xl text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Table - Only shown after search */}
          {searchInitiated && (
            <div className="bg-white rounded-2xl shadow-sm overflow-auto scrollbar-hide">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start - End date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBatches.length > 0 ? (
                    filteredBatches.map((batch, index) => (
                      <tr key={batch.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {batch.batchNo}
                        </td>
                        <td className="px-2 py-1 whitespace-nowrap">
                          <span className={`ml-2 px-5 text-center inline-flex text-xs leading-5 font-semibold rounded-sm
                            ${batch.status === 'Completed' ? 'bg-green-100 text-green-800' : 'px-7 bg-blue-100 text-blue-800'}`}>
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.mode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                          <button
                            onClick={() => toggleActions(batch.id)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            <FiMoreVertical className="h-5 w-5" />
                          </button>
                          {showActions === batch.id && (
                            <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <div className="flex flex-row">
                                <button
                                  onClick={() => handleAction('view', batch.id)}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <FiEye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleAction('edit', batch.id)}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <FiEdit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleAction('delete', batch.id)}
                                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  <FiTrash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No matching batches found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[500px] bg-slate-50 rounded-[10px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Add new batch</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Batch Number Input */}
            <div className="relative mb-6">
              <input
                type="text"
                id="batch-number"
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                placeholder=" "
                value={newBatch.batchNo}
                onChange={(e) => setNewBatch({...newBatch, batchNo: e.target.value})}
                required
              />
              <label
                htmlFor="batch-number"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Batch Number
              </label>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-gray-200 rounded-xl p-1 mb-6 relative">
              {/* Moving background indicator */}
              <div
                className={`absolute top-1 bottom-1 bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                  activeTab === 'Domain' ? 'left-1 w-[calc(33.33%-0.5rem)]' :
                  activeTab === 'Aptitude' ? 'left-[calc(33.33%+0.25rem)] w-[calc(33.33%-0.5rem)]' :
                  'left-[calc(66.66%+0.25rem)] w-[calc(33.33%-0.5rem)]'
                }`}
              />
              {/* Tab buttons */}
              <button
                onClick={() => setActiveTab('Domain')}
                className={`flex-1 py-2 text-sm font-medium relative z-10 ${
                  activeTab === 'Domain' ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                Domain
              </button>
              <button
                onClick={() => setActiveTab('Aptitude')}
                className={`flex-1 py-2 text-sm font-medium relative z-10 ${
                  activeTab === 'Aptitude' ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                Aptitude
              </button>
              <button
                onClick={() => setActiveTab('Communication')}
                className={`flex-1 py-2 text-sm font-medium relative z-10 ${
                  activeTab === 'Communication' ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                Communication
              </button>
            </div>

            {/* Date Range Section */}
            <div className="bg-white rounded-3xl p-4 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-500">Select date</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-normal">Enter dates</h3>
                <button className="text-gray-500">
                  <FiCalendar size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Start Date */}
                <div className="relative">
                  <input
                    type="date"
                    id={`${activeTab.toLowerCase()}-start-date`}
                    className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                    placeholder=" "
                    value={newBatch.sections[activeTab].startDate}
                    onChange={(e) => handleSectionDateChange(activeTab, 'startDate', e.target.value)}
                  />
                  <label
                    htmlFor={`${activeTab.toLowerCase()}-start-date`}
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                  >
                    Start date
                  </label>
                </div>
                {/* End Date */}
                <div className="relative">
                  <input
                    type="date"
                    id={`${activeTab.toLowerCase()}-end-date`}
                    className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                    placeholder=" "
                    value={newBatch.sections[activeTab].endDate}
                    onChange={(e) => handleSectionDateChange(activeTab, 'endDate', e.target.value)}
                  />
                  <label
                    htmlFor={`${activeTab.toLowerCase()}-end-date`}
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                  >
                    End date
                  </label>
                </div>
              </div>
            </div>

            {/* Mode Selector */}
            {/* Mode Selector in Add Batch Modal */}
            <div className="relative mb-6">
              <input
                type="text"
                id="new-mode"
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-white rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                placeholder=" "
                readOnly
                value={newBatch.mode === 'Off' ? '' : newBatch.mode}
                onClick={() => setShowNewBatchModeDropdown(!showNewBatchModeDropdown)}
                required
              />
              <label
                htmlFor="new-mode"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-white transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Mode
              </label>
              {newBatch.mode && newBatch.mode !== 'Off' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewBatch({...newBatch, mode: 'Off'});
                  }}
                  className="absolute top-4 right-3 bg-gray-300 p-1 rounded-full hover:bg-gray-500"
                >
                  <X size={16} className="text-white" />
                </button>
              )}
              {showNewBatchModeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
                  {['Online', 'Offline'].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setNewBatch({...newBatch, mode: item});
                        setShowNewBatchModeDropdown(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6750A4] px-4 py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBatch}
                className="bg-[#5e4eff] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
                disabled={!newBatch.batchNo || !newBatch.mode || 
                  !Object.values(newBatch.sections).some(section => section.startDate && section.endDate)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}