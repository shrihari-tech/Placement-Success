"useclient"
import React from "react"
import NavBar from "../navBar/page";

export default function batchesPage() {
  return (
    <div className="container mx-auto p-4">
        <NavBar />
        {/* Main Content */}
      <h1 className="text-2xl font-bold mb-4">Batches</h1>
      <p>This is the batches page where you can manage different batches.</p>
      {/* Add more batch management options here */}
    </div>
  );
}