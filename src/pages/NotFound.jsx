import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';

const NotFound = () => {
  return (
    <PageContainer>
      <Section className="py-5 text-center min-vh-50 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 fw-bold text-primary mb-3">Nexora</h1>
        <h2 className="page-heading mb-4">Page Not Found</h2>
        <p className="text-body mb-4" style={{ maxWidth: '500px' }}>
          This page doesn't exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-material px-4 py-2">
          <i className="bi bi-house me-2"></i> Return to Homepage
        </Link>
      </Section>
    </PageContainer>
  );
};

export default NotFound;
