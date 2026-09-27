import React, { useState, useId } from 'react';

const PasswordInput = ({ 
  label, 
  error, 
  success, 
  className = '', 
  ...props 
}) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine validation class
  let validationClass = '';
  if (error) validationClass = 'is-invalid';
  else if (success) validationClass = 'is-valid';

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`form-floating mb-3 position-relative ${className}`}>
      <input 
        type={showPassword ? 'text' : 'password'} 
        className={`form-control form-control-material ${validationClass}`} 
        id={id} 
        placeholder={label} 
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{ paddingRight: '2.5rem' }}
        {...props} 
      />
      <label htmlFor={id}>{label}</label>
      
      <button 
        type="button" 
        className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-muted px-3 shadow-none bg-transparent"
        onClick={toggleVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        style={{ height: 'calc(100% - 2px)' }} // accommodate border
      >
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/>
            <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
        )}
      </button>

      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
