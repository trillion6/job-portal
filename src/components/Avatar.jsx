import React from 'react';

const Avatar = ({ name, size = 48 }) => {
  // Get initials (up to 2 characters)
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const fontSize = size * 0.4; // Scale font size based on avatar size

  return (
    <div 
      className="bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-flex justify-content-center align-items-center"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        fontSize: `${fontSize}px`,
        flexShrink: 0
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
