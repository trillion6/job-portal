import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import Card from '../components/Card';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import JobCard from '../components/JobCard';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';
import { useJobPortal } from '../context/JobPortalContext';

// Reusable Stat Card Component
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

const Dashboard = () => {
  const { profile, applications, savedJobs, activity, toggleSaveJob, jobs } = useJobPortal();

  // Derived Statistics
  const totalApplications = applications.length;
  const totalSaved = savedJobs.size;
  const totalInterviews = applications.filter(app => app.status === 'Interview').length;
  const totalOffers = applications.filter(app => app.status === 'Selected').length;

  // Profile Completion Calculation
  const calculateCompletion = () => {
    const fields = ['name', 'email', 'phone', 'location', 'title', 'bio', 'education', 'experience', 'linkedin', 'portfolio'];
    let filled = 0;
    fields.forEach(field => {
      if (profile[field] && profile[field].trim() !== '') filled++;
    });
    if (profile.skills && profile.skills.length > 0) filled++; // skills array
    
    return Math.round((filled / (fields.length + 1)) * 100);
  };
  const completionPercentage = calculateCompletion();

  // Recent Applications (Top 3)
  const recentApplications = [...applications].sort((a, b) => b.id - a.id).slice(0, 3);

  // Recommended Jobs (Matching any skill, limited to 3)
  const recommendedJobs = useMemo(() => {
    if (!profile.skills || profile.skills.length === 0) return jobs.slice(0, 3);
    
    return jobs.filter(job => {
      // Check if job skills intersect with profile skills
      return job.skills && job.skills.some(skill => profile.skills.includes(skill));
    }).slice(0, 3);
  }, [profile.skills]);

  // Saved Jobs Details
  const savedJobDetails = useMemo(() => {
    return jobs.filter(job => savedJobs.has(job.id)).slice(0, 3);
  }, [savedJobs, jobs]);

  return (
    <PageContainer>
      <Section className="py-4">
        {/* Welcome Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
          <div>
            <h1 className="h2 fw-bold mb-2">Welcome back, {profile.name.split(' ')[0]} 👋</h1>
            <p className="text-secondary fs-5 mb-0">Find your next opportunity and take the next step in your career.</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/jobs">
              <Button variant="outline-primary" className="px-4">Explore Jobs</Button>
            </Link>
            <Link to="/profile">
              <Button variant="primary" className="px-4">Update Profile</Button>
            </Link>
          </div>
        </div>

        {/* Statistics Widgets */}
        <div className="row g-4 mb-5">
          <div className="col-sm-6 col-lg-3">
            <DashboardStatCard icon="📄" title="Applications" value={totalApplications} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <DashboardStatCard icon="🔖" title="Saved Jobs" value={totalSaved} variant="info" />
          </div>
          <div className="col-sm-6 col-lg-3">
            <DashboardStatCard icon="💬" title="Interviews" value={totalInterviews} variant="warning" />
          </div>
          <div className="col-sm-6 col-lg-3">
            <DashboardStatCard icon="🎉" title="Selected" value={totalOffers} variant="success" />
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content Area (Left) */}
          <div className="col-lg-8 d-flex flex-column gap-4">
            
            {/* Recent Applications */}
            <Card className="p-4 border-standard shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Recent Applications</h4>
                <Link to="/applications" className="text-decoration-none small fw-medium">View All</Link>
              </div>
              
              {recentApplications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-meta">
                      <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Applied On</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {recentApplications.map(app => (
                        <tr key={app.id}>
                          <td className="fw-medium">{app.jobTitle}</td>
                          <td className="text-secondary">{app.company}</td>
                          <td className="text-secondary">{app.appliedDate}</td>
                          <td><ApplicationStatusBadge status={app.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 bg-light rounded border border-standard border-dashed">
                  <p className="text-secondary mb-0">No recent applications.</p>
                </div>
              )}
            </Card>

            {/* Saved / Recommended Jobs */}
            <Card className="p-4 border-standard shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Recommended for You</h4>
                <Link to="/jobs" className="text-decoration-none small fw-medium">View More</Link>
              </div>
              
              {recommendedJobs.length > 0 ? (
                <div className="row g-3">
                  {recommendedJobs.map(job => (
                    <div className="col-md-6" key={job.id}>
                      <JobCard job={job} isSaved={savedJobs.has(job.id)} onToggleSave={toggleSaveJob} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-light rounded border border-standard border-dashed">
                  <p className="text-secondary mb-0">Add skills to your profile to get recommendations.</p>
                </div>
              )}
            </Card>

          </div>

          {/* Sidebar Area (Right) */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            
            {/* Profile Summary */}
            <GlassCard className="p-4 border-standard shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-4">
                <Avatar name={profile.name} size={64} />
                <div>
                  <h4 className="fw-bold mb-1">{profile.name}</h4>
                  <p className="text-primary mb-0">{profile.title}</p>
                </div>
              </div>
              
              <div className="mb-4 text-secondary small">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span>📍</span> {profile.location || 'Location not set'}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>✉️</span> {profile.email}
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-meta">Profile Completion</span>
                  <span className="fw-bold text-primary">{completionPercentage}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-primary rounded-pill" 
                    role="progressbar" 
                    style={{ width: `${completionPercentage}%` }}
                    aria-valuenow={completionPercentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <Link to="/profile" className="d-block text-decoration-none">
                <Button variant="outline-primary" className="w-100">Edit Profile</Button>
              </Link>
            </GlassCard>

            {/* Recent Activity */}
            <Card className="p-4 border-standard shadow-sm">
              <h4 className="fw-bold mb-4">Recent Activity</h4>
              {activity.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {activity.slice(0, 5).map(act => (
                    <div key={act.id} className="d-flex align-items-start gap-3">
                      <div className={`mt-1 bg-opacity-10 rounded-circle p-2 d-flex justify-content-center align-items-center ${act.type === 'Applied' ? 'bg-success text-success' : act.type === 'Saved' ? 'bg-info text-info' : 'bg-primary text-primary'}`}>
                        {act.type === 'Applied' ? '✓' : act.type === 'Saved' ? '♥' : '✎'}
                      </div>
                      <div>
                        <p className="mb-1 text-dark fs-6">{act.description}</p>
                        <p className="mb-0 text-meta small">{act.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary text-center my-3">No recent activity.</p>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 border-standard shadow-sm">
              <h4 className="fw-bold mb-3">Quick Actions</h4>
              <div className="d-flex flex-column gap-2">
                <Link to="/saved-jobs" className="text-decoration-none">
                  <Button variant="light" className="w-100 text-start border-standard d-flex align-items-center gap-2">
                    <span className="fs-5">🔖</span> Saved Jobs
                  </Button>
                </Link>
                <Link to="/applications" className="text-decoration-none">
                  <Button variant="light" className="w-100 text-start border-standard d-flex align-items-center gap-2">
                    <span className="fs-5">📄</span> My Applications
                  </Button>
                </Link>
                <button className="btn btn-light w-100 text-start border-standard d-flex align-items-center gap-2" onClick={() => alert("Resume Builder coming in Phase 8!")}>
                  <span className="fs-5">📝</span> Build Resume
                </button>
              </div>
            </Card>

          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default Dashboard;
