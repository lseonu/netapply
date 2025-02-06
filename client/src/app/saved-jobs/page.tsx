"use client";
import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import ClientLayout from '../../components/ClientLayout';
import { SavedJobCard } from '../../components/SavedJobCard';
import { JobFilters } from '../../components/JobFilters';

export default function SavedJobsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Saved Jobs</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track your saved job opportunities</p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <JobFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {/* Saved Jobs Grid */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <SavedJobCard />
          </div>
        </main>
      </div>
    </ClientLayout>
  );
} 