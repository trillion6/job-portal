import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const PublicCompanyPage = () => {
  // In a real app we would use the ID to fetch the company. 
  // For this mock, we just use the single global company context if it exists.
  const { id } = useParams();
  const { company, jobs } = useJobPortal();

  // Find all active jobs for this company
  const companyJobs = useMemo(() => {
    return jobs.filter(job => job.company === company.name && job.status === 'Active');
  }, [jobs, company.name]);

  // If there's no company, or the ID doesn't match our single mocked company id (which is 1)
  if (!company || parseInt(id) !== company.id) {
    return (
      <PageContainer>
        <Section className="py-5 text-center">
          <h2 className="fw-bold mb-3">Company Not Found</h2>
          <p className="text-secondary mb-4">The company profile you are looking for does not exist.</p>
          <Link to="/jobs"><Button variant="primary">Browse Jobs</Button></Link>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      
      {/* Company Header */}
      <div className="bg-primary bg-opacity-10 py-5 border-bottom border-primary border-opacity-10">
        <div className="container">
          <div className="d-flex flex-column flex-md-row gap-4 align-items-md-center">
            <div className="bg-white rounded p-3 shadow-sm d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
              <span className="fs-1 fw-bold text-primary">{company.logo}</span>
            </div>
            <div>
              <h1 className="fw-bold mb-2">{company.name}</h1>
              <div className="d-flex flex-wrap gap-3 text-secondary text-meta">
                <span><i className="bi bi-building me-1"></i>{company.industry}</span>
                <span><i className="bi bi-geo-alt me-1"></i>{company.location}</span>
                <span><i className="bi bi-people me-1"></i>{company.size} employees</span>
              </div>
              <div className="d-flex gap-2 mt-3">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3">
                    <i className="bi bi-globe me-1"></i> Website
                  </a>
                )}
                {company.linkedin && (
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3">
                    <i className="bi bi-linkedin me-1"></i> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section className="py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <GlassCard className="p-4 p-md-5 mb-4 border-standard shadow-sm">
              <h4 className="fw-bold mb-4">About Us</h4>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>{company.description}</p>
              
              <h4 className="fw-bold mt-5 mb-4">Our Culture</h4>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>{company.culture}</p>
            </GlassCard>

            <h4 className="fw-bold mb-4 mt-5">Open Positions ({companyJobs.length})</h4>
            {companyJobs.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {companyJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <GlassCard className="p-4 text-center border-standard shadow-sm">
                <p className="text-secondary mb-0">No open positions at the moment.</p>
              </GlassCard>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <GlassCard className="p-4 border-standard shadow-sm sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Company Overview</h5>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div>
                  <span className="text-meta text-secondary d-block mb-1">Founded</span>
                  <span className="fw-medium">{company.founded || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-meta text-secondary d-block mb-1">Headquarters</span>
                  <span className="fw-medium">{company.location}</span>
                </div>
                <div>
                  <span className="text-meta text-secondary d-block mb-1">Industry</span>
                  <span className="fw-medium">{company.industry}</span>
                </div>
                {company.email && (
                  <div>
                    <span className="text-meta text-secondary d-block mb-1">Contact Email</span>
                    <a href={`mailto:${company.email}`} className="fw-medium text-primary text-decoration-none">{company.email}</a>
                  </div>
                )}
              </div>

              {company.benefits && company.benefits.length > 0 && (
                <>
                  <hr className="my-4 text-secondary opacity-25" />
                  <h6 className="fw-bold mb-3">Benefits & Perks</h6>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {company.benefits.map((benefit, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 text-secondary">
                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default PublicCompanyPage;
