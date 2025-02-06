"use client";
import React from 'react';
import { Sidebar } from '@components/Sidebar';
import ClientLayout from '@components/ClientLayout';

export default function ProfilePage() {
  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your profile information</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Professional Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Position</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your current position"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </ClientLayout>
  );
} 