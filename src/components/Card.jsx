import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`minimal-card p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
