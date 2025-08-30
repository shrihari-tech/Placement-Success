"use client";
import React, { useState } from "react";

const ButtonWithForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    rol: "Placement TL",
    password: "Welcome@123",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phno: "",
      rol: "Placement TL",
      password: "Welcome@123",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., API call)
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phno: "",
      rol: "Placement TL",
      password: "Welcome@123",
    });
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        Open Form
      </button>
      {showForm && (
        <div className="mt-4 p-4 border rounded shadow bg-white max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="phno"
              placeholder="Phone Number"
              value={formData.phno}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="rol"
              placeholder="Role"
              value={formData.rol}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ButtonWithForm;