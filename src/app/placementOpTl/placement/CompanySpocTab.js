"use client";
import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { RiCloseCircleLine } from "react-icons/ri";
import Navbar from "../navbar";
import CreateButton from "../components/createButton";
import CreateModal from "../components/createModal";
import CardGrid from "../components/cardGrid";
import PreviewModal from "../components/previewModal";

export default function CompanySPOCTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spocs, setSpocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSPOC, setSelectedSPOC] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewEditMode, setIsPreviewEditMode] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  // ✅ Fetch SPOCs from API on load
  useEffect(() => {
    const fetchSpocs = async () => {
      try {
        const res = await fetch("http://localhost:5000/spocs/allSPCOS");
        if (!res.ok) throw new Error("Failed to fetch SPOCs");
        const data = await res.json();
        setSpocs(data);
      } catch (err) {
        console.error("Fetch error:", err);
        api.error({
          message: "Load Error",
          description: "Failed to load SPOC data from server.",
          placement: "topRight",
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSpocs();
  }, [api]);

  // ✅ Create SPOC via API
  const handleAddSPOC = async (spoc) => {
    try {
      const res = await fetch("http://localhost:5000/spocs/createSPOC", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spoc),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create SPOC");
      }

      const result = await res.json();
      // ✅ Add new SPOC to state (with server-generated ID)
      setSpocs((prev) => [{ ...spoc, id: result.id }, ...prev]);

      api.success({
        message: "Success",
        description: "Company SPOC added successfully!",
        placement: "topRight",
        duration: 3,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Create error:", err);
      api.error({
        message: "Create Failed",
        description: err.message,
        placement: "topRight",
        duration: 5,
      });
    }
  };

  // ✅ Update SPOC via API
  const handleUpdateSPOC = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/spoc/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update SPOC");

      setSpocs((prev) =>
        prev.map((spoc) => (spoc.id === updatedData.id ? updatedData : spoc))
      );

      api.success({
        message: "Success",
        description: "SPOC updated successfully!",
        placement: "topRight",
        duration: 3,
      });
      setIsPreviewOpen(false);
      setIsPreviewEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      api.error({
        message: "Update Failed",
        description: err.message,
        placement: "topRight",
        duration: 5,
      });
    }
  };

  // ✅ Delete SPOC via API
  const handleDeleteSPOC = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/spoc/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete SPOC");

      setSpocs((prev) => prev.filter((spoc) => spoc.id !== id));

      api.success({
        message: "Deleted",
        description: "SPOC deleted successfully!",
        placement: "topRight",
        duration: 3,
      });
      setIsPreviewOpen(false);
      setIsPreviewEditMode(false);
    } catch (err) {
      console.error("Delete error:", err);
      api.error({
        message: "Delete Failed",
        description: err.message,
        placement: "topRight",
        duration: 5,
      });
    }
  };

  const handleViewDetails = (spoc) => {
    setSelectedSPOC(spoc);
    setIsPreviewOpen(true);
  };

  return (
    <div className="h-screen overflow-hidden">
      {contextHolder}
      <style jsx global>{`
        /* Keep your existing notification styles */
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #a17640 !important;
        }
        /* ... rest of your styles ... */
      `}</style>

      <Navbar />
      <main className="ml-[5px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Company SPOC</h1>
          <CreateButton onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Show loading state */}
        {loading ? (
          <div className="text-center py-8">Loading SPOCs...</div>
        ) : (
          <CardGrid items={spocs} onViewDetails={handleViewDetails} />
        )}

        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddSPOC}
          notificationApi={api}
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "company", label: "Company", required: true },
            { name: "address", label: "Address", required: true },
            { name: "email", label: "Email", required: true },
            { name: "phone", label: "Phone", required: true },
          ]}
          initialValues={{
            name: "",
            company: "",
            address: "",
            email: "",
            phone: "",
          }}
          validateField={(field, value) => {
            if (!value?.trim()) return `${field} is required`;

            if (field === "email") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value.trim())) return "Invalid email format";
            }

            if (field === "phone") {
              const phone = value.trim();
              if (!/^[6-9]\d{9}$/.test(phone)) return "Invalid phone number";
            }

            return "";
          }}
        />

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setIsPreviewEditMode(false);
          }}
          data={selectedSPOC}
          isEditMode={isPreviewEditMode}
          setIsEditMode={setIsPreviewEditMode}
          onDelete={handleDeleteSPOC}
          onUpdate={handleUpdateSPOC}
        />
      </main>
    </div>
  );
}
