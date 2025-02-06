"use client";
import React from 'react';
import { SearchBar } from '@components/SearchBar';
import { FilterPanel } from '@components/FilterPanel';
import { JobDashboard } from '@components/JobDashboard';
import { AIAssistant } from '@components/AIAssistant';
import { useAuth } from '@hooks/useAuth';
import { Sidebar } from '@components/Sidebar';
import ClientLayout from '@components/ClientLayout';

export default function Home() {
  const { user, loading } = useAuth();
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Job Dashboard</h1>
          <div className="space-y-6">
            <SearchBar />
            <FilterPanel />
            <JobDashboard />
          </div>
        </main>
      </div>

      {showAIAssistant && (
        <AIAssistant 
          isOpen={showAIAssistant} 
          onClose={() => setShowAIAssistant(false)} 
        />
      )}
    </ClientLayout>
  );
}
