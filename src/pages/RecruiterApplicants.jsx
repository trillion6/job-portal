import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';
import { useJobPortal } from '../context/JobPortalContext';

const RecruiterApplicants = () => {
  const [searchParams] = useSearchParams();
  const filterJobId = searchParams.get('jobId');
  const { company, jobs, applications } = useJobPortal();

  // Get jobs for this company
  const companyJobs = jobs.filter(job => job.company === company.name);
  const companyJobIds = companyJobs.map(j => j.id);

  // Get applications for these jobs
  let companyApplications = applications.filter(app => companyJobIds.includes(app.jobId));
  
  // Filter by Job ID if provided in URL
  if (filterJobId) {
    companyApplications = companyApplications.filter(app => app.jobId === parseInt(filterJobId));
  }

  // Local state for search and status filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApplications = companyApplications.filter(app => {
    // Name search
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    // Status filter
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <Section className="py-4">
        <div className="mb-4">
          <h1 className="h2 fw-bold mb-2 text-walnut">Applicants</h1>
          <p className="text-secondary fs-5 mb-0">Review applications for your job postings.</p>
        </div>

        <GlassCard className="p-4 border-standard shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <input 
                type="text" 
                className="form-control form-control-material"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <select 
                className="form-select form-control-material"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">New (Applied)</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {filteredApplications.length > 0 ? (
          <div className="row g-4">
            {filteredApplications.map((app) => {
              const job = companyJobs.find(j => j.id === app.jobId);
              return (
                <div key={app.id} className="col-12 col-lg-6">
                  <GlassCard className="p-4 border-standard shadow-sm h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="bg-sage-subtle rounded-circle d-flex justify-content-center align-items-center text-sage fw-bold border border-sage" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                          {app.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1 text-dark">{app.fullName}</h5>
                          <p className="text-meta text-secondary mb-0">{app.email}</p>
                        </div>
                      </div>
                      <ApplicationStatusBadge status={app.status} />
                    </div>

                    <div className="mb-4">
                      <p className="text-meta text-secondary mb-1">Applied for:</p>
                      <Link to={`/jobs/${job?.id}`} className="fw-medium text-decoration-none">{job?.title}</Link>
                    </div>

                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                      <span className="text-meta text-secondary">{app.appliedDate}</span>
                      <Link to={`/recruiter/applicants/${app.id}`}>
                        <Button variant="primary" size="sm">Review Application</Button>
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassCard className="p-5 text-center border-standard shadow-sm">
            <div className="text-secondary mb-3">
              <i className="bi bi-people fs-1"></i>
            </div>
            <h5 className="fw-bold">No applicants found</h5>
            <p className="text-secondary">We couldn't find any applications matching your criteria.</p>
            {(searchTerm || statusFilter !== 'All' || filterJobId) && (
              <Button variant="outline-primary" className="mt-2" onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                // Remove query param by navigating to base path
                window.history.replaceState({}, '', '/recruiter/applicants');
              }}>
                Clear Filters
              </Button>
            )}
          </GlassCard>
        )}
      </Section>
    </PageContainer>
  );
};

export default RecruiterApplicants;
