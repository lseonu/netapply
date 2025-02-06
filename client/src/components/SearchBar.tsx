"use client";
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchBar() {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search for jobs..."
        className="input-field pl-10 pr-12"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
      <button className="btn-primary ml-2">Search</button>
    </div>
  );
} 