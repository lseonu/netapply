import React from 'react';
import Link from 'next/link';
import { AIAssistant } from './AIAssistant';

interface SidebarProps {
  // No need for isOpen and setIsOpen since we want it always visible
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);

  return (
    <>
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed">
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-semibold text-primary-main">NetApply</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4">
          <Link 
            href="/" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-main transition-colors duration-200"
          >
            <span className="text-sm font-medium">Home</span>
          </Link>
          <Link 
            href="/profile" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-main transition-colors duration-200"
          >
            <span className="text-sm font-medium">Profile</span>
          </Link>
          <Link 
            href="/track-application" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-main transition-colors duration-200"
          >
            <span className="text-sm font-medium">Track Application</span>
          </Link>
          <Link 
            href="/network" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-main transition-colors duration-200"
          >
            <span className="text-sm font-medium">Network</span>
          </Link>
          <Link 
            href="/saved-jobs" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-main transition-colors duration-200"
          >
            <span className="text-sm font-medium">Saved Jobs</span>
          </Link>
        </nav>

        {/* AI Assistant Button - Fixed at bottom */}
        <div className="border-t border-gray-200 p-4">
          <button 
            onClick={() => setShowAIAssistant(true)}
            className="w-full bg-primary-main hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="text-sm font-medium">AI Assistant</span>
          </button>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </>
  );
}; 