import React from 'react';

const PageContainer = ({ children, className = '', as: Component = 'main' }) => {
  return (
    <Component className={`page-container flex-grow-1 ${className}`}>
      {children}
    </Component>
  );
};

export default PageContainer;
