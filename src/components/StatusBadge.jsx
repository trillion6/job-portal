import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  let badgeClass = 'badge-walnut';
  
  switch (status?.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'accepted':
    case 'hired':
    case 'selected':
      badgeClass = 'status-success';
      break;
    case 'pending':
    case 'pending review':
    case 'in review':
    case 'under review':
      badgeClass = 'status-warning';
      break;
    case 'rejected':
    case 'suspended':
    case 'closed':
    case 'flagged':
      badgeClass = 'status-error';
      break;
    case 'interview':
    case 'shortlisted':
    case 'applied':
      badgeClass = 'status-info';
      break;
    default:
      badgeClass = 'badge-sage';
  }

  return (
    <span className={`status-badge ${badgeClass} ${className}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
