import React from 'react';
import Card from './Card';

const CategoryCard = ({ category }) => {
  return (
    <Card className="minimal-card text-center h-100 d-flex flex-column align-items-center justify-content-center py-4 text-decoration-none">
      <div 
        className="rounded-circle p-3 mb-3 d-flex align-items-center justify-content-center fs-3 shadow-sm" 
        style={{ 
          width: '64px', 
          height: '64px', 
          backgroundColor: 'var(--btn-secondary-bg)', 
          color: 'var(--brand-walnut)' 
        }}
      >
        {category.icon}
      </div>
      <h6 className="card-title mb-1 text-dark fw-bold">{category.name}</h6>
      <span className="text-meta">{category.count.toLocaleString()} open positions</span>
    </Card>
  );
};

export default CategoryCard;
