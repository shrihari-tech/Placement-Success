"use client";
import React from "react";
import { useDataContext } from "../context/dataContext";

export default function BatchesPage() {
  //access the datacontext
  const { batchingvalue, setBatchingValue } = useDataContext();

  return (
    <div className="min-h-screen">
      <h1>
        {`The page Batches ${batchingvalue || 'No category selected'}`}
      </h1>

      {/* Debug info */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Current batch value: <strong>{batchingvalue || 'None'}</strong></p>
        <button 
          onClick={() => setBatchingValue('test-value')}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Set Value
        </button>
      </div>
    </div>
  );
}