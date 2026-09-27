import React, { useState } from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Link, Navigate } from 'react-router-dom';

const AdminApplications = () => {
  const { currentUser, applications, jobs, users } = useJobPortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Enrich applications with job and user data for display
  const enrichedApplications = applications.map(app => {
    const job = jobs.find(j => j.id === app.jobId) || { title: 'Unknown Job', company: 'Unknown Company' };
    const user = users.find(u => u.id === app.userId) || { name: 'Unknown User', email: '' };
    return { ...app, jobTitle: job.title, company: job.company, applicantName: user.name, applicantEmail: user.email };
  });

  const filteredApplications = enrichedApplications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-1">Global Applications</h1>
            <p className="text-secondary mb-0">Monitor and audit all job applications on the platform.</p>
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
                  placeholder="Search by job, company, or applicant..." 
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
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
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

        {/* Applications Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {filteredApplications.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Applicant</th>
                      <th scope="col">Job & Company</th>
                      <th scope="col">Applied Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end pe-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map(app => (
                      <tr key={app.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{width: '40px', height: '40px'}}>
                              {app.applicantName.charAt(0)}
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{app.applicantName}</h6>
                              <span className="text-muted small">{app.applicantEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="fw-medium text-dark">{app.jobTitle}</div>
                          <div className="text-muted small">{app.company}</div>
                        </td>
                        <td>{app.appliedDate}</td>
                        <td>
                          <span className={`badge ${
                            app.status === 'Applied' ? 'bg-primary' : 
                            app.status === 'Under Review' ? 'bg-info' : 
                            app.status === 'Interviewing' ? 'bg-warning text-dark' : 
                            app.status === 'Offered' ? 'bg-success' : 'bg-danger'
                          } rounded-pill`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                           <button className="btn btn-light btn-sm rounded-pill" disabled title="Admins can view meta-data, but not individual application contents for privacy.">
                              View Audit Trail
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center">
                <div className="display-1 text-muted mb-3"><i className="bi bi-file-earmark-person"></i></div>
                <h4 className="fw-bold">No applications found</h4>
                <p className="text-secondary mb-0">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default AdminApplications;
