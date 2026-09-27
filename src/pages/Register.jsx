import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import PasswordInput from '../components/PasswordInput';
import PasswordStrength from '../components/PasswordStrength';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    jobRole: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // Simple length check for demonstration
    return phone.replace(/[^0-9]/g, '').length >= 10;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear confirm password error if typing in password
    if (name === 'password' && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.jobRole) {
      newErrors.jobRole = 'Please select a job role';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({ type: 'danger', message: 'Please correct the highlighted fields.' });
      return;
    }

    // Simulate successful registration
    setStatus({ type: 'success', message: 'Account created successfully! Redirecting to login...' });
    setErrors({});
    
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <AuthLayout title="Create Your Account">
      {status.message && (
        <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
          {status.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setStatus({ type: '', message: '' })}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormInput 
          label="Full Name" 
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          success={formData.fullName && !errors.fullName ? true : undefined}
        />

        <div className="row g-3">
          <div className="col-md-6">
            <FormInput 
              label="Email Address" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              success={formData.email && !errors.email ? true : undefined}
            />
          </div>
          <div className="col-md-6">
            <FormInput 
              label="Phone Number" 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              success={formData.phone && !errors.phone ? true : undefined}
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <FormInput 
              label="Location" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              success={formData.location && !errors.location ? true : undefined}
            />
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <select 
                className={`form-select form-control-material ${errors.jobRole ? 'is-invalid' : formData.jobRole ? 'is-valid' : ''}`} 
                id="jobRole" 
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                aria-invalid={!!errors.jobRole}
              >
                <option value="">Select a role...</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Designer">Designer</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="jobRole">Job Role</label>
              {errors.jobRole && (
                <div className="invalid-feedback d-block mt-1">
                  {errors.jobRole}
                </div>
              )}
            </div>
          </div>
        </div>

        <PasswordInput 
          label="Password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          success={formData.password && !errors.password ? true : undefined}
          className="mb-1"
        />
        <PasswordStrength password={formData.password} />

        <PasswordInput 
          label="Confirm Password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          success={formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword ? true : undefined}
        />

        <div className="form-check mb-4 mt-2">
          <input 
            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`} 
            type="checkbox" 
            id="terms" 
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label className="form-check-label text-body user-select-none" htmlFor="terms">
            I agree to the <a href="#" className="text-primary text-decoration-none hover-primary">Terms and Conditions</a> and Privacy Policy
          </label>
          {errors.terms && (
            <div className="invalid-feedback d-block">
              {errors.terms}
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" className="w-100 py-3 mb-3 fw-bold fs-5">
          Create Account
        </Button>

        <p className="text-center text-meta mt-3 mb-0">
          Already have an account? <Link to="/login" className="text-primary fw-medium text-decoration-none hover-primary">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
