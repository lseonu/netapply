"use client";
import React from 'react';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  postedDate: Date;
  deadline?: Date;
  requirements: string[];
  description: string;
  status: 'saved' | 'applied' | 'expired';
}

interface SavedJobCardProps {
  job?: SavedJob;
}

export const SavedJobCard: React.FC<SavedJobCardProps> = ({ job }) => {
  if (!job) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          job.status === 'saved' ? 'bg-blue-100 text-blue-800' :
          job.status === 'applied' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {job.type && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {job.type}
            </span>
          )}
          {job.salary && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {job.salary}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted: {new Date(job.postedDate).toLocaleDateString()}
        </span>
        <div className="space-x-3">
          <button className="btn-primary">
            Apply Now
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}; 