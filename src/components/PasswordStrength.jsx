import React from 'react';

const PasswordStrength = ({ password }) => {
  // Simple strength calculation
  let strength = 0;
  if (password.length > 5) strength += 1;
  if (password.length > 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  let strengthLabel = 'Weak';
  let barColor = 'bg-danger';
  let progress = 33;

  if (password.length === 0) {
    progress = 0;
    strengthLabel = '';
  } else if (strength >= 4) {
    strengthLabel = 'Strong';
    barColor = 'bg-success';
    progress = 100;
  } else if (strength >= 2) {
    strengthLabel = 'Medium';
    barColor = 'bg-warning';
    progress = 66;
  }

  return (
    <div className="mb-3">
      <div className="progress mb-1" style={{ height: '6px' }}>
        <div 
          className={`progress-bar ${barColor}`} 
          role="progressbar" 
          style={{ width: `${progress}%`, transition: 'width 0.3s ease' }} 
          aria-valuenow={progress} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
      {strengthLabel && (
        <small className="text-muted d-block text-end" style={{ fontSize: '0.75rem' }}>
          Password strength: <span className="fw-medium">{strengthLabel}</span>
        </small>
      )}
    </div>
  );
};

export default PasswordStrength;
