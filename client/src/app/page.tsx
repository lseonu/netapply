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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to NetApply</h2>
          <p className="text-gray-600 mb-6">Please login to continue</p>
          <button className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
              <p className="text-gray-600 mt-1">Track and manage your job applications</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>AI Assistant</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <SearchBar />
              <FilterPanel />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <JobDashboard />
            </div>
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
