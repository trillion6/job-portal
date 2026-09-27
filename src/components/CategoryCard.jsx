import React from 'react';
import Card from './Card';

const CategoryCard = ({ category }) => {
  return (
    <Card className="text-center h-100 d-flex flex-column align-items-center justify-content-center py-4 text-decoration-none hover-primary">
      <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 d-flex align-items-center justify-content-center fs-3" style={{ width: '64px', height: '64px' }}>
        {category.icon}
      </div>
      <h6 className="card-title mb-1 text-dark">{category.name}</h6>
      <span className="text-meta">{category.count.toLocaleString()} open positions</span>
    </Card>
  );
};

export default CategoryCard;
