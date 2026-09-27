import React from 'react';
import GlassCard from './GlassCard';

const CompanyCard = ({ company }) => {
  return (
    <GlassCard variant="standard" className="text-center h-100 d-flex flex-column align-items-center hover-primary">
      <div className="bg-light rounded-circle p-3 mb-3 d-flex align-items-center justify-content-center fw-bold text-primary fs-3 shadow-sm border" style={{ width: '80px', height: '80px' }}>
        {company.logo}
      </div>
      <h6 className="card-title mb-1 text-dark">{company.name}</h6>
      <p className="text-meta mb-3">{company.industry} • {company.location}</p>
      <div className="mt-auto pt-3 border-top w-100">
        <span className="text-primary fw-medium text-sm">
          {company.openJobs} Open Jobs &rarr;
        </span>
      </div>
    </GlassCard>
  );
};

export default CompanyCard;
