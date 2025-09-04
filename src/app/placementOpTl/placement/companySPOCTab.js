// placementOpTl/placement/companySPOC.js
"use client";
import React, { useState } from "react";
import Navbar from "../navbar";
import CreateButton from "../components/createButton";
import CreateModal from "../components/createModal";
import CardGrid from "../components/cardGrid";
import PreviewModal from "../components/previewModal";

export default function CompanySPOCTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spocs, setSpocs] = useState([]);
  const [selectedSPOC, setSelectedSPOC] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddSPOC = (spoc) => {
    const newSPOC = { ...spoc, id: Date.now() };
    setSpocs((prev) => [newSPOC, ...prev]);
  };

  const handleViewDetails = (spoc) => {
    setSelectedSPOC(spoc);
    setIsPreviewOpen(true);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="ml-[10px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Company SPOC</h1>
          <CreateButton onClick={() => setIsModalOpen(true)} />
        </div>

        <CardGrid items={spocs} onViewDetails={handleViewDetails} />

        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddSPOC}
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
            // Add null/undefined guard
            if (!value && value !== "")
              return `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is required`;

            const trimmedValue = value.trim();

            switch (field) {
              case "name":
              case "company":
              case "address":
                return trimmedValue ? "" : "This field is required";
              case "email":
                if (!trimmedValue) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(trimmedValue)
                  ? ""
                  : "Invalid email format";
              case "phone":
                if (!trimmedValue) return "Phone is required";
                if (!/^[6-9]/.test(trimmedValue))
                  return "Phone must start with 6-9";
                if (trimmedValue.length !== 10)
                  return "Phone must be 10 digits";
                return /^\d{10}$/.test(trimmedValue)
                  ? ""
                  : "Invalid phone number";
              default:
                return "";
            }
          }}
        />

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          data={selectedSPOC}
        />
      </main>
    </div>
  );
}
