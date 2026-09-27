import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const CompanyProfile = () => {
  const { company, updateCompany } = useJobPortal();
  const [formData, setFormData] = useState({ ...company });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    // Convert comma separated string to array
    const val = e.target.value;
    const array = val.split(',').map(item => item.trim()).filter(item => item !== '');
    setFormData({ ...formData, [field]: array });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompany(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <PageContainer>
      <Section className="py-4">
        <div className="mb-4">
          <h1 className="h2 fw-bold">Company Profile</h1>
          <p className="text-secondary">Manage your company's public information.</p>
        </div>

        <GlassCard className="p-4 p-md-5 border-standard shadow-sm">
          <form onSubmit={handleSubmit}>
            
            <h5 className="fw-bold mb-4">Basic Information</h5>
            
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Company Name <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="name" 
                  value={formData.name || ''} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Industry <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="industry" 
                  value={formData.industry || ''} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Company Size</label>
                <select 
                  className="form-select form-control-material bg-light" 
                  name="size" 
                  value={formData.size || ''} 
                  onChange={handleChange}
                >
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="501-1000">501-1000 Employees</option>
                  <option value="1000+">1000+ Employees</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Founded Year</label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="founded" 
                  value={formData.founded || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Location <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="location" 
                  value={formData.location || ''} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Logo Initials (Max 2 chars)</label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="logo" 
                  value={formData.logo || ''} 
                  onChange={handleChange} 
                  maxLength="2"
                />
              </div>
              <div className="col-12">
                <label className="form-label text-meta fw-medium">About Company</label>
                <textarea 
                  className="form-control form-control-material bg-light" 
                  rows="4" 
                  name="description" 
                  value={formData.description || ''} 
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <h5 className="fw-bold mb-4">Contact & Links</h5>
            
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Website</label>
                <input 
                  type="url" 
                  className="form-control form-control-material bg-light" 
                  name="website" 
                  value={formData.website || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">LinkedIn</label>
                <input 
                  type="url" 
                  className="form-control form-control-material bg-light" 
                  name="linkedin" 
                  value={formData.linkedin || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Contact Email</label>
                <input 
                  type="email" 
                  className="form-control form-control-material bg-light" 
                  name="email" 
                  value={formData.email || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-meta fw-medium">Contact Phone</label>
                <input 
                  type="tel" 
                  className="form-control form-control-material bg-light" 
                  name="phone" 
                  value={formData.phone || ''} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <h5 className="fw-bold mb-4">Culture & Benefits</h5>
            
            <div className="row g-4 mb-5">
              <div className="col-12">
                <label className="form-label text-meta fw-medium">Company Culture</label>
                <textarea 
                  className="form-control form-control-material bg-light" 
                  rows="3" 
                  name="culture" 
                  value={formData.culture || ''} 
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12">
                <label className="form-label text-meta fw-medium">Benefits (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  value={formData.benefits ? formData.benefits.join(', ') : ''} 
                  onChange={(e) => handleArrayChange(e, 'benefits')} 
                  placeholder="e.g. Health Insurance, Remote Work, Flexible Hours"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-3 border-top pt-4">
              {isSaved && <span className="text-success fw-medium"><i className="bi bi-check-circle me-1"></i> Saved successfully</span>}
              <Button type="submit" variant="primary" className="px-4">Save Changes</Button>
            </div>
            
          </form>
        </GlassCard>
      </Section>
    </PageContainer>
  );
};

export default CompanyProfile;
