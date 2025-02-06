"use client";
import React from 'react';
import { ApplicationStatus } from '@/types';

interface ApplicationFiltersProps {
  activeFilter: ApplicationStatus | 'all';
  onFilterChange: (filter: ApplicationStatus | 'all') => void;
}

export const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({ activeFilter, onFilterChange }) => {
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
        All
      </button>
      <button
        onClick={() => onFilterChange('applied')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'applied' 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Applied
      </button>
      <button
        onClick={() => onFilterChange('interviewing')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'interviewing' 
            ? 'bg-yellow-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Interviewing
      </button>
      <button
        onClick={() => onFilterChange('accepted')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'accepted' 
            ? 'bg-green-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Accepted
      </button>
      <button
        onClick={() => onFilterChange('rejected')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeFilter === 'rejected' 
            ? 'bg-red-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Rejected
      </button>
    </div>
  );
}; 