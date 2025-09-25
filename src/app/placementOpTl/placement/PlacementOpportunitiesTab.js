"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useDataContext } from "../../context/dataContext";
import Navbar from "../navbar";
import CreateButton from "../components/createButton";
import OpportunitiesCardGrid from "../components/OpportunitiesCardGrid";
import AssignOpportunityModal from "../components/assignOpportunityModal";
import SelectStudentsModal from "../components/selectStudentsModal";
import ConfirmSaveModal from "../components/confirmSaveModal";
import DiscardModal from "../components/discardModal";
import ViewOpportunityDetailsModal from "../components/ViewOpportunityDetailsModal"; // ✅ import added

export default function PlacementOpportunitiesTab() {
  const {
    studentData,
    // Domain data arrays from context
    fullstackStudent,
    dataanalyticsStudent,
    marketingStudent,
    sapStudent,
    devopsStudent,
    bankingStudent,
    // Opportunities arrays from context
    fullstackOpportunities,
    dataanalyticsOpportunities,
    marketingOpportunities,
    sapOpportunities,
    devopsOpportunities,
    bankingOpportunities,
    // Function to add opportunity to context
    addOpportunity,
    // Batches data for domains (array of batch objects)
    fullstackData,
    dataanalyticsData,
    marketingData,
    sapData,
    devopsData,
    bankingData,
    // Get allStudentData from context
    allStudentData,
  } = useDataContext();

  // State for modals and data
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSelectStudentsModalOpen, setIsSelectStudentsModalOpen] =
    useState(false);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // ✅ new state for view details modal
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // State for opportunity being created/assigned
  const [newOpportunity, setNewOpportunity] = useState({
    domain: "",
    selectedBatch: "",
    companyName: "",
    driveDate: "",
    driveRole: "",
    package: "",
  });

  // State for selected students in the selection modal
  const [selectedStudents, setSelectedStudents] = useState([]);
  // State for students filtered by selected batch in selection modal
  const [filteredBatchStudents, setFilteredBatchStudents] = useState([]);

  // State for the opportunity data being viewed/saved in the student selection modal
  const [opportunityDetailsForSelection, setOpportunityDetailsForSelection] =
    useState(null); // <- Only ONE declaration

  // Combine all opportunities from different domains into one list for display
  const allOpportunities = useMemo(() => {
    const opps = [
      ...(fullstackOpportunities || []).map((op) => ({
        ...op,
        domain: "fullstack",
      })),
      ...(dataanalyticsOpportunities || []).map((op) => ({
        ...op,
        domain: "dataanalytics",
      })),
      ...(marketingOpportunities || []).map((op) => ({
        ...op,
        domain: "marketing",
      })),
      ...(sapOpportunities || []).map((op) => ({ ...op, domain: "sap" })),
      ...(devopsOpportunities || []).map((op) => ({ ...op, domain: "devops" })),
      ...(bankingOpportunities || []).map((op) => ({
        ...op,
        domain: "banking",
      })),
    ];
    return opps.map((op, index) => ({ ...op, id: op.id || `opp-${index}` }));
  }, [
    fullstackOpportunities,
    dataanalyticsOpportunities,
    marketingOpportunities,
    sapOpportunities,
    devopsOpportunities,
    bankingOpportunities,
  ]);

  // --- Define Domain Labels ---
  const DOMAIN_LABEL_MAP = useMemo(
    () => ({
      fullstack: "Full Stack Development",
      dataanalytics: "Data Analytics & Science",
      marketing: "Digital Marketing",
      sap: "SAP",
      devops: "DevOps",
      banking: "Banking & Finance",
    }),
    []
  );

  // --- Generate domains as array of { key, label } objects ---
  const domains = useMemo(() => {
    const domainSet = new Set();
    studentData.forEach((student) => {
      if (student.domain) domainSet.add(student.domain);
    });
    const expectedDomains = [
      "fullstack",
      "dataanalytics",
      "marketing",
      "sap",
      "devops",
      "banking",
    ];
    expectedDomains.forEach((d) => domainSet.add(d));

    return Array.from(domainSet)
      .map((key) => ({
        key: key,
        label: DOMAIN_LABEL_MAP[key] || key,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [studentData, DOMAIN_LABEL_MAP]);

  // --- Create an object containing all domain batch data ---
  const allDomainBatchData = useMemo(
    () => ({
      fullstack: fullstackData || [],
      dataanalytics: dataanalyticsData || [],
      marketing: marketingData || [],
      sap: sapData || [],
      devops: devopsData || [],
      banking: bankingData || [],
    }),
    [
      fullstackData,
      dataanalyticsData,
      marketingData,
      sapData,
      devopsData,
      bankingData,
    ]
  );

  

  // Effect to filter students when batch changes in selection modal
  useEffect(() => {
    if (
      opportunityDetailsForSelection?.selectedBatch &&
      opportunityDetailsForSelection?.domain
    ) {
      // Get the appropriate student array based on domain
      let domainStudentData = [];

      switch (opportunityDetailsForSelection.domain) {
        case "fullstack":
          domainStudentData = fullstackStudent || [];
          break;
        case "dataanalytics":
          domainStudentData = dataanalyticsStudent || [];
          break;
        case "marketing":
          domainStudentData = marketingStudent || [];
          break;
        case "sap":
          domainStudentData = sapStudent || [];
          break;
        case "devops":
          domainStudentData = devopsStudent || [];
          break;
        case "banking":
          domainStudentData = bankingStudent || [];
          break;
        default:
          domainStudentData = [];
      }

      // Debug: Check if domain array is empty
      console.log(
        `DEBUG: ${opportunityDetailsForSelection.domain} student count:`,
        domainStudentData.length
      );

      // Fallback to allStudentData if domain array is empty
      if (domainStudentData.length === 0) {
        console.log("DEBUG: Using allStudentData as fallback");
        domainStudentData = allStudentData;
      }

      // Filter students by selected batch
      const studentsInBatch = domainStudentData.filter(
        (student) =>
          student.batch === opportunityDetailsForSelection.selectedBatch
      );

      console.log("DEBUG: Found students:", studentsInBatch.length);
      setFilteredBatchStudents(studentsInBatch);
      setSelectedStudents([]);
    } else {
      setFilteredBatchStudents([]);
      setSelectedStudents([]);
    }
  }, [
    opportunityDetailsForSelection,
    fullstackStudent,
    dataanalyticsStudent,
    marketingStudent,
    sapStudent,
    devopsStudent,
    bankingStudent,
    allStudentData,
  ]);

  // Handlers for modals
  const handleOpenAssignModal = () => {
    setIsAssignModalOpen(true);
    setNewOpportunity({
      domain: "",
      selectedBatch: "",
      companyName: "",
      driveDate: "",
      driveRole: "",
      package: "",
    });
    setSelectedStudents([]);
  };

  const handleCloseAssignModal = () => {
    const isFormFilled = Object.values(newOpportunity).some(
      (val) => val !== ""
    );
    if (isFormFilled) {
      setIsDiscardModalOpen(true);
    } else {
      setIsAssignModalOpen(false);
    }
  };

  const handleOpenSelectStudentsModal = (opportunityData) => {
    setIsSelectStudentsModalOpen(true);
    setOpportunityDetailsForSelection(opportunityData);
    setSelectedStudents([]);
  };

  const handleCloseSelectStudentsModal = () => {
    if (selectedStudents.length > 0) {
      setIsDiscardModalOpen(true);
    } else {
      setIsSelectStudentsModalOpen(false);
      setOpportunityDetailsForSelection(null);
    }
  };

  const handleOpenConfirmSaveModal = () => {
    setIsConfirmSaveModalOpen(true);
  };

  const handleCloseConfirmSaveModal = () => {
    setIsConfirmSaveModalOpen(false);
  };

  const handleOpenDiscardModal = () => {
    setIsDiscardModalOpen(true);
  };

  const handleCloseDiscardModal = () => {
    setIsDiscardModalOpen(false);
  };

  const handleConfirmDiscard = () => {
    setIsDiscardModalOpen(false);
    setIsAssignModalOpen(false);
    setIsSelectStudentsModalOpen(false);
    setOpportunityDetailsForSelection(null);
    setSelectedStudents([]);
    setNewOpportunity({
      domain: "",
      selectedBatch: "",
      companyName: "",
      driveDate: "",
      driveRole: "",
      package: "",
    });
  };

  const handleAssignSubmit = (formData) => {
    setNewOpportunity(formData);
    setIsAssignModalOpen(false);
    handleOpenSelectStudentsModal(formData);
  };

  const handleSaveSelectedStudents = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }
    handleOpenConfirmSaveModal();
  };

  const handleConfirmSave = () => {
    const finalOpportunity = {
      ...newOpportunity,
      selectedStudents: selectedStudents,
      id: Date.now().toString(),
    };

    addOpportunity(finalOpportunity, newOpportunity.domain);

    handleCloseConfirmSaveModal();
    setIsSelectStudentsModalOpen(false);
    setOpportunityDetailsForSelection(null);
    setSelectedStudents([]);
    setNewOpportunity({
      domain: "",
      selectedBatch: "",
      companyName: "",
      driveDate: "",
      driveRole: "",
      package: "",
    });
  };

  // ✅ updated to open details modal
  const handleViewOpportunityDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsViewDetailsModalOpen(true);
  };

  const handleCloseViewDetailsModal = () => {
    setSelectedOpportunity(null);
    setIsViewDetailsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      
      <main className="ml-[5px] flex-1 min-h-0 overflow-auto p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Placement Opportunities
          </h1>
          <CreateButton onClick={handleOpenAssignModal} />
        </div>

        <div className="flex-1  min-h-0 overflow-auto">
          <OpportunitiesCardGrid
            items={allOpportunities}
            onViewDetails={handleViewOpportunityDetails}
          />
        </div>
      </main>

      {/* Modals */}
      {isAssignModalOpen && (
        <AssignOpportunityModal
          isOpen={isAssignModalOpen}
          onClose={handleCloseAssignModal}
          onSubmit={handleAssignSubmit}
          formData={newOpportunity}
          setFormData={setNewOpportunity}
          domains={domains}
          allStudentData={allStudentData}
        />
      )}

      {isSelectStudentsModalOpen && opportunityDetailsForSelection && (
        <SelectStudentsModal
          isOpen={isSelectStudentsModalOpen}
          onClose={handleCloseSelectStudentsModal}
          opportunityDetails={opportunityDetailsForSelection}
          filteredStudents={filteredBatchStudents}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          onSave={handleSaveSelectedStudents}
        />
      )}

      {isConfirmSaveModalOpen && (
        <ConfirmSaveModal
          isOpen={isConfirmSaveModalOpen}
          onClose={handleCloseConfirmSaveModal}
          onConfirm={handleConfirmSave}
          name={newOpportunity.companyName || "this opportunity"}
        />
      )}

      {isDiscardModalOpen && (
        <DiscardModal
          isOpen={isDiscardModalOpen}
          onClose={handleCloseDiscardModal}
          onConfirm={handleConfirmDiscard}
        />
      )}

      {/* ✅ new details modal */}
      {isViewDetailsModalOpen && selectedOpportunity && (
        <ViewOpportunityDetailsModal
          isOpen={isViewDetailsModalOpen}
          onClose={handleCloseViewDetailsModal}
          opportunityData={selectedOpportunity}
          allStudentData={allStudentData} // Pass allStudentData directly
        />
      )}
    </div>
  );
}
