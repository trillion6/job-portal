import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = 'bi-inbox', 
  title = 'No Data Available', 
  description = 'There is nothing to show here at the moment.',
  actionLabel = '',
  actionLink = '',
  actionOnClick = null
}) => {
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className={`bi ${icon} text-muted`} style={{ fontSize: '3rem' }}></i>
      </div>
      <h4 className="fw-bold text-dark">{title}</h4>
      <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        {description}
      </p>
      
      {actionLabel && (
        actionLink ? (
          <Link to={actionLink} className="btn btn-primary btn-material">
            {actionLabel}
          </Link>
        ) : (
          <button onClick={actionOnClick} className="btn btn-primary btn-material">
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
