'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useNetworking } from '../hooks/useNetworking';

export default function NetworkingPanel({ companyName }: { companyName: string }) {
  const { contacts, loading, error, findContacts } = useNetworking();
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    if (companyName) {
      findContacts(companyName);
    }
  }, [companyName]);

  const handleConnect = async (contact: any) => {
    setSelectedContact(contact);
    // Open modal for personalized message
  };

  if (loading) return <div>Finding contacts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Networking Contacts at {companyName}</h2>
      <div className="space-y-4">
        {contacts?.map((contact) => (
          <div key={contact.id} className="border p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-gray-600">{contact.title}</p>
              </div>
              <button
                onClick={() => handleConnect(contact)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Connect
              </button>
            </div>
            {contact.mutualConnections > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {contact.mutualConnections} mutual connections
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 