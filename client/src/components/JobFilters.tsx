"use client";
import React from 'react';

interface JobFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'all' 
            ? 'bg-primary-main text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        All Jobs
      </button>
      <button
        onClick={() => onFilterChange('saved')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'saved' 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Saved
      </button>
      <button
        onClick={() => onFilterChange('applied')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'applied' 
            ? 'bg-green-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Applied
      </button>
      <button
        onClick={() => onFilterChange('expired')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'expired' 
            ? 'bg-red-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Expired
      </button>
    </div>
  );
}; 