"use client";
import React, { useState } from 'react';
import { NetworkSearchParams } from '../types/network';

interface NetworkSearchProps {
  onSearch: (query: string) => void;
}

export const NetworkSearch: React.FC<NetworkSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<NetworkSearchParams>({
    company: '',
    role: '',
    location: '',
    keywords: [],
  });

  const handleSearch = () => {
    // Implement search logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter company name"
            value={searchParams.company}
            onChange={(e) => setSearchParams({ ...searchParams, company: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter target role"
            value={searchParams.role}
            onChange={(e) => setSearchParams({ ...searchParams, role: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter location"
            value={searchParams.location}
            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleSearch}
          className="btn-primary"
        >
          Find Connections
        </button>
      </div>
    </div>
  );
}; 