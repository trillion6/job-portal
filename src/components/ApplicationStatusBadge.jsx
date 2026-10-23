import React from 'react';

const ApplicationStatusBadge = ({ status }) => {
  let badgeClass = 'status-info';
  
  switch (status) {
    case 'Applied':
      badgeClass = 'status-info';
      break;
    case 'Under Review':
    case 'Pending':
      badgeClass = 'status-warning';
      break;
    case 'Shortlisted':
    case 'Interview':
      badgeClass = 'badge-sage';
      break;
    case 'Selected':
      badgeClass = 'status-success';
      break;
    case 'Rejected':
      badgeClass = 'status-error';
      break;
    default:
      badgeClass = 'badge-walnut';
  }

  return (
    <span className={`status-badge ${badgeClass}`}>
      {status}
    </span>
  );
};

export default ApplicationStatusBadge;
