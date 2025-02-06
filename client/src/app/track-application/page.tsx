"use client";
import React, { useState } from 'react';
import { ApplicationStatus } from '../../types/index'; // Updated import path
import { Sidebar } from '../../components/Sidebar';
import ClientLayout from '../../components/ClientLayout';
import { ApplicationCard } from '../../components/ApplicationCard';
import { ApplicationStats } from '../../components/ApplicationStats';
import { ApplicationFilters } from '../../components/ApplicationFilters';

export default function TrackApplicationPage() {
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | 'all'>('all');

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Track Applications</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage your job applications</p>
          </div>

          {/* Stats Overview */}
          <ApplicationStats />

          {/* Filters and Actions */}
          <div className="my-6">
            <ApplicationFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {/* Applications Grid */}
          <div className="grid gap-6">
            <ApplicationCard />
          </div>
        </main>
      </div>
    </ClientLayout>
  );
} 