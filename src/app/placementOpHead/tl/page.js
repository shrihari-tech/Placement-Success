// placementOpHead/tl/page.js
"use client";
import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../navbar";
import CreateButton from "./components/createButton";
import CreateUserModal from "./components/createModal";
import TLCardGrid from "./components/tlCardGrid";
import TLPreviewModal from "./components/tlPreviewModal";
import { toast } from "sonner";

export default function TLPage() {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTL, setSelectedTL] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch team leaders from API
  const fetchTeamLeaders = async () => {
    try {
      const res = await fetch("http://localhost:5000/teamLeader");
      if (!res.ok) throw new Error("Failed to fetch team leaders");
      const data = await res.json();
      setTeamLeaders(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load team leaders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/teamLeader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.details?.email || result.error || "Failed to create team leader";
        toast.error(errorMsg);
        return;
      }

      // Optimistically update UI
      setTeamLeaders((prev) => [...prev, result]);
      toast.success(`Team Leader ${userData.name} created successfully!`);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleDeleteTL = async (tlId) => {
    try {
      const tlToDelete = teamLeaders.find((tl) => tl.id === tlId);
      if (!tlToDelete) return;

      const res = await fetch(`http://localhost:5000/teamLeader/${updatedTLData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        toast.error(result.error || "Failed to delete team leader");
        return;
      }

      // Optimistically update UI
      setTeamLeaders((prev) => prev.filter((tl) => tl.id !== tlId));
      toast.success(`Team Leader ${tlToDelete.name} deleted successfully!`);
      setIsPreviewModalOpen(false);
      setSelectedTL(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleUpdateTL = async (updatedTLData) => {
    try {
      const res = await fetch(`http://localhost:5000/teamLeader/${updatedTLData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTLData),
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.details?.email || result.error || "Failed to update team leader";
        toast.error(errorMsg);
        return;
      }

      // Optimistically update UI
      setTeamLeaders((prev) =>
        prev.map((tl) => (tl.id === updatedTLData.id ? result : tl))
      );
      setSelectedTL(result);
      setIsEditMode(false);
      toast.success(`Team Leader updated successfully!`);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update. Please try again.");
    }
  };

  const handleViewDetails = (tl) => {
    setSelectedTL(tl);
    setIsPreviewModalOpen(true);
    setIsEditMode(false);
  };

  const sortedTeamLeaders = useMemo(() => {
    return [...teamLeaders].sort((a, b) => {
      // Since IDs are strings (e.g., "1712345678901"), compare as numbers
      return parseInt(b.id) - parseInt(a.id);
    });
  }, [teamLeaders]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading team leaders...</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <main className="ml-0 h-full overflow-y-auto">
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