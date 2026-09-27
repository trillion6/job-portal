import React from 'react';
import Badge from './Badge';

const ApplicationStatusBadge = ({ status }) => {
  let variant = 'secondary';
  
  switch (status) {
    case 'Applied':
      variant = 'info';
      break;
    case 'Under Review':
      variant = 'warning';
      break;
    case 'Shortlisted':
    case 'Interview':
      variant = 'primary';
      break;
    case 'Selected':
      variant = 'success';
      break;
    case 'Rejected':
      variant = 'danger';
      break;
    default:
      variant = 'secondary';
  }

  return (
    <Badge variant={variant} className={`bg-opacity-10 text-${variant} border border-${variant} border-opacity-25`}>
      {status}
    </Badge>
  );
};

export default ApplicationStatusBadge;
