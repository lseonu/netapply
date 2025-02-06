"use client";
import React from 'react';
import { JobApplication, ApplicationStatus } from '@/types';

const statusColors: Record<ApplicationStatus, { bg: string; text: string }> = {
  applied: { bg: 'bg-blue-100', text: 'text-blue-800' },
  interviewing: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  accepted: { bg: 'bg-green-100', text: 'text-green-800' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800' },
};

export const ApplicationCard: React.FC<{ application?: JobApplication }> = ({ application }) => {
  if (!application) return null;

  const { bg, text } = statusColors[application.status];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{application.position}</h3>
          <p className="text-sm text-gray-500">{application.companyName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
          {application.status}
        </span>
      </div>

      {application.interviews && application.interviews.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Upcoming Interview</h4>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              {new Date(application.interviews[0].date).toLocaleDateString()} - {application.interviews[0].type}
            </p>
            {application.interviews[0].link && (
              <a 
                href={application.interviews[0].link} 
                className="text-sm text-primary-main hover:text-primary-dark mt-1 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
        <button className="text-primary-main hover:text-primary-dark">
          View Details
        </button>
      </div>
    </div>
  );
}; 