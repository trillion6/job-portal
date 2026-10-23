import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false,
  size = '',
  onClick,
  ...props 
}) => {
  let btnClass = 'btn-primary-custom';

  switch (variant) {
    case 'primary':
      btnClass = 'btn-primary-custom';
      break;
    case 'secondary':
    case 'sage':
      btnClass = 'btn-secondary-custom';
      break;
    case 'outline-primary':
      btnClass = 'btn-outline-primary';
      break;
    case 'outline-sage':
      btnClass = 'btn-outline-sage';
      break;
    case 'outline-walnut':
      btnClass = 'btn-outline-walnut';
      break;
    case 'walnut':
      btnClass = 'btn-walnut';
      break;
    default:
      btnClass = `btn-${variant}`;
  }

  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button 
      type={type} 
      className={`btn btn-material ${btnClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
