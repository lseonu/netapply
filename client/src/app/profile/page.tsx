"use client";
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@components/Sidebar';
import ClientLayout from '@components/ClientLayout';

export default function ProfilePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPosition: '',
    company: '',
    education: [],
    experience: [],
    skills: [],
    location: '',
    linkedIn: '',
    portfolio: '',
  });

  // Add saved profile state
  const [savedProfile, setSavedProfile] = useState(formData);

  // Fetch saved profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const profile = await response.json();
          setSavedProfile(profile);
          setFormData(profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSavedProfile(formData);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      setIsUploading(true);

      // Verify file type
      if (!file.type.includes('pdf')) {
        throw new Error('Please upload a PDF file');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // First, parse the PDF
      const pdfResponse = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!pdfResponse.ok) {
        const errorData = await pdfResponse.json();
        throw new Error(errorData.error || 'Failed to parse PDF');
      }

      const pdfData = await pdfResponse.json();
      
      if (!pdfData.text) {
        throw new Error('No text content found in PDF');
      }

      // Then, use AI to extract information
      const aiResponse = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'resume',
          content: `Parse this resume and return a JSON object with these fields: {
            "fullName": "string",
            "email": "string",
            "phone": "string",
            "currentPosition": "string",
            "company": "string",
            "education": ["string"],
            "experience": [{
              "title": "string",
              "company": "string",
              "duration": "string",
              "description": "string"
            }],
            "skills": ["string"],
            "location": "string"
          }
          
          Resume text: ${pdfData.text}`
        }),
      });

      if (!aiResponse.ok) {
        throw new Error('Failed to process resume with AI');
      }

      const { response: parsedData } = await aiResponse.json();
      
      try {
        // Ensure we're parsing valid JSON
        const structuredData = JSON.parse(parsedData);
        console.log('Parsed resume data:', structuredData);
        
        setFormData(prev => ({
          ...prev,
          ...structuredData
        }));
        
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        throw new Error('Invalid response format from AI');
      }

    } catch (error: any) {
      console.error('Error processing resume:', error);
      alert(error.message || 'Failed to process resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ClientLayout>
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Manage your profile and application preferences</p>
            </div>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {isEditMode && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Quick Resume Upload</h2>
                <span className="text-sm text-gray-500">PDF files only</span>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                />
                {isUploading && (
                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing resume...
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {/* Profile Information */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isEditMode ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="input-field"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="input-field"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="input-field"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="input-field"
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) => setFormData(prev => ({ ...prev, linkedIn: e.target.value }))}
                          className="input-field"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                          className="input-field"
                          placeholder="Portfolio URL"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <p className="mt-1 text-gray-900">{savedProfile.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="mt-1 text-gray-900">{savedProfile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Phone</label>
                        <p className="mt-1 text-gray-900">{savedProfile.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Location</label>
                        <p className="mt-1 text-gray-900">{savedProfile.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">LinkedIn</label>
                        <a href={savedProfile.linkedIn} className="mt-1 text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {savedProfile.linkedIn}
                        </a>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Portfolio</label>
                        <a href={savedProfile.portfolio} className="mt-1 text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {savedProfile.portfolio}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Save/Cancel Buttons in Edit Mode */}
            {isEditMode && (
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setFormData(savedProfile);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ClientLayout>
  );
} 