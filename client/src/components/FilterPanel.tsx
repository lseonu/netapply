"use client";
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Filter {
  id: string;
  label: string;
  value: string | boolean;
  type: 'select' | 'boolean';
  options?: { value: string; label: string }[];
}

export function FilterPanel() {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const filterOptions: Filter[] = [
    {
      id: 'jobType',
      label: 'Job Type',
      value: '',
      type: 'select',
      options: [
        { value: 'fullTime', label: 'Full Time' },
        { value: 'partTime', label: 'Part Time' },
        { value: 'internship', label: 'Internship' },
        { value: 'contract', label: 'Contract' },
      ],
    },
    {
      id: 'experienceLevel',
      label: 'Experience Level',
      value: '',
      type: 'select',
      options: [
        { value: 'entry', label: 'Entry Level' },
        { value: 'mid', label: 'Mid Level' },
        { value: 'senior', label: 'Senior Level' },
        { value: 'lead', label: 'Lead' },
        { value: 'executive', label: 'Executive' },
      ],
    },
    {
      id: 'location',
      label: 'Location Type',
      value: '',
      type: 'select',
      options: [
        { value: 'onsite', label: 'On-site' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'remote', label: 'Remote' },
      ],
    },
    {
      id: 'visaSponsorship',
      label: 'Visa Sponsorship',
      value: false,
      type: 'boolean',
    },
    {
      id: 'salary',
      label: 'Salary Range',
      value: '',
      type: 'select',
      options: [
        { value: '0-50', label: '$0 - $50,000' },
        { value: '50-100', label: '$50,000 - $100,000' },
        { value: '100-150', label: '$100,000 - $150,000' },
        { value: '150-200', label: '$150,000 - $200,000' },
        { value: '200+', label: '$200,000+' },
      ],
    },
    {
      id: 'companySize',
      label: 'Company Size',
      value: '',
      type: 'select',
      options: [
        { value: 'startup', label: 'Startup (1-50)' },
        { value: 'small', label: 'Small (51-200)' },
        { value: 'medium', label: 'Medium (201-1000)' },
        { value: 'large', label: 'Large (1000+)' },
      ],
    },
  ];

  const handleFilterChange = (filterId: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const removeFilter = (filterId: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterId];
    setActiveFilters(newFilters);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center space-x-4">
        <Menu as="div" className="relative">
          <Menu.Button className="btn-secondary flex items-center space-x-2">
            <span>Add Filter</span>
            <ChevronDownIcon className="w-4 h-4" />
          </Menu.Button>
          <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-left bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2">
              {filterOptions.map(filter => (
                <Menu.Item key={filter.id}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        if (filter.type === 'boolean') {
                          handleFilterChange(filter.id, true);
                        } else if (filter.options?.[0]) {
                          handleFilterChange(filter.id, filter.options[0].value);
                        }
                      }}
                    >
                      {filter.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterId, value]) => {
            const filter = filterOptions.find(f => f.id === filterId);
            if (!filter) return null;

            const displayValue = filter.type === 'boolean' 
              ? filter.label 
              : filter.options?.find(opt => opt.value === value)?.label;

            return (
              <div
                key={filterId}
                className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm"
              >
                <span>{filter.label}: {displayValue}</span>
                <button
                  onClick={() => removeFilter(filterId)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(activeFilters).map(([filterId, value]) => {
          const filter = filterOptions.find(f => f.id === filterId);
          if (!filter || filter.type === 'boolean') return null;

          return (
            <div key={filterId} className="min-w-[200px]">
              <select
                value={value}
                onChange={(e) => handleFilterChange(filterId, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {filter.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
} 