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
  const btnClass = variant === 'primary' ? 'btn-primary-custom' : `btn-${variant}`;
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
