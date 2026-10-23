import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const SavedJobs = () => {
  const { savedJobs, toggleSaveJob, jobs } = useJobPortal();

  // Find all job objects that match the saved IDs
  const savedJobDetails = useMemo(() => {
    return jobs.filter(job => savedJobs.has(String(job.id || job._id)));
  }, [jobs, savedJobs]);

  return (
    <PageContainer>
      <Section className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0 text-walnut">Saved Jobs</h1>
          {savedJobDetails.length > 0 && (
            <span className="status-badge badge-sage px-3 py-2 fs-6 rounded-pill">
              {savedJobDetails.length} saved
            </span>
          )}
        </div>

        {savedJobDetails.length > 0 ? (
          <div className="row g-4">
            {savedJobDetails.map(job => (
              <div className="col-md-6 col-lg-4" key={job.id || job._id}>
                <JobCard 
                  job={job} 
                  isSaved={true}
                  onToggleSave={toggleSaveJob}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 px-3 bg-subtle rounded border border-standard">
            <div className="fs-1 mb-3">🔖</div>
            <h4 className="fw-bold mb-2 text-walnut">Your saved jobs will appear here</h4>
            <p className="text-secondary mb-4">
              Save interesting opportunities so you can easily find them later.
            </p>
            <Link to="/jobs" className="text-decoration-none">
              <Button variant="primary" className="px-4">
                Explore Jobs
              </Button>
            </Link>
          </div>
        )}
      </Section>
    </PageContainer>
  );
};

export default SavedJobs;
