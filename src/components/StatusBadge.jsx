import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  let badgeClass = 'bg-secondary text-white';
  
  switch (status?.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'accepted':
    case 'hired':
      badgeClass = 'bg-success text-white';
      break;
    case 'pending':
    case 'in review':
    case 'interview':
      badgeClass = 'bg-warning text-dark';
      break;
    case 'rejected':
    case 'suspended':
    case 'closed':
      badgeClass = 'bg-danger text-white';
      break;
    default:
      badgeClass = 'bg-secondary text-white';
  }

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
