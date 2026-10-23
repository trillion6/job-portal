import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Card from '../components/Card';
import GlassCard from '../components/GlassCard';
import JobCard from '../components/JobCard';
import ApplyJobModal from '../components/ApplyJobModal';
import { useJobPortal } from '../context/JobPortalContext';

const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { jobs, companies, isJobSaved, toggleSaveJob, hasAppliedForJob, currentUser, updateJobModerationStatus } = useJobPortal();
  
  const [job, setJob] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [jobReported, setJobReported] = useState(false);
  
  const jobId = id;
  const saved = isJobSaved(jobId);
  const applied = hasAppliedForJob(jobId);

  useEffect(() => {
    // Find job
    const foundJob = jobs.find(j => String(j.id || j._id) === String(jobId));
    setJob(foundJob);
    
    // Find company details
    if (foundJob) {
      const foundCompany = companies.find(c => c.name === foundJob.company);
      setCompanyDetails(foundCompany);
    }
    
    // Find related jobs (same category, excluding current job)
    if (foundJob) {
      const related = jobs
        .filter(j => j.category === foundJob.category && String(j.id || j._id) !== String(jobId))
        .slice(0, 3);
      setRelatedJobs(related);
    }
    
    // Check if apply=true is in URL (e.g. redirected from JobCard Apply button)
    const params = new URLSearchParams(location.search);
    if (params.get('apply') === 'true' && foundJob && !hasAppliedForJob(jobId)) {
      setShowApplyModal(true);
    }
  }, [id, location.search, hasAppliedForJob, jobId, jobs, companies]);

  if (!job) {
    return (
      <PageContainer>
        <Section className="py-5 text-center min-vh-50 d-flex flex-column justify-content-center align-items-center">
          <div className="fs-1 mb-3">⚠️</div>
          <h2 className="page-heading mb-3">Job Not Found</h2>
          <p className="text-secondary mb-4">The job you're looking for may have been removed or is no longer available.</p>
          <Link to="/jobs" className="text-decoration-none">
            <Button variant="primary">Browse Jobs</Button>
          </Link>
        </Section>
      </PageContainer>
    );
  }

  const HeaderWrapper = job.featured ? GlassCard : Card;

  return (
    <PageContainer>
      {/* Job Header */}
      <Section className="pt-4 pb-3">
        <HeaderWrapper className="p-4 border-standard shadow-sm">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="bg-sage-subtle text-sage fw-bold rounded d-flex justify-content-center align-items-center border border-standard" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                  {job.companyLogo || job.company.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h1 className="h3 fw-bold mb-1 text-walnut">{job.title}</h1>
                    {job.featured && <Badge variant="amber">Featured</Badge>}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <p className="text-walnut fs-5 fw-semibold mb-0">{job.company}</p>
                    {companyDetails?.status === 'Approved' && (
                      <i className="bi bi-patch-check-fill text-sage" title="Verified Company" style={{fontSize: '1.2rem'}}></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-center text-secondary gap-3 mt-3">
                <span className="d-flex align-items-center gap-1"><span role="img" aria-label="location">📍</span> {job.location}</span>
                <span className="d-flex align-items-center gap-1 fw-semibold text-dark"><span role="img" aria-label="salary">💵</span> {job.salary}</span>
                <span className="d-flex align-items-center gap-1"><span role="img" aria-label="type">💼</span> {job.jobType}</span>
                <span className="d-flex align-items-center gap-1"><span role="img" aria-label="experience">⏳</span> {job.experience}</span>
              </div>
            </div>
            
            <div className="col-md-4 mt-4 mt-md-0 d-flex flex-column gap-2 justify-content-end align-items-md-end">
              <p className="text-meta mb-2">Posted {job.postedDate} • {job.applicants} applicants</p>
              <div className="d-flex gap-2 w-100 justify-content-md-end">
                <Button 
                  variant="outline-secondary" 
                  className={`px-4 flex-grow-1 flex-md-grow-0 ${saved ? 'text-danger border-danger' : ''}`}
                  onClick={() => toggleSaveJob(job.id, job.title)}
                >
                  {saved ? '♥ Saved' : '♡ Save Job'}
                </Button>
                {applied ? (
                  <span className="status-badge status-success px-4 py-2 fs-6">
                    ✓ Applied
                  </span>
                ) : (
                  <Button 
                    variant="primary" 
                    className="px-4 flex-grow-1 flex-md-grow-0"
                    onClick={() => {
                      if (!currentUser.isLoggedIn) {
                        alert("Please log in to apply.");
                        navigate('/login');
                      } else {
                        setShowApplyModal(true);
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </HeaderWrapper>
      </Section>

      {/* Main Content */}
      <Section className="py-4">
        <div className="row g-4">
          
          {/* Left Column (Job Description) */}
          <div className="col-lg-8">
            <div className="minimal-card p-4 h-100">
              <h4 className="fw-bold mb-3 border-bottom pb-2 text-walnut">Job Description</h4>
              <p className="text-body lh-lg mb-4">{job.description}</p>
              
              {job.responsibilities && (
                <>
                  <h5 className="fw-bold mb-3 text-walnut">Key Responsibilities</h5>
                  <ul className="text-body lh-lg mb-4 ps-3">
                    {job.responsibilities.map((item, idx) => <li key={idx} className="mb-2">{item}</li>)}
                  </ul>
                </>
              )}
              
              {job.requirements && (
                <>
                  <h5 className="fw-bold mb-3 text-walnut">Requirements</h5>
                  <ul className="text-body lh-lg mb-4 ps-3">
                    {job.requirements.map((item, idx) => <li key={idx} className="mb-2">{item}</li>)}
                  </ul>
                </>
              )}
              
              {job.preferredSkills && (
                <>
                  <h5 className="fw-bold mb-3 text-walnut">Preferred Skills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {job.preferredSkills.map((skill, idx) => (
                      <Badge key={idx} variant="sage">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {job.skills && (
                <>
                  <h5 className="fw-bold mb-3 text-walnut">Core Skills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="sage">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
              
              {job.benefits && (
                <>
                  <h5 className="fw-bold mb-3 text-walnut">Benefits & Perks</h5>
                  <ul className="text-body lh-lg mb-4 ps-3">
                    {job.benefits.map((item, idx) => <li key={idx} className="mb-2">{item}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar Summary) */}
          <div className="col-lg-4">
            <div className="minimal-card p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4 text-walnut">Job Summary</h5>
              
              <ul className="list-unstyled mb-4 d-flex flex-column gap-3">
                <li className="d-flex align-items-start gap-3">
                  <div className="bg-sage-subtle p-2 rounded shadow-sm text-sage"><span role="img" aria-label="money">💵</span></div>
                  <div>
                    <span className="d-block text-meta mb-1">Salary</span>
                    <span className="fw-bold text-amber">{job.salary}</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <div className="bg-sage-subtle p-2 rounded shadow-sm text-sage"><span role="img" aria-label="location">📍</span></div>
                  <div>
                    <span className="d-block text-meta mb-1">Location</span>
                    <span className="fw-medium text-dark">{job.location}</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <div className="bg-sage-subtle p-2 rounded shadow-sm text-sage"><span role="img" aria-label="type">💼</span></div>
                  <div>
                    <span className="d-block text-meta mb-1">Job Type</span>
                    <span className="fw-medium text-dark">{job.jobType}</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <div className="bg-sage-subtle p-2 rounded shadow-sm text-sage"><span role="img" aria-label="category">📂</span></div>
                  <div>
                    <span className="d-block text-meta mb-1">Category</span>
                    <span className="fw-medium text-dark">{job.category}</span>
                  </div>
                </li>
              </ul>
              
              {applied ? (
                <div className="status-badge status-success d-flex align-items-center justify-content-center py-2 px-3 w-100" role="alert">
                  ✓ You have applied for this position
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={() => setShowApplyModal(true)}>
                    Apply for this Job
                  </Button>
                </div>
              )}

              {/* Report Job Section */}
              {currentUser?.role === 'jobseeker' && (
                <div className="mt-4 pt-3 border-top text-center">
                  {jobReported ? (
                    <span className="text-warning small d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-flag-fill"></i> Job has been reported for review.
                    </span>
                  ) : (
                    <button 
                      className="btn btn-link text-muted small text-decoration-none p-0 d-flex align-items-center justify-content-center gap-1 mx-auto hover-danger"
                      onClick={() => {
                        updateJobModerationStatus(job.id, 'Flagged');
                        setJobReported(true);
                        alert("Thank you. This job has been flagged for admin review.");
                      }}
                    >
                      <i className="bi bi-flag"></i> Report this job
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <Section className="py-5 border-top border-standard">
          <h3 className="fw-bold mb-4">Similar Opportunities</h3>
          <div className="row g-4">
            {relatedJobs.map(relatedJob => (
              <div className="col-md-6 col-lg-4" key={relatedJob.id}>
                <JobCard 
                  job={relatedJob} 
                  isSaved={isJobSaved(relatedJob.id)} 
                  onToggleSave={toggleSaveJob} 
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Application Modal */}
      <ApplyJobModal 
        show={showApplyModal} 
        onClose={() => setShowApplyModal(false)} 
        job={job} 
      />

    </PageContainer>
  );
};

export default JobDetails;
