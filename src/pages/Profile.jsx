import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { useJobPortal } from '../context/JobPortalContext';

const Profile = () => {
  const { profile, updateProfile } = useJobPortal();
  const navigate = useNavigate();

  // Local state for the form
  const [formData, setFormData] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    // Allow comma-separated skills
    const skillsArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.title.trim()) newErrors.title = 'Professional title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    if (formData.linkedin && !/^https?:\/\/.*/.test(formData.linkedin)) {
      newErrors.linkedin = 'LinkedIn must be a valid URL (e.g., https://...)';
    }
    if (formData.portfolio && !/^https?:\/\/.*/.test(formData.portfolio)) {
      newErrors.portfolio = 'Portfolio must be a valid URL (e.g., https://...)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile(formData);
      setShowSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <PageContainer>
      <Section className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 fw-bold mb-0">Edit Profile</h1>
          <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        {showSuccess && (
          <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            ✓ <strong>Success!</strong> Profile updated successfully.
            <button type="button" className="btn-close" onClick={() => setShowSuccess(false)} aria-label="Close"></button>
          </div>
        )}

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <Card className="p-4 p-md-5 border-standard shadow-sm">
              <form onSubmit={handleSubmit} noValidate>
                
                {/* Avatar Section */}
                <div className="d-flex align-items-center gap-4 mb-5 pb-4 border-bottom border-standard">
                  <Avatar name={formData.name} size={80} />
                  <div>
                    <h5 className="fw-bold mb-1">Profile Photo</h5>
                    <p className="text-secondary small mb-2">Generated from your name initials.</p>
                    <Button variant="outline-primary" size="sm" disabled>Upload Photo (Phase 8)</Button>
                  </div>
                </div>

                {/* Personal Information */}
                <h5 className="fw-bold mb-4">Personal Information</h5>
                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Full Name *</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anil Kumar"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Email Address *</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anil@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Location *</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`} 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Chandigarh, India"
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </div>
                </div>

                {/* Professional Information */}
                <h5 className="fw-bold mb-4">Professional Information</h5>
                <div className="row g-4 mb-5">
                  <div className="col-md-12">
                    <label className="form-label fw-medium text-dark">Professional Title *</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Full Stack Developer"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Experience</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="experience"
                      value={formData.experience || ''}
                      onChange={handleChange}
                      placeholder="e.g. 3 Years"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Education</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="education"
                      value={formData.education || ''}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech in Computer Science"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-medium text-dark">Skills (Comma separated)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="skills"
                      value={formData.skills ? formData.skills.join(', ') : ''}
                      onChange={handleSkillsChange}
                      placeholder="e.g. React, Node.js, Python"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-medium text-dark">Bio / Summary</label>
                    <textarea 
                      className="form-control" 
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Brief summary of your professional background..."
                    ></textarea>
                  </div>
                </div>

                {/* Social Links */}
                <h5 className="fw-bold mb-4">Links</h5>
                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">LinkedIn URL</label>
                    <input 
                      type="url" 
                      className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`} 
                      name="linkedin"
                      value={formData.linkedin || ''}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {errors.linkedin && <div className="invalid-feedback">{errors.linkedin}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-dark">Portfolio / Website</label>
                    <input 
                      type="url" 
                      className={`form-control ${errors.portfolio ? 'is-invalid' : ''}`} 
                      name="portfolio"
                      value={formData.portfolio || ''}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                    />
                    {errors.portfolio && <div className="invalid-feedback">{errors.portfolio}</div>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-end pt-4 border-top border-standard">
                  <Button type="button" variant="light" className="px-4" onClick={() => {
                    setFormData({ ...profile });
                    setErrors({});
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="px-5">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default Profile;
