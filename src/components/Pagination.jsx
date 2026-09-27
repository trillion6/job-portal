import React from 'react';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, current, and one around current
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-2 gap-2">
      <Button 
        variant="outline-primary" 
        className="px-3" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      <div className="d-none d-md-flex gap-1">
        {pages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="d-flex align-items-center px-2 text-secondary">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-primary border-0'} fw-medium`}
              style={{ width: '40px', height: '40px', borderRadius: '8px' }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      {/* Mobile view simple indicator */}
      <div className="d-md-none text-meta fw-medium px-2">
        Page {currentPage} of {totalPages}
      </div>

      <Button 
        variant="outline-primary" 
        className="px-3" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
