  "use client";

  import { FiEye, FiEdit, FiTrash2, FiMoreVertical, FiCalendar, FiChevronDown } from 'react-icons/fi';
  import Image from 'next/image';
  import { Toaster, toast } from 'sonner';
  import { X } from 'lucide-react';
  import { RiCloseCircleLine } from "react-icons/ri";
  import React, { useState, useEffect} from 'react';
  import { useDataContext } from '../context/dataContext';
  import { useRef,useCallback } from "react";

  // Inside your component

  export default function BatchModel() {
    const searchContainerRef = useRef(null);

      const [batches, setBatches] = useState([]);
      const [filteredBatches, setFilteredBatches] = useState([]);
      const [activeTab, setActiveTab] = useState('Domain');
      const [searchInitiated, setSearchInitiated] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [startDate, setStartDate] = useState('');
      const [addModelError, setAddModelError] = useState({});
      const [endDate, setEndDate] = useState('');
      const [mode, setMode] = useState('Off');
      const [showModeDropdown, setShowModeDropdown] = useState(false);
      const [showNewBatchModeDropdown, setShowNewBatchModeDropdown] = useState(false);
      const [showActions, setShowActions] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showEditConfirmationModal, setShowEditConfirmationModal] = useState(false);

      const [showEditModal , setShowEditModel] = useState(false);
      const [editBatchData, setEditBatchData] = useState(null);
      const [showViewModal, setShowViewModal] = useState(false);
      const [infoTab, setInfoTab] = useState('Basic Info');
      const [selectedBatch, setSelectedBatch] = useState(null);

      const [errors, setErrors] = useState({}); 
        const [hasErrors, setHasErrors] = useState(false);
  const [initialEditBatchData, setInitialEditBatchData] = useState(null);   

      const [batchNameError, setBatchNameError] = useState(false);

      const [batchToDelete, setBatchToDelete] = useState(null);
      const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');
      const [deleteError, setDeleteError] = useState('');
      const [ongoingCount, setOngoingCount] = useState(0);
      const [completedCount, setCompletedCount] = useState(0);
      const { batchHead, batchData, addBatch, updateBatch, deleteBatch } = useDataContext();
      const [formErrors, setFormErrors] = useState({
          batchNo: '',
          mode: '',
          sections: {
              Domain: '',
              Aptitude: '',
              Communication: ''
          }
      });

        const todayISO = new Date().toISOString().split("T")[0];

  const validateEdit = () => {
    if (!editBatchData) return false;
    
    const todayISO = new Date().toISOString().split("T")[0];
    const e = {};
    let hasErrors = false;

    // Batch name validation
    if (!editBatchData.batchNo.trim()) {
      e.batchNo = "Batch name is required";
      hasErrors = true;
    } else if (batches.some(b => 
      b.id !== editBatchData.id && 
      b.batchNo.trim().toLowerCase() === editBatchData.batchNo.trim().toLowerCase()
    )) {
      e.batchNo = "This batch number already exists";
      hasErrors = true;
    }

    // Date validation for each section
    ["Domain", "Aptitude", "Communication"].forEach((sec) => {
      const s = editBatchData.sections?.[sec] || {};
      const path = `sections.${sec}`;
      
      if (!s.startDate) {
        e[`${path}.startDate`] = "Start date required";
        hasErrors = true;
      }
      
      if (!s.endDate) {
        e[`${path}.endDate`] = "End date required";
        hasErrors = true;
      }

      if (s.startDate && s.endDate) {
        const startDate = new Date(s.startDate);
        const endDate = new Date(s.endDate);
        
        if (startDate.getTime() === endDate.getTime()) {
          e[`${path}.endDate`] = "End date cannot be same as start date";
          hasErrors = true;
        } else if (endDate < startDate) {
          e[`${path}.endDate`] = "End date cannot be before start date";
          hasErrors = true;
        }
        
        // if (startDate < new Date(todayISO)) {
        //   e[`${path}.startDate`] = "Start date cannot be earlier than today";
        //   hasErrors = true;
        // }
      }
    });

    setErrors(e);
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleChange = (path, value) => {
    const newData = JSON.parse(JSON.stringify(editBatchData)); // clone current state
    path.split(".").reduce((obj, key, idx, arr) => {
      if (idx === arr.length - 1) obj[key] = value;
      else obj[key] = obj[key] || {};
      return obj[key];
    }, newData);

    // Update state
    setEditBatchData(newData);

    // Inline validation using the updated data
    const newErrors = { ...errors };
    let hasErrors = false;

    // validate just this field
    const seg = path.split(".");
    const sec = seg[1];
    const field = seg.at(-1);

    if (path === "batchNo") {
      if (!newData.batchNo.trim()) {
        newErrors.batchNo = "Batch name is required";
        hasErrors = true;
      } else if (
        batches.some(
          (b) =>
            b.id !== newData.id &&
            b.batchNo.trim().toLowerCase() === newData.batchNo.trim().toLowerCase()
        )
      ) {
        newErrors.batchNo = "This batch number already exists";
        hasErrors = true;
      } else {
        delete newErrors.batchNo;
      }
    }

    // date field
    if (path.startsWith("sections.")) {
      const s = newData.sections?.[sec] || {};
      const start = s.startDate;
      const end = s.endDate;

      if (!start) {
        newErrors[`sections.${sec}.startDate`] = "Start date required";
        hasErrors = true;
      } else {
        delete newErrors[`sections.${sec}.startDate`];
      }

      if (!end) {
        newErrors[`sections.${sec}.endDate`] = "End date required";
        hasErrors = true;
      } else {
        delete newErrors[`sections.${sec}.endDate`];
      }

      if (start && end) {
        if (start === end) {
          newErrors[`sections.${sec}.endDate`] = "End date cannot be same as start date";
          hasErrors = true;
        } else if (end < start) {
          newErrors[`sections.${sec}.endDate`] = "End date cannot be before start date";
          hasErrors = true;
        } else {
          delete newErrors[`sections.${sec}.endDate`];
        }
      }
    }

    setErrors(newErrors);
    setHasErrors(Object.keys(newErrors).length > 0);
  };

  const handleEditModelClose = () => {
    setShowEditModel(false);
    setEditBatchData(null);
    setErrors({});
    setHasErrors(false);
  };

const handleSaveEdit = () => {
  if (!validateEdit()) {
    toast.error("Please fix all errors before saving");
    return;
  }

  if (!hasChanges()) {
    // No changes, just close the modal
    handleEditModelClose();
    return;
  }

  // Show confirmation modal only if there are changes
  setBatchToDelete({
    ...editBatchData,
    confirmationText: `Are you sure you want to update batch ${editBatchData.batchNo}?`
  });
  setShowEditConfirmationModal(true);
};

  const sectionIsValid = (tab) => {
    const sec = newBatch.sections[tab];
    return (
      sec.startDate &&
      sec.endDate &&
      !modalDateErrors[tab] &&
      !formErrors.sections[tab]
    );
  };

  const flagSectionEmptyError = (tab) => {
    setFormErrors(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [tab]: 'Both start and end dates are required'
      }
    }));
  };

  useEffect(() => {
  if (searchInitiated) {
    // Re-apply the search filter whenever batches change
    handleSearch();
  }
}, [batches]);

const toDDMMYYYY = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., Jul
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


  const parseDate = (str) => {
    if (!str) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
    if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      const [dd, mm, yyyy] = str.split("-");
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    return new Date(str);
  };

  const formatDate = (str) => (str ? toDDMMYYYY(parseDate(str)) : "");

      useEffect(() => {
          setSearchTerm('');
          setStartDate('');
          setEndDate('');
          setMode('Off');
          setFilteredBatches([]);
          setSearchInitiated(false);
          setSearchDateError('');
      }, [batchHead]);

      const [searchDateError, setSearchDateError] = useState('');
      const [modalDateErrors, setModalDateErrors] = useState({
          Domain: '',
          Aptitude: '',
          Communication: ''
      });

      const [newBatch, setNewBatch] = useState({
          batchNo: '',
          status: 'Ongoing',
          mode: '',
          sections: {
              Domain: { startDate: '', endDate: '' },
              Aptitude: { startDate: '', endDate: '' },
              Communication: { startDate: '', endDate: '' }
          }
      });

      useEffect(() => {
          const ongoing = batchData.filter(b => b.status === 'Ongoing').length;
          const completed = batchData.filter(b => b.status === 'Completed').length;
          setOngoingCount(ongoing);
          setCompletedCount(completed);
      }, [batchData]);

      useEffect(() => {
          setBatches(batchData);
      }, [batchData]);

      useEffect(() => {
          if (showModal || showDeleteModal) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = 'auto';
          }
          return () => {
              document.body.style.overflow = 'auto';
          };
      }, [showModal, showDeleteModal]);

      const validateSearchDates = (start, end) => {
          if (start && end) {
              const startDateObj = new Date(start);
              const endDateObj = new Date(end);
              if (endDateObj < startDateObj) {
                  setSearchDateError('End date cannot be earlier than start date');
                  return false;
              } else if (endDateObj <= startDateObj) {
                  setSearchDateError('End date cannot be same as the start date');
                  return false;
              } else if (startDateObj < new Date().toISOString().split("T")[0]) {
                  setSearchDateError('The starting date cannot be earlier than present date');
                  return false;
              }
          }
          setSearchDateError('');
          return true;
      };

      const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleCloseModelSelect = () =>{
    setShowNewBatchModeDropdown(false);
  }
  const modeDropdownRef = useRef(null); // for filter section
  const newBatchDropdownRef = useRef(null); // for Add Batch Modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modeDropdownRef.current &&
        !modeDropdownRef.current.contains(event.target)
      ) {
        setShowModeDropdown(false); // for main filter dropdown
      }

      if (
        newBatchDropdownRef.current &&
        !newBatchDropdownRef.current.contains(event.target)
      ) {
        setShowNewBatchModeDropdown(false); // for modal dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

      const handleSearchStartDateChange = (value) => {
          setStartDate(value);
          validateSearchDates(value, endDate);
      };

      const handleSearchEndDateChange = (value) => {
          setEndDate(value);
          validateSearchDates(startDate, value);
      };

      const toggleActions = (id) => {
          setShowActions(showActions === id ? null : id);
      };

      const handleAction = (action, batchId) => {
  if (action === 'delete') {
    const batch = batches.find(b => b.id === batchId);
    setBatchToDelete(batch);
    setShowDeleteModal(true);
    setDeleteConfirmationInput('');
    setDeleteError('');
  } else if (action === 'edit') {
    handleEditBatch(batchId);
    setShowEditModel(true);
  }
  else if (action === 'view') {
    const batch = batches.find(b => b.id === batchId);
    setSelectedBatch(batch);
    setShowViewModal(true);
    setShowActions(null);
  }
};

const handleEditBatch = (batchId) => {
  // Search in both batches and filteredBatches
  const batchToEdit = [...batches, ...filteredBatches].find(batch => batch.id === batchId);

  if (batchToEdit) {
    // Ensure dates are in correct format for the edit modal
    const formatDateForEdit = (dateStr) => {
      if (!dateStr) return '';
      // If already in YYYY-MM-DD format, return as-is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
      
      // Convert from DD-MMM-YYYY to YYYY-MM-DD
      const [dd, mmm, yyyy] = dateStr.split('-');
      const monthMap = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };
      return `${yyyy}-${monthMap[mmm]}-${dd.padStart(2, '0')}`;
    };

    const initialData = {
      ...batchToEdit,
      sections: {
        Domain: {
          startDate: formatDateForEdit(batchToEdit.sections?.Domain?.startDate),
          endDate: formatDateForEdit(batchToEdit.sections?.Domain?.endDate)
        },
        Aptitude: {
          startDate: formatDateForEdit(batchToEdit.sections?.Aptitude?.startDate),
          endDate: formatDateForEdit(batchToEdit.sections?.Aptitude?.endDate)
        },
        Communication: {
          startDate: formatDateForEdit(batchToEdit.sections?.Communication?.startDate),
          endDate: formatDateForEdit(batchToEdit.sections?.Communication?.endDate)
        }
      }
    };

    setEditBatchData(initialData);
    setInitialEditBatchData(JSON.parse(JSON.stringify(initialData))); // Deep clone
    setShowEditModel(true);
  }
};

const hasChanges = () => {
  if (!editBatchData || !initialEditBatchData) return false;
  
  // Compare batchNo
  if (editBatchData.batchNo !== initialEditBatchData.batchNo) return true;
  
  // Compare all sections
  const sections = ['Domain', 'Aptitude', 'Communication'];
  for (const section of sections) {
    if (editBatchData.sections[section].startDate !== initialEditBatchData.sections[section].startDate ||
        editBatchData.sections[section].endDate !== initialEditBatchData.sections[section].endDate) {
      return true;
    }
  }
  
  return false;
};

          const handleEditModelClode = () => {
              setShowEditModel(false)
          }
          const validateBatchField = () => {
          if (!editBatchData.batchNo.trim()) {
              setBatchNameError(true);
              return false;
          }
          setBatchNameError(false);
          return true;
          };

          const handleSave = () => {
          if (!validateBatchField()) return;
          updateBatch(editBatchData.id, editBatchData);
          handleEditModelClode();
          };

          const handleCancel = () => {
          if (!validateBatchField()) return;
          handleEditModelClode();
          };
      const handleDeleteBatch = (batchId) => {
          const updatedBatches = batches.filter(batch => batch.id !== batchId);
          setBatches(updatedBatches);
          if (searchInitiated) {
              const updatedFilteredBatches = filteredBatches.filter(batch => batch.id !== batchId);
              setFilteredBatches(updatedFilteredBatches);
          }
          deleteBatch(batchId);
          const ongoing = updatedBatches.filter(b => b.status === 'Ongoing').length;
          const completed = updatedBatches.filter(b => b.status === 'Completed').length;
          setOngoingCount(ongoing);
          setCompletedCount(completed);
          console.log('Batch deleted. Updated batches:', updatedBatches);
      };

      const handleConfirmDelete = () => {
          if (!deleteConfirmationInput) {
              setDeleteError('Please enter the batch name to confirm deletion');
              return;
          }
          if (deleteConfirmationInput !== batchToDelete.batchNo) {
              setDeleteError('Batch name does not match. Please enter the exact batch name.');
              return;
          }
          handleDeleteBatch(batchToDelete.id);
          setShowDeleteModal(false);
          setBatchToDelete(null);
          setDeleteConfirmationInput('');
          setDeleteError('');
          toast.success("The Data is Successfully Deleted");
      };

      const handleCloseDeleteModal = () => {
          setShowDeleteModal(false);
          setBatchToDelete(null);
          setDeleteConfirmationInput('');
          setDeleteError('');
      };

// First define handleSearch before any effects that use it
const handleSearch = useCallback(() => {
  const hasSearchCriteria = searchTerm || (mode && mode !== 'Off') || startDate || endDate;

  if (!hasSearchCriteria) {
    setSearchInitiated(false);
    toast.error('Please enter at least one search criterion');
    return;
  }

  if (searchDateError) {
    toast.error('Please fix the date range error before searching');
    return;
  }

  let results = batches;

  // Search by Batch No
  if (searchTerm) {
    results = results.filter(batch =>
      batch.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Search by Mode
  if (mode && mode !== 'Off') {
    results = results.filter(batch =>
      batch.mode.toLowerCase() === mode.toLowerCase()
    );
  }

  // Normalize input dates
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Filter based on section start/end dates
  if (start || end) {
    results = results.filter(batch => {
      const sectionDates = [
        batch.sections?.Domain,
        batch.sections?.Aptitude,
        batch.sections?.Communication,
      ].filter(Boolean);

      return sectionDates.some(section => {
        const secStart = section.startDate ? new Date(section.startDate) : null;
        const secEnd = section.endDate ? new Date(section.endDate) : null;

        if (start && end) {
          return secStart <= end && secEnd >= start;
        } else if (start) {
          return secEnd >= start;
        } else if (end) {
          return secStart <= end;
        }
        return true;
      });
    });
  }

  setFilteredBatches(results);
  setSearchInitiated(true);
}, [batches, endDate, mode, searchDateError, searchTerm, startDate]);

// Then use it in your useEffect
useEffect(() => {
  const handleGlobalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  window.addEventListener('keydown', handleGlobalKeyDown);

  return () => {
    window.removeEventListener('keydown', handleGlobalKeyDown);
  };
}, [handleSearch]);// Only need handleSearch in dependencies now

      const resetForm = () => {
          setNewBatch({
              batchNo: '',
              mode: '',
              sections: {
                  Domain: { startDate: '', endDate: '' },
                  Aptitude: { startDate: '', endDate: '' },
                  Communication: { startDate: '', endDate: '' }
              }
          });
          setAddModelError({
              batchNo: '',
              mode: '',
              startDate: '',
              endDate: ''
          });
          setModalDateErrors({});
          setActiveTab('Domain');
          setShowNewBatchModeDropdown(false);
          setFormErrors({
              batchNo: '',
              mode: '',
              sections: {
                  Domain: '',
                  Aptitude: '',
                  Communication: ''
              }
          });
      };

      const handleReset = () => {
          setSearchTerm('');
          setStartDate('');
          setEndDate('');
          setMode('Off');
          setFilteredBatches([]);
          setSearchInitiated(false);
          setSearchDateError('');
      };

  const validateForm = () => {
      let isValid = true;

      // baseline error object
      const newErrors = {
          batchNo: '',
          mode: '',
          sections: {
              Domain: '',
              Aptitude: '',
              Communication: ''
          }
      };

      /* 🔽 1. per section date validation */
      let firstInvalidTab = null;
      Object.entries(newBatch.sections).forEach(([sectionName, section]) => {
          if (!(section.startDate && section.endDate)) {
              newErrors.sections[sectionName] = 'Start and end dates are required';
              isValid = false;
              if (!firstInvalidTab) firstInvalidTab = sectionName;
          }
      });
      /* ensure we land on the first section that needs fixing */
      if (firstInvalidTab) setActiveTab(firstInvalidTab);

      /* 2. batch number validation */
      if (!newBatch.batchNo.trim()) {
          newErrors.batchNo = 'Batch number is required';
          isValid = false;
      } else if (newBatch.batchNo.length > 32) {
          newErrors.batchNo = 'Batch number must be 32 characters or less';
          isValid = false;
      }

      /* 3. mode validation */
      if (!newBatch.mode.trim()) {
          newErrors.mode = 'Mode is required';
          isValid = false;
      }
      // inside validateForm, before returning:
  if (batches.some(
        b => b.batchNo.trim().toLowerCase() === newBatch.batchNo.trim().toLowerCase()
  )) {
    newErrors.batchNo = 'This batch number already exists';
    isValid = false;
  }
      setFormErrors(newErrors);
      return isValid;
  };

  const handleAddBatch = () => {
    if (!validateForm()) return;
    if (Object.values(modalDateErrors).some(e => e)) {
      toast.error("Please fix the date range errors before adding the batch");
      return;
    }
    /* ⬇️ earliest / latest across sections */
    const allSecs = Object.values(newBatch.sections);
    const earliest = new Date(Math.min(...allSecs.map(s => new Date(s.startDate))));
    const latest   = new Date(Math.max(...allSecs.map(s => new Date(s.endDate))));

    /* convert every section date to DD-MM-YYYY */
    const sectionCopy = {};
    for (const [k, s] of Object.entries(newBatch.sections)) {
      sectionCopy[k] = {
        startDate: toDDMMYYYY(parseDate(s.startDate)),
        endDate:   toDDMMYYYY(parseDate(s.endDate))
      };
    }

    const newBatchEntry = {
      id: batches.length + 1,
      batchNo: newBatch.batchNo,
      status: newBatch.status,
      mode:   newBatch.mode,
      startDate: toDDMMYYYY(earliest),
      endDate:   toDDMMYYYY(latest),
      sections:  sectionCopy
    };

    addBatch(newBatchEntry);
    setShowModal(false);
    resetForm();
    toast.success("Batch added successfully");
  };

    // 👇 runs on each onChange
  const validateBatchNumber = (value) => {
    let message = '';

    // duplicate?
    const exists = batches.some(
      b => b.batchNo.trim().toLowerCase() === value.trim().toLowerCase()
    );
    if (exists) {
      message = 'This batch number already exists';
    } else if (!value.trim()) {
      message = 'Batch number is required';
    } else if (value.length > 32) {
      message = 'Batch number must be 32 characters or less';
    }

    // update error state shown under the field
    setFormErrors(prev => ({ ...prev, batchNo: message }));
  };

      const validateMode = (mode) => {
          if (!mode) {
              setAddModelError(prev => ({ ...prev, mode: 'Mode is required' }));
          } else {
              setAddModelError(prev => ({ ...prev, mode: '' }));
          }
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

              

              const sectionData = updatedBatch.sections[section];
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Normalize to start of day

              if (sectionData.startDate || sectionData.endDate) {
                  const startDate = new Date(sectionData.startDate);
                  const endDate = new Date(sectionData.endDate);

                  if (startDate < today) {
                      setModalDateErrors(prev => ({
                          ...prev,
                          [section]: 'Start date cannot be earlier than today'
                      }));
                  } else if (endDate < startDate) {
                      setModalDateErrors(prev => ({
                          ...prev,
                          [section]: 'End date cannot be earlier than start date'
                      }));
                  } else if (endDate.getTime() === startDate.getTime()) {
                      setModalDateErrors(prev => ({
                          ...prev,
                          [section]: 'End date cannot be same as start date'
                      }));
                  } else {
                      // Clear error if dates are valid
                      setModalDateErrors(prev => ({
                          ...prev,
                          [section]: ''
                      }));
                  }
              } else {
                  // Clear error if either date is empty
                  setModalDateErrors(prev => ({
                      ...prev,
                      [section]: ''
                  }));
              }

              return updatedBatch;
          });
      };

    return (
        <div className="flex min-h-screen mx-[-16] md:width-[750px]">
            <Toaster position='top-right' />

{/* Main model  */}
<div className={`px-3 pt-20 flex-1 bg-[#F8FAFD] mb-[12] ${showModal || showDeleteModal ? 'pointer-events-none' : ''}`}>
    <div className="fixed top-0 ms-[-19] border-b-2 border-gray-300 flex items-center justify-between bg-white w-full py-9 px-4 z-10">
        <h1 className="fixed pl-3 text-xl text-gray-800  font-semibold">{batchHead}</h1>
    </div>
    <div ref={searchContainerRef} className='p-3'>
         <div className='mt-[-20]'>
            <button
            onClick={() => setShowModal(true)}
            className="absolute cursor-pointer z-1 flex p-2 right-5 bg-[#3f2fb4] hover:bg-[#3f2fb4d4] text-white text-sm font-bold px-2 py-2.5 rounded-lg shadow-sm">
            <Image
                src='/add.svg'
                alt="SAP Icon"
                width={18}
                height={18}
                className="mx-2"
            /> Add Batch
        </button>
        </div>

        {/* parent row */}
<div className="flex flex-col md:flex-row md:justify-between gap-4 mt-15 mb-6">

  {/* Ongoing */}
  <div className="relative flex-1 bg-[#efeeff] h-36 rounded-[10px]
                  shadow-[0px_10.345px_103.45px_0px_rgba(67,67,67,0.10)]">
    <div className="absolute left-6 top-6 text-gray-700 text-4xl font-bold leading-10">{ongoingCount}</div>
    <div className="absolute left-6 top-[84px] text-xl text-gray-700 font-normal leading-7">Ongoing&nbsp;Count</div>
    <div className="absolute right-4.5 top-6 w-12 h-9 flex items-center justify-center">
      <Image src="/onging count.png" alt="Ongoing Icon" width={30} height={30} className="w-10 h-10" />
    </div>
  </div>

  {/* Completed */}
  <div className="relative flex-1 bg-[#efeeff] h-36 rounded-[10px]
                  shadow-[0px_10.345px_103.45px_0px_rgba(67,67,67,0.10)]">
    <div className="absolute left-6 top-6 text-4xl text-gray-700 font-bold leading-10">{completedCount}</div>
    <div className="absolute left-6 top-[84px] text-xl text-gray-700 font-normal leading-7">Completed&nbsp;Count</div>
    <div className="absolute right-4.5 top-6 w-12 h-9 flex items-center justify-center">
      <Image src="/completed count.png" alt="Completed Icon" width={30} height={35} className="w-10 h-10" />
    </div>
  </div>

</div>
{/* search section   */}
<div id="search-container" className="bg-[#F4F3FF] px-6 py-4 rounded-xl" tabIndex={0}>
    <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
        <div className="relative">
            <input
                type="text"
                id="batch-id"
                className={`block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                placeholder=" "
                value={searchTerm}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                onChange={(e) => { setSearchTerm(e.target.value); }}
            />
            <label
                htmlFor="batch-id"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-3 scale-75 top-3.5 z-5 origin-[0] left-1 peer-focus:text-xs peer-focus:text-[#6750a4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#efeeff]"
            >
                Search by Batch number
            </label>
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm('')}
                    className="cursor-pointer absolute top-4 right-3 text-gray-500 hover:text-gray-00"
                >
                    <RiCloseCircleLine size={20} />
                </button>
            )}
        </div>
        
        {/* Start Date Input */}
        <div className="relative">
            <input
                id="start-date"
                type="date"
                value={startDate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                onChange={(e) => handleSearchStartDateChange(e.target.value)}
                className="cursor-pointer block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
            />
            <label
                htmlFor="start-date"
                className={`absolute px-3 pb-2 mt-1 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform z-5 origin-[0] left-4
                ${startDate
                    ? 'top-2 -translate-y-3 scale-75 text-[#6750A4] font-medium '
                    : 'top-6 -translate-y-1/2 scale-100'}
                peer-focus:top-3.5 peer-focus:-translate-y-7 peer-focus:font-bold peer-focus:scale-75 peer-focus:text-[#6750A4]`}
            >
                Start date
            </label>
        </div>
        
        {/* End Date Input */}
        <div className="relative">
            <input
                id="end-date"
                type="date"
                value={endDate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                onChange={(e) => handleSearchEndDateChange(e.target.value)}
                className="cursor-pointer block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
            />
            <label
                htmlFor="end-date"
                className={`absolute px-3.5 pb-2 mt-1 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform z-5 origin-[0] left-4
                ${endDate
                    ? 'top-2 -translate-y-3 scale-75 text-[#6750A4] font-medium'
                    : 'top-6 -translate-y-1/2 scale-100'}
                peer-focus:top-3.5 peer-focus:-translate-y-7 peer-focus:font-bold peer-focus:scale-75 peer-focus:text-[#6750A4]`}
            >
                End date
            </label>
            {searchDateError && (
                <p className="text-red-500 text-xs mt-1 px-2">{searchDateError}</p>
            )}
        </div>
        
        <div className="relative">
            <input
                type="text"
                id="mode"
                readOnly
                placeholder=" "
                value={mode === 'Off' ? '' : mode}
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF]/5 rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
            />
            <label
                htmlFor="mode"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
            >
                Mode
            </label>
            <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />

            {mode && mode !== 'Off' && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setMode('Off');
                        handleSearch();
                    }}
                    className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                >
                    <RiCloseCircleLine size={20} />
                </button>
            )}

            {showModeDropdown && (
                <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md">
                    {['Online', 'Offline'].map((item) => (
                        <div
                            key={item}
                            tabIndex={0}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                setMode(item);
                                setShowModeDropdown(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setMode(item);
                                    setShowModeDropdown(false);
                                    handleSearch();
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div className="flex gap-2  md:justify-end">
            <button
                onClick={handleSearch}
                className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-5 py-4 rounded-xl text-sm font-semibold"
            >
                Search
            </button>
            <button
                onClick={handleReset}
                className="cursor-pointer bg-[#f1ecfb] hover:bg-[#E8DEF8] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
                <Image
                    src='/reset.svg'
                    alt="SAP Icon"
                    width={20}
                    height={20}
                    className="object-contain"
                /> Reset
            </button>
        </div>
    </div>
</div>

        {searchInitiated && (
            <div  className="bg-white rounded-2xl shadow-sm mt-6 w-full">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall&nbsp;Start</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall&nbsp;End</th> */}
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aptitude</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Communication</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
  {filteredBatches.map((batch, index) => (
    <tr key={batch.id} className="hover:bg-[#e1cfff] hover:text-[#4005a0]">
      <td className="px-4 text-gray-700 py-3 text-sm whitespace-nowrap">{index + 1}</td>

      {/* Batch No */}
      <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{batch.batchNo}</td>

      {/* Status */}
      <td className="px-4 py-3 text-sm whitespace-nowrap">
{new Date(batch.sections?.Domain?.endDate) < new Date() &&
 new Date(batch.sections?.Aptitude?.endDate) < new Date() &&
 new Date(batch.sections?.Communication?.endDate) < new Date() ? (
  <Image
    src="/com.svg"
    alt="Completed"
    width={70}
    height={50}
    className="w-20 h-7"
  />
) : (
  <Image
    src="/going.svg"
    alt="Ongoing"
    width={70}
    height={50}
    className="w-20 h-7"
  />
)}
      </td>

      {/* Domain dates */}
      <td className="px-4 py-3 text-xs whitespace-nowrap w-44">
        {formatDate(batch.sections?.Domain?.startDate)} – {formatDate(batch.sections?.Domain?.endDate)}
      </td>

      {/* Aptitude dates */}
      <td className="px-4 py-3 text-xs whitespace-nowrap w-44">
        {formatDate(batch.sections?.Aptitude?.startDate)} – {formatDate(batch.sections?.Aptitude?.endDate)}
      </td>

      {/* Communication dates */}
      <td className="px-4 py-3 text-xs whitespace-nowrap w-44">
        {formatDate(batch.sections?.Communication?.startDate)} – {formatDate(batch.sections?.Communication?.endDate)}
      </td>

      {/* Mode */}
      <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{batch.mode}</td>

      {/* Actions */}
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <div className="flex gap-1">
          <button onClick={() => handleAction('view', batch.id)} className=" cursor-pointer p-1 hover:bg-gray-100 rounded">
            <FiEye className="h-4 w-4" />
          </button>
          <button onClick={() => handleAction('edit', batch.id)} className="cursor-pointer p-1 hover:bg-gray-100 rounded">
            <FiEdit className="h-4 w-4" />
          </button>
          <button onClick={() => handleAction('delete', batch.id)} className="cursor-pointer p-1 hover:bg-gray-100 rounded text-black">
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

                    </table>
                </div>
            </div>
        )}
    </div>
</div>

{/* addNewBatch model */}
{showModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={() => {
          handleCloseModal();
          handleCloseModelSelect();
        }}

    >
        <div className="w-[380px] bg-[#F8FAFD] rounded-[10px] px-6 py-4"
            onClick={(e) => {e.stopPropagation()
          }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-800 text-sm font-bold">Add new batch</h2>
                <button
                    onClick={() => {
                        setShowModal(false);
                        resetForm();
                    }}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                    <RiCloseCircleLine size={20} />
                </button>
            </div>

            {/* Batch Number Field */}
            <div className="relative mb-4">
                <input
                    type="text"
                    id="batch-number"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${
                    formErrors.batchNo ? ' border-red-500' : 'border-gray-400'
                    } ${setFormErrors ? 'border-gray-400':'focus:border-red-500 border-red-500' } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
                    placeholder=" "
                    value={newBatch.batchNo}

                    onChange={(e) => {
                        const value = e.target.value;
                        setNewBatch({ ...newBatch, batchNo: value });
                        validateBatchNumber(value);
                        if (formErrors.batchNo) {
                            setFormErrors({ ...formErrors, batchNo: '' });
                        }
                    }}
                    required
                />
                <label
                    htmlFor="batch-number"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                    Batch Number
                </label>
                {newBatch.batchNo && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setNewBatch({ ...newBatch, batchNo: '' });
                            setFormErrors({ ...formErrors, batchNo: '' });
                        }}
                        className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <RiCloseCircleLine size={20} />
                    </button>
                )}
                {formErrors.batchNo && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.batchNo}</p>
                )}
            </div>

            {/* Section Labels */}
            <div className="flex bg-[#ECE6F0] rounded-xl p-1 mb-4 relative">
                <div
                    className={`absolute top-1 bottom-1 bg-[#F8FAFD] rounded-lg shadow-sm transition-all
                    duration-300 ease-in-out z-0
                    ${
                        activeTab === 'Domain'
                            ? 'left-1 w-[calc(33.33%-0.5rem)]'
                            : activeTab === 'Aptitude'
                            ? 'left-[calc(33.33%+0.25rem)] w-[calc(33.33%-0.5rem)]'
                            : 'left-[calc(65.66%+0.25rem)] w-[calc(34%-0.5rem)]'
                    }`}
                />
                {['Domain', 'Aptitude', 'Communication'].map(label => (
                    <span
                        key={label}
                        className={`flex-1 items-center text-gray-800 text-center py-2 text-xs font-semibold select-none cursor-default relative z-10
                            ${activeTab === label ? 'text-indigo-600' : 'text-black'}`}
                    >
                        {label}
                    </span>
                ))}
            </div>

            {/* Date Selection */}
            <div className="bg-[#ECE6F0] rounded-2xl p-3 mb-4 border border-gray-200">
               <div className="mb-3">
        <p className="text-xs text-gray-500 mb-5">Select date</p>
        <div className="flex items-center justify-between pb-2 border-b-1 border-gray-300">
            <h3 className="text-lg text-gray-800 font-semibold">Enter dates</h3>
            <button className="text-gray-500">
                <FiCalendar size={18} />
            </button>
        </div>
    </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
  <div className="relative">
    <input
      type="date"
      id={`${activeTab.toLowerCase()}-start-date`}
      className={`block px-3 py-2 pt-4 w-full text-xs text-gray-900 bg-[#ECE6F0] rounded-sm border-2 ${
        formErrors.sections[activeTab] || modalDateErrors[activeTab]
          ? 'border-red-500'
          : 'border-gray-400'
      } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
      placeholder=" "
      value={newBatch.sections[activeTab].startDate}
      onChange={(e) => {
        handleSectionDateChange(activeTab, 'startDate', e.target.value);
        if (formErrors.sections[activeTab]) {
          setFormErrors({
            ...formErrors,
            sections: {
              ...formErrors.sections,
              [activeTab]: ''
            }
          });
        }
      }}
    />
    <label
      htmlFor={`${activeTab.toLowerCase()}-start-date`}
      className={`absolute px-2 text-sm pb-1 text-gray-500 duration-300 bg-[#ECE6F0] transform z-5 origin-[0] left-4
        ${
          newBatch.sections[activeTab].startDate
            ? 'top-3 -translate-y-3 scale-75 text-[#6750A4] font-medium'
            : 'top-1/2 -translate-y-1/2 scale-100'
        }
        peer-focus:top-3.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-bold peer-focus:text-[#6750A4]`}
    >
      Start date
    </label>
  </div>

  <div className="relative">
    <input
      type="date"
      id={`${activeTab.toLowerCase()}-end-date`}
      className={`block px-3 py-2 pt-4 w-full text-xs text-gray-900 bg-[#ECE6F0] rounded-sm border-2 ${
        formErrors.sections[activeTab] || modalDateErrors[activeTab]
          ? 'border-red-500'
          : 'border-gray-400'
      } appearance-none focus:outline-none focus:border-[#6750A4] peer`}
      placeholder=" "
      value={newBatch.sections[activeTab].endDate}
      onChange={(e) => {
        handleSectionDateChange(activeTab, 'endDate', e.target.value);
        if (formErrors.sections[activeTab]) {
          setFormErrors({
            ...formErrors,
            sections: {
              ...formErrors.sections,
              [activeTab]: ''
            }
          });
        }
      }}
    />
    <label
      htmlFor={`${activeTab.toLowerCase()}-end-date`}
      className={`absolute px-2 text-sm pb-1 text-gray-500 duration-300 bg-[#ECE6F0] transform z-5 origin-[0] left-4
        ${
          newBatch.sections[activeTab].endDate
            ? 'top-3 -translate-y-3 scale-75 text-[#6750A4] font-medium'
            : 'top-1/2 -translate-y-1/2 scale-100'
        }
        peer-focus:top-3.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-bold peer-focus:text-[#6750A4]`}
    >
      End date
    </label>

  </div>
</div>

                {modalDateErrors[activeTab] && (
                    <p className="text-red-500 text-xs mt-1 px-2">{modalDateErrors[activeTab]}</p>
                )}
                {formErrors.sections[activeTab] && (
                    <p className="text-red-500 text-xs mt-1 px-2">{formErrors.sections[activeTab]}</p>
                )}
                 
            </div>

            {/* Mode Selection */}
            <div className="relative mb-4" ref={newBatchDropdownRef}>
                <input
                    type="text"
                    id="new-mode"
                    className={`block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 ${
                        formErrors.mode ? 'border-red-500' : 'border-gray-400'
                    } appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer`}
                    placeholder=" "
                    readOnly

                    value={newBatch.mode}
                    onClick={() => {
                        setShowNewBatchModeDropdown(!showNewBatchModeDropdown);
                        if (formErrors.mode) {
                            setFormErrors({ ...formErrors, mode: '' });
                        }
                    }}
                    required
                />
                <label
                    htmlFor="new-mode"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F8FAFD] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                    Mode
                </label>
                {newBatch.mode && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setNewBatch({ ...newBatch, mode: '' });
                            setFormErrors({ ...formErrors, mode: 'Mode is required' });
                        }}
                        className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                        <RiCloseCircleLine size={20} />
                    </button>
                )}
                <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                {showNewBatchModeDropdown && (
                    <div className="absolute z-10  w-full bg-[#ECE6F0] border border-gray-300 rounded-md shadow-md">
                        {['Online', 'Offline'].map((item) => (
                            <div
                                key={item}
                                className="px-3 py-1.5 text-xs cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setNewBatch({ ...newBatch, mode: item });
                                    setShowNewBatchModeDropdown(false);
                                    setFormErrors({ ...formErrors, mode: '' });
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
                {formErrors.mode && <p className="text-red-600 text-xs mt-1">{formErrors.mode}</p>}
            </div>

            {/* Prev / Next / Create Button Navigation */}
            <div className="flex justify-between mt-10 mb-5">
                <button
    disabled={activeTab === 'Domain'}
    className="cursor-pointer px-3 py-1 rounded-lg text-xs font-medium
      disabled:opacity-40 disabled:cursor-default
      bg-[#ECE6F0] hover:bg-[#d8d1dd]"
    onClick={() => {
      const order = ['Domain', 'Aptitude', 'Communication'];
      const idx = order.indexOf(activeTab);
      if (idx > 0) setActiveTab(order[idx - 1]);
    }}
  >
    Prev
  </button>

  {activeTab !== 'Communication' ? (
    <button
      className="cursor-pointer px-3 py-1 rounded-lg text-xs font-medium
        bg-[#5e4eff] text-white hover:bg-[#453cff]"
      onClick={() => {
        if (!sectionIsValid(activeTab)) {
          flagSectionEmptyError(activeTab);   // show red helper
          return;                             // stop navigation
        }
        const order = ['Domain', 'Aptitude', 'Communication'];
        const idx = order.indexOf(activeTab);
        if (idx < order.length - 1) setActiveTab(order[idx + 1]);
      }}
    >
      Next
    </button>
  ) : (
    <button
      className="cursor-pointer px-3 py-1 rounded-lg text-xs font-medium
        bg-[#5e4eff] text-white hover:bg-[#453cff]"
      onClick={() => {
        if (!sectionIsValid(activeTab)) {
          flagSectionEmptyError(activeTab);   // block & show error
          return;
        }
        handleAddBatch();                      // final submit
      }}
    >
      Create
    </button>
                )}
            </div>
        </div>
    </div>
)}

{/* Delete Confirmation Modal */}
{showDeleteModal && batchToDelete && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleCloseDeleteModal}
    >
        <div className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
        onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Delete Batch Info</h2>
                <button
                    onClick={handleCloseDeleteModal}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                    <RiCloseCircleLine size={20} />
                </button>
            </div>

            {/* Confirmation Input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    id="delete-confirmation"
                    className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                    placeholder=" "
                    value={deleteConfirmationInput}
                    onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                    required
                />
                <label
                    htmlFor="delete-confirmation"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                    Batch Name
                </label>
            </div>

            {/* Error Message */}
            {deleteError && <p className="text-red-500 text-sm mb-4">{deleteError}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleConfirmDelete}
                    className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)}

{/* Show Edit model */}
{showEditModal && editBatchData && (
  <div
    className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
    onClick={() => !hasErrors && handleEditModelClose()}
  >
    <div
      className="relative w-auto bg-white p-10 rounded-sm shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ───── Header ───── */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-sm font-bold">Edit batch</h2>
        <button
          onClick={() => !hasErrors && handleEditModelClose()}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          disabled={hasErrors}
        >
          <RiCloseCircleLine size={20} />
        </button>
      </div>
      {/* ───── Batch-name field ───── */}
      <div className="relative mb-4 w-full">
        <input
          id="batchName"
          type="text"
          value={editBatchData.batchNo}
          onChange={(e) => handleChange("batchNo", e.target.value)}
          className={`peer w-full rounded border-2 p-2.5 pr-10 text-sm transition-all
            ${errors.batchNo
              ? "border-red-500"
              : editBatchData.batchNo
              ? "border-[#6750a4]"
              : "border-[#79747e]"}
            focus:border-[#6750a4] focus:outline-none
          `}
        />
        <label
          htmlFor="batchName"
          className={`absolute left-2 bg-white px-1 transition-all pointer-events-none
            ${editBatchData.batchNo
              ? "top-[-10px] text-xs text-[#6750a4]"
              : "top-3.5 text-sm text-gray-400"}
            peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#6750a4]`}
        >
          Batch name
        </label>
        {/* clear icon */}
        {editBatchData.batchNo && (
          <RiCloseCircleLine
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => handleChange("batchNo", "")}
          />
        )}
      </div>
      {errors.batchNo && (
        <p className="mb-4 ms-1 text-xs text-red-500">{errors.batchNo}</p>
      )}
      {/* ───── Sections ───── */}
      <div className="flex flex-col">
        {/* first row: Domain & Aptitude */}
        <div className="flex flex-row gap-2">
          {/* Domain */}
          <div className="mb-4 rounded-xl bg-[#ece6f0] p-4">
            <h3 className="mb-4 border-b font-mono text-2xl">Domain</h3>
            <div className="flex gap-4">
              {/* Domain start */}
              <input
                type="date"
                min={todayISO}
                value={editBatchData.sections?.Domain?.startDate || ""}
                onChange={(e) =>
                  handleChange("sections.Domain.startDate", e.target.value)
                }
                className={`w-auto rounded border p-2 text-sm cursor-pointer ${
                  errors["sections.Domain.startDate"] ? "border-red-500" : ""
                }`}
              />
              {/* Domain end */}
              <input
                type="date"
                min={editBatchData.sections?.Domain?.startDate || todayISO}
                value={editBatchData.sections?.Domain?.endDate || ""}
                onChange={(e) =>
                  handleChange("sections.Domain.endDate", e.target.value)
                }
                className={`w-auto rounded border cursor-pointer p-2 text-sm ${
                  errors["sections.Domain.endDate"] ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors["sections.Domain.startDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Domain.startDate"]}
              </p>
            )}
            {errors["sections.Domain.endDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Domain.endDate"]}
              </p>
            )}
          </div>
          {/* Aptitude */}
          <div className="mb-4 rounded-xl bg-[#ece6f0] p-4">
            <h3 className="mb-4 border-b font-mono text-2xl">Aptitude</h3>
            <div className="flex gap-4">
              <input
                type="date"
                min={todayISO}
                value={editBatchData.sections?.Aptitude?.startDate || ""}
                onChange={(e) =>
                  handleChange("sections.Aptitude.startDate", e.target.value)
                }
                className={`w-auto rounded border p-2 cursor-pointer text-sm ${
                  errors["sections.Aptitude.startDate"] ? "border-red-500" : ""
                }`}
              />
              <input
                type="date"
                min={editBatchData.sections?.Aptitude?.startDate || todayISO}
                value={editBatchData.sections?.Aptitude?.endDate || ""}
                onChange={(e) =>
                  handleChange("sections.Aptitude.endDate", e.target.value)
                }
                className={`w-auto rounded border p-2 cursor-pointer text-sm ${
                  errors["sections.Aptitude.endDate"] ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors["sections.Aptitude.startDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Aptitude.startDate"]}
              </p>
            )}
            {errors["sections.Aptitude.endDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Aptitude.endDate"]}
              </p>
            )}
          </div>
        </div>
        {/* second row: Communication */}
        <div className="w-1/2">
          <div className="mb-4 rounded-xl bg-[#ece6f0] p-4">
            <h3 className="mb-4 border-b font-mono text-2xl">
              Communication
            </h3>
            <div className="flex gap-4">
              <input
                type="date"
                min={todayISO}
                value={editBatchData.sections?.Communication?.startDate || ""}
                onChange={(e) =>
                  handleChange(
                    "sections.Communication.startDate",
                    e.target.value
                  )
                }
                className={`w-auto rounded border p-2 cursor-pointer text-sm ${
                  errors["sections.Communication.startDate"] ? "border-red-500" : ""
                }`}
              />
              <input
                type="date"
                min={editBatchData.sections?.Communication?.startDate || todayISO}
                value={editBatchData.sections?.Communication?.endDate || ""}
                onChange={(e) =>
                  handleChange(
                    "sections.Communication.endDate",
                    e.target.value
                  )
                }
                className={`w-auto rounded border p-2 cursor-pointer text-sm ${
                  errors["sections.Communication.endDate"] ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors["sections.Communication.startDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Communication.startDate"]}
              </p>
            )}
            {errors["sections.Communication.endDate"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["sections.Communication.endDate"]}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* ───── Footer actions ───── */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => !hasErrors && handleEditModelClose()}
          className={` cursor-pointer rounded-2xl px-4 py-3 ${
            hasErrors ? "bg-[#f1ecfb] text-gray-400" : "bg-[#e8def8] text-[#4a4459]"
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className={` cursor-pointer rounded-2xl px-4 py-3 text-white ${
            hasErrors
              ? "cursor-not-allowed bg-[#b5a9d4]"
              : "bg-[#6750a4] hover:bg-[#56438d]"
          }`}
          disabled={hasErrors}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{/* Edit Confirmation Modal */}
{showEditConfirmationModal && editBatchData && (
  <div 
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setShowEditConfirmationModal(false)}
  >
    <div 
      className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Confirm Changes</h2>
        <button
          onClick={() => setShowEditConfirmationModal(false)}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <RiCloseCircleLine size={20} />
        </button>
      </div>

      <p className="mb-4 text-gray-700 text-sm">
        Are you sure you want to update batch <strong className='text-m'>{editBatchData.batchNo}</strong>?
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowEditConfirmationModal(false)}
          className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            updateBatch(editBatchData.id, editBatchData);
            setShowEditConfirmationModal(false);
            handleEditModelClose();
            toast.success("Batch updated successfully");
          }}
          className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

{/* <Toaster position="top-right" reverseOrder={false} /> */}

{/*View Modal*/}
{showViewModal && selectedBatch && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setShowViewModal(false)}
  >
    <div
      className="w-[650px] bg-[#F8FAFD] rounded-[10px] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Batch Details</h2>
        <button
          onClick={() => setShowViewModal(false)}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <RiCloseCircleLine size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full">
        {/* Tab Buttons */}
        <div className="flex justify-between bg-[#F8FAFD] rounded-t-md relative">
          {['Basic Info', 'Batch Details', 'Domain', 'Aptitude', 'Communication', 'Placement'].map((tab) => (
            <button
              key={tab}
              onClick={() => setInfoTab(tab)}
              className={`cursor-pointer flex-1 py-2 text-xs sm:text-sm font-medium transition duration-300 ${
                infoTab === tab ? 'text-[#6750A4]' : 'text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
          {/* Active Tab Underline */}
          <div
            className="absolute bottom-0 h-[3px] bg-[#6750A4] transition-all duration-300"
            style={{
              width: `${100 / 6}%`,
              transform: `translateX(${
                ['Basic Info', 'Batch Details', 'Domain', 'Aptitude', 'Communication', 'Placement'].indexOf(infoTab) * 100
              }%)`,
            }}
          />
        </div>

        {/* Modal Content */}
        {/*Basic info tab*/}
        {infoTab === 'Basic Info' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 font-sans text-gray-800">

    {/* Batch No */}
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Batch No</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch.batchNo}</p>
    </div>

    {/* Status */}
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Status</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch?.status}</p>
    </div>

    {/* Mode */}
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md col-span-full mx-auto w-full sm:w-2/3 lg:w-1/2">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Mode</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch?.mode}</p>
    </div>

  </div>
)}
        {/* Batch Details tab*/ }
        {infoTab === 'Batch Details' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-sans text-gray-800">

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Mode</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch?.mode}</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Session</h3>
      <p className="text-base font-medium text-gray-600">Interview Session</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md md:col-span-2 md:mx-auto md:w-1/2">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Student Count</h3>
      <p className="text-base font-medium text-gray-600">40</p>
    </div>

  </div>
)}
     {/* Domain */}
     {infoTab === 'Domain' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-sans text-gray-800">
    
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md space-y-2">
    <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Domain Dates</h3>
  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    Start - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Domain?.startDate)}</span>
  </p>

  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    End - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Domain?.endDate)}</span>
  </p>
</div>
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Status</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch?.status}</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Batch Progress</h3>
      <p className="text-base font-medium text-gray-600">IRC Completed</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Trainer Name</h3>
      <p className="text-base font-medium text-gray-600">Shri Hari</p>
    </div>
    <div className="w-full col-span-full bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
  <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-3">EPIC Data</h3>
  <div className="flex flex-wrap justify-between gap-4 text-base font-medium text-gray-600">
    <p><span className="text-[#6b21a8] font-bold">E</span>xcellent - 10</p>
    <p><span className="text-[#6b21a8] font-bold">P</span>roficient - 10</p>
    <p><span className="text-[#6b21a8] font-bold">I</span>deal - 10</p>
    <p><span className="text-[#6b21a8] font-bold">C</span>apable - 10</p>
  </div>
</div>
  </div>
)}
    {/* Aptitude */}
    {infoTab === 'Aptitude' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-sans text-gray-800">
    
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md space-y-2">
    <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Apptitude Dates</h3>
  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    Start - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Aptitude?.startDate)}</span>
  </p>

  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    End - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Aptitude?.endDate)}</span>
  </p>
</div>


    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Status</h3>
      <p className="text-base font-medium text-gray-600">{selectedBatch?.status}</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Batch Progress</h3>
      <p className="text-base font-medium text-gray-600">Capstone Project</p>
    </div>

    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Trainer Name</h3>
      <p className="text-base font-medium text-gray-600">Shri Hari</p>
    </div>
    <div className="w-full col-span-full bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
  <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-3">EPIC Data</h3>
  <div className="flex flex-wrap justify-between gap-4 text-base font-medium text-gray-600">
    <p><span className="text-[#6b21a8] font-bold">E</span>xcellent - 10</p>
    <p><span className="text-[#6b21a8] font-bold">P</span>roficient - 10</p>
    <p><span className="text-[#6b21a8] font-bold">I</span>deal - 10</p>
    <p><span className="text-[#6b21a8] font-bold">C</span>apable - 10</p>
  </div>
</div>
  </div>

    )}
    {/* Communication */}
    {infoTab === 'Communication' && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 font-sans text-gray-800">
      <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md space-y-2">
    <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Communication Dates</h3>
  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    Start - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Communication?.startDate)}</span>
  </p>

  <p className="text-sm font-semibold text-[#6b21a8] tracking-wide">
    End - <span className="text-base font-medium text-gray-600">{formatDate(selectedBatch.sections?.Communication?.endDate)}</span>
  </p>
</div>
      <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
        <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Status</h3>
        <p className="text-base font-medium text-gray-600">{selectedBatch?.status}</p>
      </div>
    
      <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
        <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Batch Progress</h3>
        <p className="text-base font-medium text-gray-600">Initial Stage</p>
      </div>
    
      <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md ">
        <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Trainer Name</h3>
        <p className="text-base font-medium text-gray-600">Shri Hari</p>
      </div>
      <div className="w-full col-span-full bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
  <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-3">EPIC Data</h3>
  <div className="flex flex-wrap justify-between gap-4 text-base font-medium text-gray-600">
    <p><span className="text-[#6b21a8] font-bold">E</span>xcellent - 10</p>
    <p><span className="text-[#6b21a8] font-bold">P</span>roficient - 10</p>
    <p><span className="text-[#6b21a8] font-bold">I</span>deal - 10</p>
    <p><span className="text-[#6b21a8] font-bold">C</span>apable - 10</p>
  </div>
</div>

    </div>
    )}

    {/* Placement */}
    {infoTab === 'Placement' && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 font-sans text-gray-800">

    {/* First 6 boxes */}
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Not Required</h3>
      <p className="text-4xl font-bold text-gray-600">5</p>
    </div>
  
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Ready For Placement</h3>
      <p className="text-4xl font-bold text-gray-600">4</p>
    </div>
  
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">KGM Placed</h3>
      <p className="text-4xl font-bold text-gray-600">11</p>
    </div>
  
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Self Placed</h3>
      <p className="text-4xl font-bold text-gray-600">4</p>
    </div>
  
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Yet to be Placed</h3>
      <p className="text-4xl font-bold text-gray-600">5</p>
    </div>
  
    <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md">
      <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Success Rate</h3>
      <p className="text-4xl font-bold text-gray-600">62.5%</p>
    </div>
    
    <div className="lg:col-span-3 flex justify-center gap-6">
  <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md flex-1 max-w-[300px]">
    <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Not Eligible for Placement</h3>
    <p className="text-4xl font-bold text-gray-600">5</p>
  </div>

  <div className="bg-[#ece6f0] rounded-xl p-6 border-t-4 border-[#6b21a8] shadow-md flex-1 max-w-[300px]">
    <h3 className="text-sm font-semibold text-[#6b21a8] tracking-wide mb-1">Placement Successful Candidate</h3>
    <p className="text-4xl font-bold text-gray-600">15</p>
  </div>
</div>

  </div>
 
    )}
        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowViewModal(false)}
            className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}




<Toaster position="top-right" reverseOrder={false} />
    </div>
  );

}

  
