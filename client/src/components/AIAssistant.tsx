"use client";
import React, { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

type AssistantMode = 'chat' | 'resume' | 'cover-letter';

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'upload'>('paste');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/parse-pdf', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.text) {
          setResume(data.text);
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSend = async (content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          content,
          jobUrl,
          jobDescription,
          resume,
          messages,
        }),
      });

      const data = await response.json();
      setMessages([...messages, { role: 'user', content }, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mode Selection */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => setMode('chat')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    mode === 'chat' ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setMode('resume')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    mode === 'resume' ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Resume Review
                </button>
                <button
                  onClick={() => setMode('cover-letter')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    mode === 'cover-letter' ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Cover Letter
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              {mode === 'chat' ? (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'assistant'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-primary-main text-white'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Job URL or Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main"
                      rows={4}
                      value={jobUrl || jobDescription}
                      onChange={(e) => mode === 'resume' ? setJobDescription(e.target.value) : setJobUrl(e.target.value)}
                      placeholder={mode === 'resume' ? "Paste job description here..." : "Enter job posting URL..."}
                    />
                  </div>
                  {mode === 'resume' && (
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setUploadMethod('paste')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            uploadMethod === 'paste' ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Paste Resume
                        </button>
                        <button
                          onClick={() => setUploadMethod('upload')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            uploadMethod === 'upload' ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Upload PDF
                        </button>
                      </div>

                      {uploadMethod === 'paste' ? (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Your Resume
                          </label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main"
                            rows={6}
                            value={resume}
                            onChange={(e) => setResume(e.target.value)}
                            placeholder="Paste your resume here..."
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-main hover:text-primary-main transition-colors duration-200"
                          >
                            {isLoading ? (
                              <span>Processing PDF...</span>
                            ) : resume ? (
                              <span>PDF uploaded - Click to change</span>
                            ) : (
                              <span>Click to upload PDF resume</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main"
                  placeholder={
                    mode === 'chat'
                      ? "Type your message..."
                      : mode === 'resume'
                      ? "Click 'Analyze Resume' to get feedback"
                      : "Click 'Generate Cover Letter' to create"
                  }
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSend(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (mode === 'chat') {
                      const input = document.querySelector('input');
                      if (input && input.value) {
                        handleSend(input.value);
                        input.value = '';
                      }
                    } else {
                      handleSend(mode === 'resume' ? 'analyze_resume' : 'generate_cover_letter');
                    }
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary-main hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : mode === 'chat' ? 'Send' : mode === 'resume' ? 'Analyze Resume' : 'Generate Cover Letter'}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 