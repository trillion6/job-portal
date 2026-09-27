import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import { useJobPortal } from '../context/JobPortalContext';

const AccessDenied = () => {
  const navigate = useNavigate();
  const { currentUser } = useJobPortal();

  return (
    <PageContainer>
      <Section className="py-5 text-center min-vh-50 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 fw-bold text-danger mb-3">Nexora</h1>
        <h2 className="page-heading mb-4">Access Restricted</h2>
        <p className="text-body mb-4" style={{ maxWidth: '500px' }}>
          "You don't have permission to access this page."
        </p>
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <button onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-material px-4 py-2">
            <i className="bi bi-arrow-left me-2"></i> Go Back
          </button>
          <Link to="/" className="btn btn-primary btn-material px-4 py-2">
            <i className="bi bi-house me-2"></i> Return to Homepage
          </Link>
        </div>
      </Section>
    </PageContainer>
  );
};

export default AccessDenied;
