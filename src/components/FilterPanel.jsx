import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value, checked) => {
    let currentValues = Array.isArray(filters[category]) ? [...filters[category]] : [];
    
    if (value === 'All') {
      currentValues = checked ? ['All'] : [];
    } else {
      // Remove 'All' if it's there
      currentValues = currentValues.filter(v => v !== 'All');
      
      if (checked) {
        currentValues.push(value);
      } else {
        currentValues = currentValues.filter(v => v !== value);
      }
      
      if (currentValues.length === 0) {
        currentValues = ['All'];
      }
    }
    
    onFilterChange(category, currentValues);
  };

  const FilterGroup = ({ title, category, options }) => {
    const currentValues = Array.isArray(filters[category]) ? filters[category] : [filters[category] || 'All'];
    
    return (
      <div className="mb-4">
        <label className="text-label mb-2 d-block fw-bold text-dark">{title}</label>
        <div className="d-flex flex-column gap-2">
          {options.map((option) => (
            <div className="form-check" key={`${category}-${option}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`filter-${category}-${option.replace(/\s+/g, '-')}`}
                checked={currentValues.includes(option)}
                onChange={(e) => handleCheckboxChange(category, option, e.target.checked)}
              />
              <label 
                className="form-check-label text-secondary" 
                htmlFor={`filter-${category}-${option.replace(/\s+/g, '-')}`}
                style={{ cursor: 'pointer' }}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="filter-panel pe-2" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
      <FilterGroup 
        title="Location" 
        category="location" 
        options={['All', 'Chandigarh', 'Mohali', 'Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Remote']} 
      />
      
      <FilterGroup 
        title="Job Type" 
        category="jobType" 
        options={['All', 'Full Time', 'Part Time', 'Internship', 'Contract']} 
      />
      
      <FilterGroup 
        title="Work Mode" 
        category="workMode" 
        options={['All', 'On-site', 'Remote', 'Hybrid']} 
      />
      
      <FilterGroup 
        title="Experience" 
        category="experience" 
        options={['All', 'Fresher', '0-2 Years', '1-3 Years', '2-5 Years', '5+ Years']} 
      />
      
      <FilterGroup 
        title="Category" 
        category="category" 
        options={['All', 'Software Development', 'AI/ML', 'Data Science', 'Data Analytics', 'Cybersecurity', 'Web Development', 'UI/UX', 'Cloud/DevOps', 'Marketing', 'Finance']} 
      />
      
      <FilterGroup 
        title="Salary Range" 
        category="salary" 
        options={['All', '0-5 LPA', '5-10 LPA', '10-15 LPA', '15+ LPA']} 
      />
    </div>
  );
};

export default FilterPanel;
