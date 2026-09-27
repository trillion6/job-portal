import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const ApplicantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, jobs, updateApplicationStatus } = useJobPortal();

  const application = applications.find(app => app.id === parseInt(id));
  const job = jobs.find(j => j.id === application?.jobId);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!application) {
    return (
      <PageContainer>
        <Section className="py-5 text-center">
          <h2 className="fw-bold mb-3">Applicant Not Found</h2>
          <Button variant="primary" onClick={() => navigate('/recruiter/applicants')}>Back to Applicants</Button>
        </Section>
      </PageContainer>
    );
  }

  const handleStatusChange = (newStatus) => {
    setIsUpdating(true);
    updateApplicationStatus(application.id, newStatus);
    
    // Simulate network delay
    setTimeout(() => {
      setIsUpdating(false);
    }, 600);
  };

  return (
    <PageContainer>
      <Section className="py-4">
        <div className="mb-4 d-flex align-items-center gap-3">
          <Button variant="outline-secondary" onClick={() => navigate('/recruiter/applicants')} className="rounded-circle p-2 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-arrow-left"></i>
          </Button>
          <h1 className="h3 fw-bold mb-0">Application Review</h1>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <GlassCard className="p-4 p-md-5 border-standard shadow-sm mb-4">
              <div className="d-flex flex-column flex-md-row gap-4 mb-4 pb-4 border-bottom">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center text-primary fw-bold flex-shrink-0" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  {application.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="fw-bold mb-1">{application.fullName}</h2>
                  <div className="d-flex flex-wrap gap-3 text-secondary mb-3">
                    <span><i className="bi bi-envelope me-1"></i>{application.email}</span>
                    <span><i className="bi bi-telephone me-1"></i>{application.phone}</span>
                  </div>
                  {application.portfolio && (
                    <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3 me-2">
                      <i className="bi bi-link-45deg me-1"></i> Portfolio
                    </a>
                  )}
                  {application.linkedin && (
                    <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3">
                      <i className="bi bi-linkedin me-1"></i> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              <h5 className="fw-bold mb-3">Cover Letter / Note</h5>
              <div className="bg-light p-4 rounded text-secondary" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                {application.coverLetter || "No cover letter provided."}
              </div>

              {application.resumeFile && (
                <div className="mt-4 pt-4 border-top">
                  <h5 className="fw-bold mb-3">Attached Resume</h5>
                  <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded border border-standard">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-file-earmark-pdf fs-3 text-danger"></i>
                      <div>
                        <span className="fw-medium d-block">{application.resumeFile.name || 'resume.pdf'}</span>
                        <span className="text-meta text-secondary">PDF Document</span>
                      </div>
                    </div>
                    <Button variant="outline-primary" size="sm">Download</Button>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          <div className="col-12 col-lg-4">
            <GlassCard className="p-4 border-standard shadow-sm sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Application Details</h5>
              
              <div className="mb-4">
                <span className="text-meta text-secondary d-block mb-1">Applied For</span>
                <Link to={`/jobs/${job?.id}`} className="fw-medium text-decoration-none">{job?.title}</Link>
              </div>
              
              <div className="mb-4">
                <span className="text-meta text-secondary d-block mb-1">Date Applied</span>
                <span className="fw-medium">{application.appliedDate}</span>
              </div>

              <hr className="my-4 text-secondary opacity-25" />
              
              <h5 className="fw-bold mb-3">Update Status</h5>
              <div className="d-flex flex-column gap-2">
                <button 
                  className={`btn text-start p-3 border ${application.status === 'Applied' ? 'border-info bg-info bg-opacity-10 text-info' : 'border-standard text-secondary'} rounded`}
                  onClick={() => handleStatusChange('Applied')}
                  disabled={isUpdating}
                >
                  <div className="fw-bold mb-1">Applied (New)</div>
                  <div className="text-meta opacity-75">Application received and pending review.</div>
                </button>

                <button 
                  className={`btn text-start p-3 border ${application.status === 'Shortlisted' ? 'border-primary bg-primary bg-opacity-10 text-primary' : 'border-standard text-secondary'} rounded`}
                  onClick={() => handleStatusChange('Shortlisted')}
                  disabled={isUpdating}
                >
                  <div className="fw-bold mb-1">Shortlisted</div>
                  <div className="text-meta opacity-75">Candidate passed initial screening.</div>
                </button>

                <button 
                  className={`btn text-start p-3 border ${application.status === 'Interview' ? 'border-warning bg-warning bg-opacity-10 text-warning' : 'border-standard text-secondary'} rounded`}
                  onClick={() => handleStatusChange('Interview')}
                  disabled={isUpdating}
                >
                  <div className="fw-bold mb-1">Interview</div>
                  <div className="text-meta opacity-75">Currently interviewing candidate.</div>
                </button>

                <button 
                  className={`btn text-start p-3 border ${application.status === 'Selected' ? 'border-success bg-success bg-opacity-10 text-success' : 'border-standard text-secondary'} rounded`}
                  onClick={() => handleStatusChange('Selected')}
                  disabled={isUpdating}
                >
                  <div className="fw-bold mb-1">Selected</div>
                  <div className="text-meta opacity-75">Candidate has been hired.</div>
                </button>

                <button 
                  className={`btn text-start p-3 border ${application.status === 'Rejected' ? 'border-danger bg-danger bg-opacity-10 text-danger' : 'border-standard text-secondary'} rounded`}
                  onClick={() => handleStatusChange('Rejected')}
                  disabled={isUpdating}
                >
                  <div className="fw-bold mb-1">Rejected</div>
                  <div className="text-meta opacity-75">Candidate is no longer being considered.</div>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default ApplicantDetails;
