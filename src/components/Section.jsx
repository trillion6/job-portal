import React from 'react';

const Section = ({ children, className = '', id, bg = 'transparent' }) => {
  return (
    <section id={id} className={`py-5 bg-${bg} ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
};

export default Section;
