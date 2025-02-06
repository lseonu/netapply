"use client";
import React from 'react';

export const NetworkStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Connections</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">156</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
        <p className="mt-2 text-3xl font-semibold text-blue-600">12</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Coffee Chats</h3>
        <p className="mt-2 text-3xl font-semibold text-green-600">8</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
        <p className="mt-2 text-3xl font-semibold text-yellow-600">65%</p>
      </div>
    </div>
  );
}; 