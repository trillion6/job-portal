import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useJobPortal();

  return (
    <button 
      onClick={toggleTheme} 
      className={`btn btn-link nav-link p-2 text-dark ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ borderRadius: '50%', width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.1)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-stars fs-5"></i>
      ) : (
        <i className="bi bi-sun fs-5 text-warning"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
