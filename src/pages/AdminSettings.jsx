import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Navigate } from 'react-router-dom';

const AdminSettings = () => {
  const { currentUser } = useJobPortal();

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-1">Platform Settings</h1>
            <p className="text-secondary mb-0">Configure global Nexora settings.</p>
          </div>
        </div>
      </Section>

      <Section className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
             <GlassCard className="p-5">
                <i className="bi bi-gear display-1 text-muted mb-3"></i>
                <h3 className="fw-bold">Settings Configuration</h3>
                <p className="text-secondary mb-0">Platform configuration settings are coming in a future update.</p>
             </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default AdminSettings;
