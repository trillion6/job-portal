import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';
import { useJobPortal } from '../context/JobPortalContext';

const MyApplications = () => {
  const { applications } = useJobPortal();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const uniqueStatuses = ['All', ...new Set(applications.map(app => app.status))];

  return (
    <PageContainer>
      <Section className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">My Applications</h1>
          {applications.length > 0 && (
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-6 rounded-pill">
              {applications.length} total
            </span>
          )}
        </div>

        {applications.length > 0 ? (
          <>
            <div className="row g-3 mb-4">
              <div className="col-md-8 col-lg-6">
                <input 
                  type="text" 
                  className="form-control form-control-lg border-standard" 
                  placeholder="Search by job title or company..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-lg-3">
                <select 
                  className="form-select form-select-lg border-standard"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredApplications.length > 0 ? (
              <div className="row g-4">
                {filteredApplications.map(app => (
                  <div className="col-12" key={app.id}>
                    <Card className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 p-4">
                      <div>
                        <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
                          <h4 className="fw-bold mb-0">{app.jobTitle}</h4>
                          <ApplicationStatusBadge status={app.status} />
                        </div>
                        <p className="text-primary fs-5 mb-3">{app.company}</p>
                        
                        <div className="text-secondary d-flex flex-wrap gap-4 text-sm">
                          <span><strong>Applicant:</strong> {app.applicantName}</span>
                          <span><strong>Applied on:</strong> {app.appliedDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-3 mt-md-0">
                        <Link to={`/jobs/${app.jobId}`} className="text-decoration-none">
                          <Button variant="outline-primary" className="w-100">
                            View Job
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-light rounded border border-standard border-dashed">
                <p className="text-secondary mb-0">No applications match your filters.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5 px-3 bg-light rounded border border-standard border-dashed">
            <div className="fs-1 mb-3">📄</div>
            <h4 className="fw-bold mb-2">No applications yet</h4>
            <p className="text-secondary mb-4">
              You haven't applied to any jobs yet. Start exploring and find your dream job!
            </p>
            <Link to="/jobs" className="text-decoration-none">
              <Button variant="primary" className="px-4">
                Explore Jobs
              </Button>
            </Link>
          </div>
        )}
      </Section>
    </PageContainer>
  );
};

export default MyApplications;
