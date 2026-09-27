import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from './PageContainer';
import Section from './Section';
import GlassCard from './GlassCard';

const AuthLayout = ({ children, title }) => {
  const { theme } = useJobPortal();
  
  return (
    <PageContainer as="div" className="d-flex align-items-center bg-light py-5" style={{ minHeight: 'calc(100vh - 76px)' }}>
      {/* Decorative background element for glassmorphism pop */}
      <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-primary opacity-10" style={{ filter: 'blur(100px)', zIndex: 0, maxWidth: '800px', maxHeight: '800px', borderRadius: '50%' }}></div>
      
      <Section className="w-100 position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <GlassCard variant="standard" className="p-4 p-md-5 shadow-lg border-0">
              <div className="text-center mb-4">
                <img src={theme === 'dark' ? "/branding/nexora-icon-dark.svg" : "/branding/nexora-icon.svg"} alt="Nexora" height="48" className="mb-3" />
                <h1 className="fw-bold text-dark mb-1">{title}</h1>
                <p className="text-secondary">Where Talent Meets Opportunity.</p>
              </div>
              {children}
            </GlassCard>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default AuthLayout;
