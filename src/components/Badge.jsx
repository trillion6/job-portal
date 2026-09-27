import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  // Use bootstrap badge but apply our own minimal aesthetic (pills)
  return (
    <span className={`badge rounded-pill bg-${variant} bg-opacity-10 text-${variant} px-3 py-2 fw-medium ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
