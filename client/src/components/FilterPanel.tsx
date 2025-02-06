import React from 'react';

export const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <h2 className="font-bold">Filters</h2>
      {/* Add filter options here */}
      <div>
        <label>
          <input type="checkbox" /> Remote
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Full-time
        </label>
      </div>
      {/* Add more filters as needed */}
    </div>
  );
}; 