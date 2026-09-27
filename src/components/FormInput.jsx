import React, { useId } from 'react';

const FormInput = ({ 
  label, 
  type = 'text', 
  error, 
  success, 
  className = '', 
  ...props 
}) => {
  const id = useId();
  
  // Determine validation class
  let validationClass = '';
  if (error) validationClass = 'is-invalid';
  else if (success) validationClass = 'is-valid';

  return (
    <div className={`form-floating mb-3 ${className}`}>
      <input 
        type={type} 
        className={`form-control form-control-material ${validationClass}`} 
        id={id} 
        placeholder={label} 
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props} 
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
