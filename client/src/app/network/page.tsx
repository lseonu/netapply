"use client";
import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import ClientLayout from '../../components/ClientLayout';
import { NetworkSearch } from '../../components/NetworkSearch';
import { ConnectionCard } from '../../components/ConnectionCard';
import { NetworkStats } from '../../components/NetworkStats';

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Network</h1>
            <p className="text-sm text-gray-500 mt-1">Find and connect with professionals in your target companies</p>
          </div>

          {/* Network Stats */}
          <NetworkStats />

          {/* Search Section */}
          <div className="mt-8">
            <NetworkSearch onSearch={setSearchQuery} />
          </div>

          {/* Connections Grid */}
          <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ConnectionCard />
          </div>
        </main>
      </div>
    </ClientLayout>
  );
} 