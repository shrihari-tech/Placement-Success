// placementOpHead/tl/page.js
"use client";
import React, { useState, useMemo, useEffect } from "react"; // Added useEffect
import Navbar from "../navbar";
import CreateButton from "./components/createButton";
import CreateUserModal from "./components/createModal";
import TLCardGrid from "./components/tlCardGrid";
import TLPreviewModal from "./components/tlPreviewModal";
import { toast } from "sonner";

// Key for localStorage
const TL_STORAGE_KEY = "placementOpHead_teamLeaders";

export default function TLPage() {
  // Initialize state from localStorage or as an empty array
  const [teamLeaders, setTeamLeaders] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(TL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTL, setSelectedTL] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Save teamLeaders to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TL_STORAGE_KEY, JSON.stringify(teamLeaders));
    }
  }, [teamLeaders]);

  const handleCreateUser = (userData) => {
    console.log("Creating user:", userData);
    const newTL = {
      id: Date.now().toString(), // Consider using a more robust ID generator
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      password: userData.password,
    };
    setTeamLeaders((prevTLs) => [...prevTLs, newTL]);
    toast.success(`Team Leader ${userData.name} created successfully!`);
  };

  const handleDeleteTL = (tlId) => {
    const tlToDelete = teamLeaders.find((tl) => tl.id === tlId);
    if (tlToDelete) {
      setTeamLeaders((prevTLs) => prevTLs.filter((tl) => tl.id !== tlId));
      toast.success(`Team Leader ${tlToDelete.name} deleted successfully!`);
    }
    setIsPreviewModalOpen(false);
    setSelectedTL(null);
  };

  const handleUpdateTL = (updatedTLData) => {
    setTeamLeaders((prevTLs) =>
      prevTLs.map((tl) => (tl.id === updatedTLData.id ? updatedTLData : tl))
    );
    setSelectedTL(updatedTLData);
    setIsEditMode(false);
    toast.success(`Team Leader updated successfully!`);
  };

  const handleViewDetails = (tl) => {
    setSelectedTL(tl);
    setIsPreviewModalOpen(true);
    setIsEditMode(false);
  };

  const sortedTeamLeaders = useMemo(() => {
    return [...teamLeaders].sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }, [teamLeaders]);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <main className="ml-0 md:ml-[10px] pt-16 md:pt-1 ps-0 h-full overflow-y-auto">
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