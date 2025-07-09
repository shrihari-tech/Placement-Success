"use client";
import React from "react";

export default function BatchesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Batches Management</h1>
        <p className="text-gray-600">Manage and view all your training batches</p>
      </div>
      
      {/* Batch Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-blue-600 font-bold">FS</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Full Stack Development</h3>
              <p className="text-sm text-gray-500">15 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Complete web development training program</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            View Batches
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-green-600 font-bold">DA</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Data Analytics & Science</h3>
              <p className="text-sm text-gray-500">8 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Advanced data analysis and machine learning</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
            View Batches
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-purple-600 font-bold">BF</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Banking & Financial Services</h3>
              <p className="text-sm text-gray-500">12 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Financial sector training and certification</p>
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
            View Batches
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-orange-600 font-bold">DM</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Digital Marketing</h3>
              <p className="text-sm text-gray-500">6 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Modern digital marketing strategies</p>
          <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
            View Batches
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-indigo-600 font-bold">SAP</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">SAP</h3>
              <p className="text-sm text-gray-500">4 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Enterprise resource planning solutions</p>
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            View Batches
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-red-600 font-bold">DO</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">DevOps</h3>
              <p className="text-sm text-gray-500">7 Active Batches</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Development and operations integration</p>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
            View Batches
          </button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">New batch created: Full Stack Batch #16</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">New</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">Data Analytics Batch #5 completed</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Completed</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-800">DevOps Batch #3 started</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}