import React, { useState } from 'react';
import Button from './Button';

const SearchBar = ({ onSearch, initialKeyword = '', initialLocation = '', className = '' }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  React.useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  React.useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location });
    } else {
      console.log('Search Triggered:', { keyword, location });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`d-flex flex-column flex-md-row gap-2 w-100 ${className}`}
    >
      <div className="form-floating flex-grow-1">
        <input 
          type="text" 
          className="form-control form-control-material bg-white" 
          id="searchKeyword" 
          placeholder="Job title, skills, or company"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label htmlFor="searchKeyword">Job title, skills, or company</label>
      </div>
      <div className="form-floating flex-grow-1 border-md-start">
        <input 
          type="text" 
          className="form-control form-control-material bg-white" 
          id="searchLocation" 
          placeholder="City, state, or 'Remote'"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="searchLocation">City, state, or 'Remote'</label>
      </div>
      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="px-4 fw-bold"
      >
        Search Jobs
      </Button>
    </form>
  );
};

export default SearchBar;
