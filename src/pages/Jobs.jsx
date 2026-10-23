import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { useJobPortal } from '../context/JobPortalContext';
import { filterJobs, sortJobs } from '../utils/jobSearch';

const Jobs = () => {
  const { jobs, savedJobs, toggleSaveJob, applications } = useJobPortal();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read state from URL or use defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [searchLocation, setSearchLocation] = useState(searchParams.get('loc') || '');
  
  const [filters, setFilters] = useState({
    location: searchParams.getAll('location').length ? searchParams.getAll('location') : ['All'],
    jobType: searchParams.getAll('jobType').length ? searchParams.getAll('jobType') : ['All'],
    workMode: searchParams.getAll('workMode').length ? searchParams.getAll('workMode') : ['All'],
    experience: searchParams.getAll('experience').length ? searchParams.getAll('experience') : ['All'],
    category: searchParams.getAll('category').length ? searchParams.getAll('category') : ['All'],
    salary: searchParams.getAll('salary').length ? searchParams.getAll('salary') : ['All'],
  });
  
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'relevance');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const jobsPerPage = 10;
  
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state to URL when it changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (searchLocation) params.set('loc', searchLocation);
    if (sortOption !== 'relevance') params.set('sort', sortOption);
    if (currentPage > 1) params.set('page', currentPage);
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0 && !values.includes('All')) {
        values.forEach(v => params.append(key, v));
      }
    });
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, searchLocation, sortOption, currentPage, filters, setSearchParams]);

  // Unified Filtering Pipeline (Memoized)
  const filteredAndSortedJobs = useMemo(() => {
    const filtered = filterJobs(jobs, filters, searchTerm, searchLocation);
    return sortJobs(filtered, sortOption, searchTerm);
  }, [jobs, filters, searchTerm, searchLocation, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedJobs.length / jobsPerPage);
  const currentJobs = filteredAndSortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Simulated loading state for UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, searchLocation, filters, sortOption, currentPage]);

  const handleFilterChange = (name, values) => {
    setFilters(prev => ({ ...prev, [name]: values }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchSubmit = ({ keyword, location }) => {
    setSearchTerm(keyword);
    setSearchLocation(location);
    setCurrentPage(1); // Reset to first page on search
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSearchLocation('');
    setFilters({
      location: ['All'],
      jobType: ['All'],
      workMode: ['All'],
      experience: ['All'],
      category: ['All'],
      salary: ['All'],
    });
    setSortOption('relevance');
    setCurrentPage(1);
  };

  // Generate active filter chips
  const activeFilters = [];
  if (searchTerm) activeFilters.push({ label: `Search: ${searchTerm}`, onRemove: () => { setSearchTerm(''); setCurrentPage(1); } });
  if (searchLocation) activeFilters.push({ label: `Loc: ${searchLocation}`, onRemove: () => { setSearchLocation(''); setCurrentPage(1); } });
  
  Object.entries(filters).forEach(([key, values]) => {
    if (values.length > 0 && !values.includes('All')) {
      values.forEach(val => {
        activeFilters.push({ 
          label: val, 
          onRemove: () => handleFilterChange(key, values.filter(v => v !== val).length ? values.filter(v => v !== val) : ['All']) 
        });
      });
    }
  });

  return (
    <PageContainer>
      {/* Header Section */}
      <Section className="pt-4 pb-2">
        <h1 className="page-heading mb-2">Find Your Next Opportunity</h1>
        <p className="text-secondary">Discover thousands of jobs perfectly matched to your skills and preferences.</p>
        
        <div className="mt-4 p-3 minimal-card">
          <SearchBar onSearch={handleSearchSubmit} initialKeyword={searchTerm} initialLocation={searchLocation} />
        </div>
      </Section>

      <Section className="py-4">
        <div className="row">
          {/* Desktop Filter Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-bold text-walnut">Filters</h5>
                {activeFilters.length > 0 && (
                  <button onClick={clearAllFilters} className="btn btn-link text-decoration-none text-amber p-0 text-sm fw-semibold">Clear All</button>
                )}
              </div>
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="col-12 d-lg-none mb-3">
            <Button 
              variant="outline-primary" 
              className="w-100 d-flex justify-content-between align-items-center"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <span className="badge bg-primary rounded-pill">{activeFilters.length > 0 ? activeFilters.length : ''}</span>
            </Button>
            
            {showMobileFilters && (
              <div className="mt-3 p-3 bg-light rounded border border-standard">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 fw-bold text-walnut">Filters</h6>
                  {activeFilters.length > 0 && (
                    <button onClick={clearAllFilters} className="btn btn-link text-decoration-none text-amber p-0 text-sm fw-semibold">Clear All</button>
                  )}
                </div>
                <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="col-12 col-lg-9">
            
            {/* Active Chips & Sort Row */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className="text-meta fw-bold text-dark">{filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'job' : 'jobs'} found</span>
                
                {activeFilters.length > 0 && <span className="text-meta ms-md-2 d-none d-sm-inline">Active:</span>}
                {activeFilters.map((filter, index) => (
                  <span key={index} className="status-badge badge-sage d-inline-flex align-items-center gap-2 px-3 py-1 shadow-sm">
                    <span>{filter.label}</span>
                    <i 
                      className="bi bi-x-circle-fill hover-primary" 
                      style={{ cursor: 'pointer', fontSize: '0.85rem' }} 
                      onClick={filter.onRemove}
                      title="Remove filter"
                    ></i>
                  </span>
                ))}
              </div>
              
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <label htmlFor="sortJobs" className="text-meta fw-medium text-nowrap">Sort by:</label>
                <select 
                  id="sortJobs" 
                  className="form-select form-select-sm form-control-material py-2" 
                  style={{ width: '150px' }}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="newest">Newest</option>
                  <option value="salaryHigh">Salary: High to Low</option>
                  <option value="salaryLow">Salary: Low to High</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Jobs Grid */}
            {isLoading ? (
              <div className="row g-4">
                <SkeletonLoader type="card" count={4} />
              </div>
            ) : currentJobs.length > 0 ? (
              <>
                <div className="row g-4">
                  {currentJobs.map(job => (
                    <div className="col-md-6 col-xl-6" key={job.id}>
                      <JobCard 
                        job={job} 
                        isSaved={savedJobs.has(job.id)}
                        onToggleSave={toggleSaveJob}
                        hasApplied={applications.some(app => app.jobId === job.id)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </>
            ) : (
              /* Empty State */
              <EmptyState 
                icon="bi-search"
                title="No jobs found"
                description="We couldn't find any jobs matching your current search and filters. Try adjusting your criteria."
                actionLabel="Clear All Filters"
                actionOnClick={clearAllFilters}
              />
            )}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default Jobs;
