import React from 'react';

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search jobs..."
        className="border rounded p-2"
      />
    </div>
  );
}; 