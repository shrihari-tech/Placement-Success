// placementOpHead/tl/page.js
"use client";
import React, { useState, useMemo } from "react"; // Added useMemo
import Navbar from "../navbar";
import CreateButton from "./components/createButton";
import CreateUserModal from "./components/createModal";
import TLCardGrid from "./components/tlCardGrid"; // Import the new component
import TLPreviewModal from "./components/tlPreviewModal"; // Import the new preview modal
import { toast } from "sonner";

export default function TLPage() {
  // State to hold the list of Team Leaders
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // State for Preview/Edit Modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTL, setSelectedTL] = useState(null); // TL being viewed/edited
  const [isEditMode, setIsEditMode] = useState(false); // Flag for edit mode in preview modal

  // Handler for creating a new TL
  const handleCreateUser = (userData) => {
    console.log("Creating user:", userData);
    const newTL = {
      id: Date.now().toString(), // Simple unique ID based on timestamp
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      password: userData.password,
    };
    setTeamLeaders((prevTLs) => [...prevTLs, newTL]); // Add to the end of the list
    toast.success(`Team Leader ${userData.name} created successfully!`);
  };

  // Handler for deleting a TL
  const handleDeleteTL = (tlId) => {
    const tlToDelete = teamLeaders.find((tl) => tl.id === tlId);
    if (tlToDelete) {
      setTeamLeaders((prevTLs) => prevTLs.filter((tl) => tl.id !== tlId));
      toast.success(`Team Leader ${tlToDelete.name} deleted successfully!`);
    }
    setIsPreviewModalOpen(false); // Close preview modal after delete
    setSelectedTL(null);
  };

  // Handler for updating a TL
  const handleUpdateTL = (updatedTLData) => {
    setTeamLeaders((prevTLs) =>
      prevTLs.map((tl) => (tl.id === updatedTLData.id ? updatedTLData : tl))
    );
    setSelectedTL(updatedTLData); // Update the selected TL data
    setIsEditMode(false); // Exit edit mode
    toast.success(`Team Leader updated successfully!`);
  };

  // Handler for opening the preview modal
  const handleViewDetails = (tl) => {
    setSelectedTL(tl);
    setIsPreviewModalOpen(true);
    setIsEditMode(false); // Ensure it starts in preview mode
  };

  // Sort team leaders by ID (timestamp) descending (newest first)
  const sortedTeamLeaders = useMemo(() => {
    return [...teamLeaders].sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }, [teamLeaders]);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <main className="ml-0 md:ml-[10px] pt-1 md:pt-1 ps-0 h-full overflow-y-auto">
        {/* Header Section with Bottom Border */}
        <div className="border-b-2 border-gray-300 bg-white ps-8 pt-2 mb-2 md:mb-4">
          <h1 className="text-xl md:text-2xl text-gray-700 font-semibold mb-2">
            Placement TL Management
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 ps-7">
          <div className="mb-6 flex justify-end">
            <CreateButton onClick={() => setIsCreateModalOpen(true)} />
          </div>

          {/* Display the TL Cards */}
          <TLCardGrid
            teamLeaders={sortedTeamLeaders}
            onViewDetails={handleViewDetails}
          />

          {/* Create Modal */}
          <CreateUserModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleCreateUser}
          />

          {/* Preview/Edit Modal */}
          {selectedTL && (
            <TLPreviewModal
              isOpen={isPreviewModalOpen}
              onClose={() => {
                setIsPreviewModalOpen(false);
                setSelectedTL(null);
                setIsEditMode(false);
              }}
              teamLeader={selectedTL}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              onDelete={handleDeleteTL}
              onUpdate={handleUpdateTL}
            />
          )}
        </div>
      </main>
    </div>
  );
}
