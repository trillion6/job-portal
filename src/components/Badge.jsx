import React from 'react';

const Badge = ({ children, variant = 'sage', className = '', ...props }) => {
  let badgeStyle = 'badge-sage';

  switch (variant) {
    case 'primary':
    case 'amber':
      badgeStyle = 'badge-amber';
      break;
    case 'walnut':
      badgeStyle = 'badge-walnut';
      break;
    case 'success':
      badgeStyle = 'status-success';
      break;
    case 'warning':
      badgeStyle = 'status-warning';
      break;
    case 'danger':
    case 'error':
      badgeStyle = 'status-error';
      break;
    case 'info':
      badgeStyle = 'status-info';
      break;
    case 'secondary':
    case 'sage':
    default:
      badgeStyle = 'badge-sage';
      break;
  }

  return (
    <span className={`status-badge ${badgeStyle} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
