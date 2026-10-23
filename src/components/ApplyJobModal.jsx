import React, { useState } from 'react';
import Button from './Button';
import { useJobPortal } from '../context/JobPortalContext';
import { Link } from 'react-router-dom';

const ApplyJobModal = ({ show, onClose, job }) => {
  const { applyForJob, currentUser } = useJobPortal();
  
  const [formData, setFormData] = useState({
    fullName: currentUser.name || '',
    email: currentUser.email || '',
    phone: '',
    location: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    declaration: false
  });
  
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!show || !job) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid Email is required.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit Phone Number is required.';
    if (!fileName) newErrors.resume = 'Resume file is required.';
    if (!formData.location.trim()) newErrors.location = 'Current Location is required.';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required.';
    if (!formData.coverLetter.trim() || formData.coverLetter.length < 50) newErrors.coverLetter = 'Cover letter must be at least 50 characters.';
    if (formData.portfolio && !/^https?:\/\/\S+\.\S+$/.test(formData.portfolio)) newErrors.portfolio = 'Please enter a valid URL.';
    if (!formData.declaration) newErrors.declaration = 'You must accept the declaration.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      if (errors.resume) setErrors(prev => ({ ...prev, resume: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      applyForJob({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        applicantName: formData.fullName,
        applicantEmail: formData.email
      });
      setSubmitted(true);
    }
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(23, 26, 20, 0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050,
    overflowY: 'auto',
    padding: '20px'
  };

  const contentStyle = {
    backgroundColor: 'var(--surface-color)',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid var(--border-standard)'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()} className="shadow-lg">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-standard">
          <h5 className="mb-0 fw-bold text-walnut">{submitted ? 'Application Successful' : `Apply for ${job.title}`}</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>

        {/* Body */}
        <div className="p-4">
          {submitted ? (
            <div className="text-center py-4">
              <div className="status-badge status-success p-3 rounded-circle fs-2 mb-3 mx-auto" style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✓
              </div>
              <h4 className="fw-bold mb-2 text-walnut">Application Submitted Successfully</h4>
              <p className="text-secondary mb-4">
                You have successfully applied for the <strong>{job.title}</strong> position at <strong>{job.company}</strong>.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/applications" className="text-decoration-none">
                  <Button variant="primary" onClick={onClose}>View My Applications</Button>
                </Link>
                <Button variant="outline-secondary" onClick={onClose}>Continue Exploring</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-secondary mb-4">Please fill out the form below to apply for the position at {job.company}.</p>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Full Name <span className="text-danger">*</span></label>
                  <input type="text" name="fullName" className={`form-control form-control-material ${errors.fullName ? 'is-invalid' : ''}`} value={formData.fullName} onChange={handleChange} />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Email Address <span className="text-danger">*</span></label>
                  <input type="email" name="email" className={`form-control form-control-material ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Phone Number <span className="text-danger">*</span></label>
                  <input type="tel" name="phone" className={`form-control form-control-material ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} placeholder="10 digits" />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Current Location <span className="text-danger">*</span></label>
                  <input type="text" name="location" className={`form-control form-control-material ${errors.location ? 'is-invalid' : ''}`} value={formData.location} onChange={handleChange} />
                  {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Total Experience <span className="text-danger">*</span></label>
                  <select name="experience" className={`form-select form-control-material ${errors.experience ? 'is-invalid' : ''}`} value={formData.experience} onChange={handleChange}>
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-medium text-sm">Portfolio / LinkedIn URL</label>
                  <input type="url" name="portfolio" className={`form-control form-control-material ${errors.portfolio ? 'is-invalid' : ''}`} value={formData.portfolio} onChange={handleChange} placeholder="https://" />
                  {errors.portfolio && <div className="invalid-feedback">{errors.portfolio}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-medium text-sm">Resume <span className="text-danger">*</span></label>
                  <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-primary" size="sm" type="button" onClick={() => document.getElementById('resumeUpload').click()}>
                      Choose File
                    </Button>
                    <span className="text-secondary text-sm">{fileName || 'No file selected'}</span>
                  </div>
                  <input type="file" id="resumeUpload" className="d-none" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  {errors.resume && <div className="text-danger text-sm mt-1">{errors.resume}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-medium text-sm">Cover Letter <span className="text-danger">*</span></label>
                  <textarea name="coverLetter" className={`form-control form-control-material ${errors.coverLetter ? 'is-invalid' : ''}`} rows="4" value={formData.coverLetter} onChange={handleChange} placeholder="Why are you a great fit for this role? (Min 50 chars)"></textarea>
                  {errors.coverLetter && <div className="invalid-feedback">{errors.coverLetter}</div>}
                </div>

                <div className="col-12">
                  <div className="form-check mt-2">
                    <input className={`form-check-input ${errors.declaration ? 'is-invalid' : ''}`} type="checkbox" name="declaration" id="declarationCheck" checked={formData.declaration} onChange={handleChange} />
                    <label className="form-check-label text-sm text-secondary" htmlFor="declarationCheck">
                      I declare that the information provided is true and correct to the best of my knowledge.
                    </label>
                    {errors.declaration && <div className="invalid-feedback">{errors.declaration}</div>}
                  </div>
                </div>
              </div>
              
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <Button variant="outline-secondary" type="button" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit">Submit Application</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
