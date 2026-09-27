import React from 'react';

const GlassCard = ({ children, className = '', variant = 'standard', ...props }) => {
  // variant can be 'light', 'standard', 'featured'
  const glassClass = `glass-${variant}`;
  
  return (
    <div className={`glass-card ${glassClass} p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
