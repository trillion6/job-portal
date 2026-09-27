import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useJobPortal();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({ type: 'danger', message: 'Please correct the highlighted fields.' });
      return;
    }

    // Simulate authentication
    if (formData.email === 'test@example.com' && formData.password === 'wrongpass') {
      setStatus({ type: 'danger', message: 'Invalid email or password.' });
    } else {
      setCurrentUser(prev => ({ ...prev, isLoggedIn: true }));
      setStatus({ type: 'success', message: 'Login successful! Welcome back.' });
      setErrors({});
      // Simulate redirect to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      {status.message && (
        <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
          {status.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setStatus({ type: '', message: '' })}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormInput 
          label="Email Address" 
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          success={formData.email && !errors.email ? true : undefined}
          autoComplete="email"
        />

        <PasswordInput 
          label="Password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          success={formData.password && !errors.password ? true : undefined}
          autoComplete="current-password"
        />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="rememberMe" 
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label text-body user-select-none" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#" className="text-primary text-decoration-none fw-medium text-sm hover-primary">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" className="w-100 py-3 mb-3 fw-bold fs-5">
          Log In
        </Button>

        <p className="text-center text-meta mt-4 mb-0">
          Don't have an account? <Link to="/register" className="text-primary fw-medium text-decoration-none hover-primary">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
