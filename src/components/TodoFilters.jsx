import React from 'react';

function TodoFilters({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      <button 
        onClick={() => onFilterChange('all')} 
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
      >
        All
      </button>
      <button 
        onClick={() => onFilterChange('active')} 
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
      >
        Pending
      </button>
      <button 
        onClick={() => onFilterChange('completed')} 
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
