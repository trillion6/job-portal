import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const RecruiterJobs = () => {
  const { company, jobs, updateJob, deleteJob, applications } = useJobPortal();
  
  // Filter to only this company's jobs
  const myJobs = jobs.filter(job => job.company === company.name).sort((a, b) => b.id - a.id);
  
  const [filter, setFilter] = useState('All');
  
  const filteredJobs = myJobs.filter(job => {
    if (filter === 'All') return true;
    return job.status === filter;
  });

  const getApplicantCount = (jobId) => {
    return applications.filter(app => app.jobId === jobId).length;
  };

  const handleDelete = (jobId) => {
    const applicantCount = getApplicantCount(jobId);
    if (applicantCount > 0) {
      alert(`Cannot delete this job because it has ${applicantCount} applicant(s). Please close it instead.`);
      return;
    }
    if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
      deleteJob(jobId);
    }
  };

  const handleToggleStatus = (job) => {
    const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
    updateJob(job.id, { status: newStatus });
  };

  return (
    <PageContainer>
      <Section className="py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
          <div>
            <h1 className="h2 fw-bold mb-2">Manage Jobs</h1>
            <p className="text-secondary fs-5 mb-0">View, edit, and manage your job postings.</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/recruiter/post-job">
              <Button variant="primary" className="d-flex align-items-center gap-2">
                <i className="bi bi-plus-lg"></i> Post a Job
              </Button>
            </Link>
          </div>
        </div>

        <GlassCard className="p-4 border-standard shadow-sm">
          {/* Filters */}
          <div className="d-flex gap-2 mb-4 overflow-auto pb-2" style={{ whiteSpace: 'nowrap' }}>
            <Button 
              variant={filter === 'All' ? 'primary' : 'outline-secondary'} 
              size="sm" 
              className="rounded-pill px-4"
              onClick={() => setFilter('All')}
            >
              All Jobs ({myJobs.length})
            </Button>
            <Button 
              variant={filter === 'Active' ? 'primary' : 'outline-secondary'} 
              size="sm" 
              className="rounded-pill px-4"
              onClick={() => setFilter('Active')}
            >
              Active ({myJobs.filter(j => j.status === 'Active').length})
            </Button>
            <Button 
              variant={filter === 'Draft' ? 'primary' : 'outline-secondary'} 
              size="sm" 
              className="rounded-pill px-4"
              onClick={() => setFilter('Draft')}
            >
              Drafts ({myJobs.filter(j => j.status === 'Draft').length})
            </Button>
            <Button 
              variant={filter === 'Closed' ? 'primary' : 'outline-secondary'} 
              size="sm" 
              className="rounded-pill px-4"
              onClick={() => setFilter('Closed')}
            >
              Closed ({myJobs.filter(j => j.status === 'Closed').length})
            </Button>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-meta fw-bold text-secondary">Job Title</th>
                    <th scope="col" className="py-3 px-4 text-meta fw-bold text-secondary">Status</th>
                    <th scope="col" className="py-3 px-4 text-meta fw-bold text-secondary">Type</th>
                    <th scope="col" className="py-3 px-4 text-meta fw-bold text-secondary text-center">Applicants</th>
                    <th scope="col" className="py-3 px-4 text-meta fw-bold text-secondary text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => {
                    const applicantsCount = getApplicantCount(job.id);
                    return (
                      <tr key={job.id}>
                        <td className="px-4 py-3">
                          <div className="fw-bold text-dark">{job.title}</div>
                          <div className="text-meta text-secondary">{job.location} • {job.category}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge bg-${job.status === 'Active' ? 'success' : job.status === 'Draft' ? 'warning text-dark' : 'secondary'} bg-opacity-10 text-${job.status === 'Active' ? 'success' : job.status === 'Draft' ? 'warning text-dark' : 'secondary'} p-2 rounded-pill`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-secondary text-sm">
                          {job.jobType}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {applicantsCount > 0 ? (
                            <Link to={`/recruiter/applicants?jobId=${job.id}`} className="badge bg-primary rounded-pill text-decoration-none px-3 py-2">
                              {applicantsCount}
                            </Link>
                          ) : (
                            <span className="text-secondary text-meta">0</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-end">
                          <div className="d-flex gap-2 justify-content-end">
                            <Link to={`/jobs/${job.id}`}>
                              <Button variant="outline-secondary" size="sm" className="p-1 px-2" title="View Job">
                                <i className="bi bi-eye"></i>
                              </Button>
                            </Link>
                            <Link to={`/recruiter/jobs/${job.id}/edit`}>
                              <Button variant="outline-primary" size="sm" className="p-1 px-2" title="Edit Job">
                                <i className="bi bi-pencil"></i>
                              </Button>
                            </Link>
                            <Button 
                              variant={job.status === 'Active' ? 'outline-warning' : 'outline-success'} 
                              size="sm" 
                              className="p-1 px-2" 
                              title={job.status === 'Active' ? 'Close Job' : 'Reactivate Job'}
                              onClick={() => handleToggleStatus(job)}
                            >
                              <i className={`bi bi-${job.status === 'Active' ? 'pause-circle' : 'play-circle'}`}></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              className="p-1 px-2" 
                              title="Delete Job"
                              onClick={() => handleDelete(job.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="text-secondary mb-3">
                <i className="bi bi-search fs-1"></i>
              </div>
              <h5 className="fw-bold">No jobs found</h5>
              <p className="text-secondary">You don't have any jobs matching the current filter.</p>
              {filter !== 'All' && (
                <Button variant="outline-primary" onClick={() => setFilter('All')}>View All Jobs</Button>
              )}
            </div>
          )}
        </GlassCard>
      </Section>
    </PageContainer>
  );
};

export default RecruiterJobs;
