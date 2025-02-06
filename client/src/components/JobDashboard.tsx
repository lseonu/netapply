'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { useJobs } from '../hooks/useJobs';
import { Job } from '../types';

export const JobDashboard = () => {
  const { jobs, loading, error } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    sponsorship: false,
  });

  useEffect(() => {
    if (jobs) {
      setFilteredJobs(
        jobs.filter((job) => {
          if (filters.status !== 'all' && job.status !== filters.status) return false;
          if (filters.location !== 'all' && job.location !== filters.location) return false;
          if (filters.sponsorship && !job.visaSponsorship) return false;
          return true;
        })
      );
    }
  }, [jobs, filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">Job Dashboard</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Job
        </button>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        {/* Add filter components */}
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}; 