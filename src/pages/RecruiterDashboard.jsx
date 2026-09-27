import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const DashboardStatCard = ({ icon, title, value, variant = "primary" }) => (
  <GlassCard className="p-4 h-100 border-standard shadow-sm d-flex align-items-center gap-3">
    <div className={`bg-${variant} bg-opacity-10 text-${variant} rounded p-3 d-flex justify-content-center align-items-center fs-3`}>
      {icon}
    </div>
    <div>
      <p className="text-meta mb-1">{title}</p>
      <h3 className="fw-bold mb-0 text-dark">{value}</h3>
    </div>
  </GlassCard>
);

const RecruiterDashboard = () => {
  const { currentUser, company, jobs, applications, recruiterActivity } = useJobPortal();

  // Derived Stats
  const activeJobs = jobs.filter(job => job.status === 'Active' && job.company === company.name).length;
  
  // Find applications for jobs belonging to this company
  const companyJobsIds = jobs.filter(job => job.company === company.name).map(j => j.id);
  const companyApplications = applications.filter(app => companyJobsIds.includes(app.jobId));
  
  const totalApplicants = companyApplications.length;
  const totalInterviews = companyApplications.filter(app => app.status === 'Interview').length;
  const totalHires = companyApplications.filter(app => app.status === 'Selected').length;

  const recentJobs = [...jobs]
    .filter(job => job.company === company.name)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <PageContainer>
      <Section className="py-4">
        {/* Welcome Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
          <div>
            <h1 className="h2 fw-bold mb-2">Welcome, {currentUser.name.split(' ')[0]} 👋</h1>
            <p className="text-secondary fs-5 mb-0">Manage your company profile, post jobs, and find the perfect candidates.</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/recruiter/post-job">
              <Button variant="primary" className="d-flex align-items-center gap-2">
                <i className="bi bi-plus-lg"></i> Post a Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6 col-lg-3">
            <DashboardStatCard 
              icon={<i className="bi bi-briefcase"></i>}
              title="Active Jobs"
              value={activeJobs}
              variant="primary"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <DashboardStatCard 
              icon={<i className="bi bi-people"></i>}
              title="Total Applicants"
              value={totalApplicants}
              variant="info"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <DashboardStatCard 
              icon={<i className="bi bi-calendar-check"></i>}
              title="Interviews"
              value={totalInterviews}
              variant="warning"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <DashboardStatCard 
              icon={<i className="bi bi-check-circle"></i>}
              title="Hires"
              value={totalHires}
              variant="success"
            />
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content Area - Recent Jobs */}
          <div className="col-12 col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Recent Job Postings</h4>
              <Link to="/recruiter/jobs" className="text-decoration-none fw-medium text-primary text-sm">
                View All <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            {recentJobs.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {recentJobs.map(job => (
                  <GlassCard key={job.id} className="p-4 border-standard shadow-sm">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <span className="fw-bold fs-4 text-primary">{job.companyLogo}</span>
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">{job.title}</h5>
                          <div className="d-flex gap-3 text-meta text-secondary">
                            <span><i className="bi bi-geo-alt me-1"></i>{job.location}</span>
                            <span><i className="bi bi-briefcase me-1"></i>{job.jobType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${job.status === 'Active' ? 'success' : 'secondary'} p-2 rounded-pill`}>
                          {job.status}
                        </span>
                        <Link to={`/recruiter/jobs/${job.id}/edit`}>
                          <Button variant="outline-primary" size="sm">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-5 text-center border-standard shadow-sm">
                <div className="text-secondary mb-3">
                  <i className="bi bi-clipboard-data fs-1"></i>
                </div>
                <h5 className="fw-bold">No jobs posted yet</h5>
                <p className="text-secondary">Start hiring by creating your first job posting.</p>
                <Link to="/recruiter/post-job">
                  <Button variant="primary" className="mt-2">Post a Job</Button>
                </Link>
              </GlassCard>
            )}
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="col-12 col-lg-4">
            <GlassCard className="p-4 border-standard shadow-sm h-100">
              <h5 className="fw-bold mb-4">Recent Activity</h5>
              
              {recruiterActivity.length > 0 ? (
                <div className="position-relative">
                  {/* Timeline line */}
                  <div className="position-absolute top-0 bottom-0 start-0 ms-2 border-start border-standard" style={{ zIndex: 0 }}></div>
                  
                  <div className="d-flex flex-column gap-4 position-relative z-1">
                    {recruiterActivity.map(item => (
                      <div key={item.id} className="d-flex gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="bg-primary rounded-circle" style={{ width: '12px', height: '12px', marginLeft: '6px' }}></div>
                        </div>
                        <div>
                          <p className="mb-1 text-dark fw-medium">{item.description}</p>
                          <p className="text-meta text-secondary mb-0">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-secondary mb-0">No recent activity.</p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default RecruiterDashboard;
