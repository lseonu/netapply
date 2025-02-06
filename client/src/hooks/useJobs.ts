import { useState, useEffect } from 'react';
import { Job } from '../types';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching jobs
    setTimeout(() => {
      setJobs([
        { id: '1', title: 'Software Engineer', company: 'Tech Corp', location: 'New York', status: 'open', visaSponsorship: true },
        // Add more mock jobs here
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { jobs, loading, error };
} 