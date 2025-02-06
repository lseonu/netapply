"use client";
import React from 'react';

export const ApplicationStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Interview Rate</h3>
        <p className="mt-2 text-3xl font-semibold text-green-600">42%</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending Response</h3>
        <p className="mt-2 text-3xl font-semibold text-yellow-600">8</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Offers Received</h3>
        <p className="mt-2 text-3xl font-semibold text-blue-600">2</p>
      </div>
    </div>
  );
}; 