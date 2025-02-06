"use client";
import React from 'react';
import { Connection } from '../types/network';

interface ConnectionCardProps {
  connection?: Connection;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({ connection }) => {
  if (!connection) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{connection.name}</h3>
          <p className="text-sm text-gray-500">{connection.position}</p>
          <p className="text-sm text-gray-500">{connection.company}</p>
        </div>
        {connection.similarity && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {connection.similarity}% Match
          </span>
        )}
      </div>

      {connection.mutualConnections && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {connection.mutualConnections} mutual connections
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button className="w-full btn-primary">
          Send Connection Request
        </button>
        {connection.email && (
          <button className="w-full border border-primary-main text-primary-main hover:bg-primary-lighter px-4 py-2 rounded-lg transition-colors duration-200">
            Send Email
          </button>
        )}
      </div>
    </div>
  );
}; 