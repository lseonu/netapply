import React from 'react';
import { Job } from '../types';

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      {/* Add more job details here */}
    </div>
  );
};

export default JobCard; 