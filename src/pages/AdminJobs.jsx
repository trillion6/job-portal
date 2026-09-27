import React, { useState } from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Link, Navigate } from 'react-router-dom';

const AdminJobs = () => {
  const { currentUser, jobs, updateJobModerationStatus, deleteJob } = useJobPortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobToModerate, setJobToModerate] = useState(null);

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.moderationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="h3 fw-bold mb-1">Job Moderation</h1>
            <p className="text-secondary mb-0">Review, flag, and approve job postings.</p>
          </div>
        </div>
      </Section>

      <Section className="py-4">
        <GlassCard className="p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input 
                  type="text" 
                  className="form-control form-control-lg ps-5 bg-light border-0" 
                  placeholder="Search jobs by title or company..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select 
                className="form-select form-select-lg bg-light border-0"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Moderation Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Flagged">Flagged</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-center">
               <button 
                className="btn btn-light w-100 h-100 border-0"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Jobs Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {filteredJobs.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Job Details</th>
                      <th scope="col">Company</th>
                      <th scope="col">Recruiter Status</th>
                      <th scope="col">Moderation</th>
                      <th scope="col" className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map(job => (
                      <tr key={job.id} className={job.moderationStatus === 'Flagged' ? 'table-warning' : ''}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-center fw-bold text-primary" style={{width: '40px', height: '40px'}}>
                              {job.companyLogo || job.company.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <Link to={`/jobs/${job.id}`} className="mb-0 fw-bold text-decoration-none text-dark hover-primary d-block">
                                {job.title}
                              </Link>
                              <span className="text-muted small">
                                {job.location} • {job.type}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{job.company}</td>
                        <td>
                          <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${job.status === 'Active' ? 'success' : 'secondary'}`}>
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            job.moderationStatus === 'Approved' ? 'bg-success' : 
                            job.moderationStatus === 'Pending Review' ? 'bg-info' : 
                            job.moderationStatus === 'Flagged' ? 'bg-warning text-dark' : 'bg-danger'
                          } rounded-pill`}>
                            {job.moderationStatus}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="dropdown">
                            <button className="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                              {job.moderationStatus !== 'Approved' && (
                                <li>
                                  <button className="dropdown-item text-success fw-medium" onClick={() => updateJobModerationStatus(job.id, 'Approved')}>
                                    <i className="bi bi-check-circle me-2"></i> Approve
                                  </button>
                                </li>
                              )}
                              {job.moderationStatus !== 'Flagged' && (
                                <li>
                                  <button className="dropdown-item text-warning fw-medium" onClick={() => updateJobModerationStatus(job.id, 'Flagged')}>
                                    <i className="bi bi-flag me-2"></i> Flag
                                  </button>
                                </li>
                              )}
                              {job.moderationStatus !== 'Rejected' && (
                                <li>
                                  <button 
                                    className="dropdown-item text-danger fw-medium" 
                                    onClick={() => updateJobModerationStatus(job.id, 'Rejected')}
                                  >
                                    <i className="bi bi-x-circle me-2"></i> Reject
                                  </button>
                                </li>
                              )}
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button 
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal" 
                                  data-bs-target="#deleteJobModal"
                                  onClick={() => setJobToModerate(job)}
                                >
                                  <i className="bi bi-trash me-2"></i> Remove Job Permanently
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center">
                <div className="display-1 text-muted mb-3"><i className="bi bi-inbox"></i></div>
                <h4 className="fw-bold">No jobs found</h4>
                <p className="text-secondary mb-0">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Delete Job Modal */}
      <div className="modal fade" id="deleteJobModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom-0 pb-0">
              <h5 className="modal-title fw-bold">Remove Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-4 text-center">
              {jobToModerate && (
                <>
                  <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-trash fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Remove "{jobToModerate.title}"?</h5>
                  <p className="text-secondary mb-0">
                    This will permanently delete the job from the platform. Recruiters and applicants will lose access to it.
                  </p>
                </>
              )}
            </div>
            <div className="modal-footer border-top-0 pt-0 justify-content-center gap-2">
              <button type="button" className="btn btn-light px-4" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-danger px-4" 
                data-bs-dismiss="modal" 
                onClick={() => {
                  if (jobToModerate) {
                    deleteJob(jobToModerate.id);
                    setJobToModerate(null);
                  }
                }}
              >
                Remove Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminJobs;
