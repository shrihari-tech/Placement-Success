// placementOpTl/placement/companySPOC.js
"use client";
import React, { useState, useEffect } from "react";
import { notification } from 'antd'; // Import notification
import { RiCloseCircleLine } from 'react-icons/ri'; // Import the icon
import Navbar from "../navbar";
import CreateButton from "../components/createButton";
import CreateModal from "../components/createModal"; 
import CardGrid from "../components/cardGrid";
import PreviewModal from "../components/previewModal";


export default function CompanySPOCTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for SPOCs, initialized from localStorage or empty array
  const [spocs, setSpocs] = useState(() => {
    if (typeof window !== "undefined") {
      try 
      {
        const savedSpocs = localStorage.getItem("companySpocs");
        return savedSpocs ? JSON.parse(savedSpocs) : [];
      } catch (error) {
        console.error("Failed to parse companySpocs from localStorage:", error);
        // Show error notification on initial load failure
        setTimeout(() => { // Delay to ensure api is ready
           api.error({
             message: 'Storage Error',
             description: 'Failed to load SPOC data.',
             placement: 'topRight',
             duration: 5,
             showProgress: true,
             pauseOnHover: true,
             closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
           });
        }, 0);
        return []; 
      }
    }
    return []; // Default for server-side rendering
  });

  const [selectedSPOC, setSelectedSPOC] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewEditMode, setIsPreviewEditMode] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification(); 

  // Effect to save spocs to localStorage whenever the spocs state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("companySpocs", JSON.stringify(spocs));
      } catch (error) {
        console.error("Failed to save companySpocs to localStorage:", error);
        // Show error notification if saving fails using the custom style
        api.error({
          message: 'Storage Error',
          description: 'Failed to save SPOC data. Changes might be lost on refresh.',
          placement: 'topRight',
          duration: 5,
          showProgress: true,
          pauseOnHover: true,
          closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
        });
      }
    }
  }, [spocs, api]); // Dependency array: run effect when 'spocs' or 'api' changes

  const handleAddSPOC = (spoc) => {
    const newSPOC = { ...spoc, id: Date.now() }; // Consider using a more robust ID generator
    setSpocs((prev) => [newSPOC, ...prev]);
    
    // Show success notification using the custom style with #a17640
    api.success({
      message: 'Success',
      description: 'Company SPOC added successfully!',
      placement: 'topRight',
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
      closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
    });
  };
  // Handle updating an existing SPOC
const handleUpdateSPOC = (updatedData) => {
  setSpocs(prevSpocs =>
    prevSpocs.map(spoc =>
      spoc.id === updatedData.id ? { ...spoc, ...updatedData } : spoc
    )
  );

  // Show success notification
  api.success({
    message: 'Success',
    description: 'SPOC updated successfully!',
    placement: 'topRight',
    duration: 3,
    showProgress: true,
    pauseOnHover: true,
    closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
  });

  // Close modal after update
  setIsPreviewOpen(false);
  setIsPreviewEditMode(false);
};

// Handle deleting an SPOC
const handleDeleteSPOC = (id) => {
  setSpocs(prevSpocs => prevSpocs.filter(spoc => spoc.id !== id));

  // Show success notification
  api.success({
    message: 'Deleted',
    description: 'SPOC deleted successfully!',
    placement: 'topRight',
    duration: 3,
    showProgress: true,
    pauseOnHover: true,
    closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
  });

  // Close modal after delete
  setIsPreviewOpen(false);
  setIsPreviewEditMode(false);
};

  const handleViewDetails = (spoc) => {
    setSelectedSPOC(spoc);
    setIsPreviewOpen(true);
  };

  // Optional: Add error handling for JSON parsing/serialization if needed elsewhere

  return (
    <div className="h-screen overflow-hidden">
      {/* Include the context holder for notifications */}
      {contextHolder} 
      {/* Add custom styles for notifications */}
      <style jsx global>{`
        /* Custom notification styles for #a17640 */
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #a17640 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-icon,
        .ant-notification-notice-error .ant-notification-notice-icon,
        .ant-notification-notice-warning .ant-notification-notice-icon,
        .ant-notification-notice-info .ant-notification-notice-icon {
          color: #a17640 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-message,
        .ant-notification-notice-error .ant-notification-notice-message,
        .ant-notification-notice-warning .ant-notification-notice-message,
        .ant-notification-notice-info .ant-notification-notice-message {
          color: #a17640 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #a17640 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #a17640 !important;
        }
        /* Custom close icon styling */
        .ant-notification-notice-close {
          transition: all 0.3s ease;
        }
        /* Ensure progress bar container also uses the color */
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important; /* Light version of #a17640 */
        }
      `}</style>
      <Navbar />
      <main className="ml-[5px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Company SPOC</h1>
          <CreateButton onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Pass the spocs data to CardGrid */}
        <CardGrid items={spocs} onViewDetails={handleViewDetails} />

        {/* Create Modal for adding new SPOCs, passing the notification API */}
        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddSPOC} // Use the updated handleAddSPOC
          notificationApi={api} // Pass the notification API
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
          validateField={(field, value, notifyError) => { // Accept notifyError function
            if (!value) { // Simplified check, handles null, undefined, empty string
              const errorMsg = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
              if (notifyError) notifyError(errorMsg); // Show notification if requested
              return errorMsg; 
            }

            const trimmedValue = value.trim();
            let error = "";

            switch (field) {
              case "name":
              case "company":
              case "address":
                error = trimmedValue ? "" : "This field is required";
                break;
              case "email":
                if (!trimmedValue) {
                   error = "Email is required";
                } else {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  error = emailRegex.test(trimmedValue) ? "" : "Invalid email format";
                }
                break;
              case "phone":
                if (!trimmedValue) {
                   error = "Phone is required";
                } else if (!/^[6-9]/.test(trimmedValue)) {
                  error = "Phone must start with 6, 7, 8, or 9";
                } else if (trimmedValue.length !== 10) {
                  error = "Phone must be 10 digits";
                } else if (!/^\d{10}$/.test(trimmedValue)) {
                   error = "Invalid phone number";
                }
                break;
              default:
                error = ""; // No validation error for other fields
            }

            if (error && notifyError) {
               notifyError(error); // Show notification if there's an error and requested
            }
            return error; 
          }}
        />

        {/* Preview Modal for viewing SPOC details */}
        <PreviewModal
  isOpen={isPreviewOpen}
  onClose={() => {
    setIsPreviewOpen(false);
    setIsPreviewEditMode(false); // Reset edit mode when closing
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