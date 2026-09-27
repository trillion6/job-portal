import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser, users, companies, jobs, applications, adminActivity } = useJobPortal();

  // Redirect if not admin
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const jobSeekers = users.filter(u => u.role === 'jobseeker').length;
  const recruiters = users.filter(u => u.role === 'recruiter').length;
  const activeJobs = jobs.filter(j => j.status === 'Active' && j.moderationStatus === 'Approved').length;
  const pendingJobs = jobs.filter(j => j.moderationStatus === 'Pending Review').length;
  const pendingCompanies = companies.filter(c => c.status === 'Pending').length;
  
  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-1">Platform Dashboard</h1>
            <p className="text-secondary mb-0">Overview and management center.</p>
          </div>
          <div className="d-flex gap-2">
            <span className="badge bg-danger rounded-pill px-3 py-2">
              <i className="bi bi-shield-lock me-1"></i> Admin Access
            </span>
          </div>
        </div>
      </Section>

      <Section className="py-5">
        {/* Quick Stats */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <GlassCard className="h-100 p-4 border-start border-4 border-primary text-center">
              <h2 className="display-5 fw-bold text-primary mb-0">{users.length}</h2>
              <p className="text-secondary fw-medium mb-0 mt-2">Total Users</p>
              <div className="d-flex justify-content-center gap-3 mt-3 small text-muted">
                <span><i className="bi bi-person me-1"></i> {jobSeekers} Seekers</span>
                <span><i className="bi bi-briefcase me-1"></i> {recruiters} Recruiters</span>
              </div>
            </GlassCard>
          </div>
          
          <div className="col-md-3">
            <GlassCard className="h-100 p-4 border-start border-4 border-success text-center">
              <h2 className="display-5 fw-bold text-success mb-0">{activeJobs}</h2>
              <p className="text-secondary fw-medium mb-0 mt-2">Active Jobs</p>
              <div className="mt-3 small text-muted">
                <Link to="/admin/jobs" className="text-decoration-none text-muted hover-primary">
                  {pendingJobs > 0 && <span className="text-warning"><i className="bi bi-exclamation-circle me-1"></i> {pendingJobs} Pending Review</span>}
                  {pendingJobs === 0 && <span>All caught up</span>}
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="col-md-3">
            <GlassCard className="h-100 p-4 border-start border-4 border-info text-center">
              <h2 className="display-5 fw-bold text-info mb-0">{companies.length}</h2>
              <p className="text-secondary fw-medium mb-0 mt-2">Companies</p>
              <div className="mt-3 small text-muted">
                <Link to="/admin/companies" className="text-decoration-none text-muted hover-primary">
                  {pendingCompanies > 0 && <span className="text-warning"><i className="bi bi-shield-exclamation me-1"></i> {pendingCompanies} Awaiting Verification</span>}
                  {pendingCompanies === 0 && <span>All verified</span>}
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="col-md-3">
            <GlassCard className="h-100 p-4 border-start border-4 border-warning text-center">
              <h2 className="display-5 fw-bold text-warning mb-0">{applications.length}</h2>
              <p className="text-secondary fw-medium mb-0 mt-2">Total Applications</p>
              <div className="mt-3 small text-muted">
                <span><i className="bi bi-file-earmark-text me-1"></i> Processed securely</span>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="row g-4">
          {/* Quick Actions */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Management Modules</h4>
            </div>
            
            <div className="row g-3">
              <div className="col-md-6">
                <Link to="/admin/users" className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
                    <div className="card-body p-4 d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 text-primary rounded p-3">
                        <i className="bi bi-people fs-4"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">Users</h5>
                        <p className="text-secondary small mb-0">Manage job seekers & recruiters</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="col-md-6">
                <Link to="/admin/companies" className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
                    <div className="card-body p-4 d-flex align-items-center gap-3">
                      <div className="bg-info bg-opacity-10 text-info rounded p-3">
                        <i className="bi bi-building fs-4"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">Companies</h5>
                        <p className="text-secondary small mb-0">Verify and monitor companies</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6">
                <Link to="/admin/jobs" className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
                    <div className="card-body p-4 d-flex align-items-center gap-3">
                      <div className="bg-success bg-opacity-10 text-success rounded p-3">
                        <i className="bi bi-briefcase fs-4"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">Jobs Moderation</h5>
                        <p className="text-secondary small mb-0">Review and approve job postings</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6">
                <Link to="/admin/applications" className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
                    <div className="card-body p-4 d-flex align-items-center gap-3">
                      <div className="bg-warning bg-opacity-10 text-warning rounded p-3">
                        <i className="bi bi-file-earmark-person fs-4"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">Applications</h5>
                        <p className="text-secondary small mb-0">Monitor global application flow</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="col-lg-4">
            <GlassCard className="h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Platform Activity</h5>
                
                {adminActivity.length === 0 ? (
                  <p className="text-secondary text-center my-5">No recent activity.</p>
                ) : (
                  <div className="timeline">
                    {adminActivity.slice(0, 5).map((act, idx) => (
                      <div key={act.id} className="d-flex mb-4 position-relative">
                        {idx !== adminActivity.length - 1 && idx !== 4 && (
                          <div className="position-absolute border-start border-2 border-light h-100" style={{ left: '15px', top: '30px', zIndex: 0 }}></div>
                        )}
                        <div className="me-3 position-relative" style={{ zIndex: 1 }}>
                          <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                            <i className={`bi ${
                              act.type === 'User' ? 'bi-person' : 
                              act.type === 'Company' ? 'bi-building' : 
                              act.type === 'Job' ? 'bi-briefcase' : 
                              'bi-lightning'
                            }`}></i>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 text-sm fw-medium">{act.description}</p>
                          <span className="text-meta" style={{ fontSize: '0.75rem' }}>{act.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {adminActivity.length > 5 && (
                  <div className="text-center mt-3 pt-3 border-top">
                    <Link to="/admin/reports" className="btn btn-link btn-sm text-decoration-none">View All Activity</Link>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default AdminDashboard;
