import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useJobPortal } from '../context/JobPortalContext';

const JobPostForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { jobs, addJob, updateJob } = useJobPortal();

  const initialFormState = {
    title: '',
    location: '',
    salary: '',
    jobType: 'Full Time',
    experience: '',
    category: 'Software Development',
    skills: [],
    description: '',
    responsibilities: [],
    requirements: []
  };

  const [formData, setFormData] = useState(initialFormState);
  
  // Array string states for easy input
  const [skillsStr, setSkillsStr] = useState('');
  const [reqsStr, setReqsStr] = useState('');
  const [respStr, setRespStr] = useState('');

  useEffect(() => {
    if (isEditing) {
      const jobToEdit = jobs.find(j => j.id === parseInt(id));
      if (jobToEdit) {
        setFormData({ ...jobToEdit });
        setSkillsStr(jobToEdit.skills ? jobToEdit.skills.join(', ') : '');
        setReqsStr(jobToEdit.requirements ? jobToEdit.requirements.join('\n') : '');
        setRespStr(jobToEdit.responsibilities ? jobToEdit.responsibilities.join('\n') : '');
      } else {
        navigate('/recruiter/jobs');
      }
    }
  }, [id, isEditing, jobs, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (value, field) => {
    const array = value.split(field === 'skills' ? ',' : '\n').map(item => item.trim()).filter(item => item !== '');
    setFormData({ ...formData, [field]: array });
  };

  const handleSkillsChange = (e) => {
    setSkillsStr(e.target.value);
    handleArrayChange(e.target.value, 'skills');
  };

  const handleReqsChange = (e) => {
    setReqsStr(e.target.value);
    handleArrayChange(e.target.value, 'requirements');
  };

  const handleRespChange = (e) => {
    setRespStr(e.target.value);
    handleArrayChange(e.target.value, 'responsibilities');
  };

  const handleSubmit = (e, status = 'Active') => {
    e.preventDefault();
    const finalData = { ...formData, status };
    
    if (isEditing) {
      updateJob(parseInt(id), finalData);
    } else {
      addJob(finalData);
    }
    navigate('/recruiter/jobs');
  };

  return (
    <PageContainer>
      <Section className="py-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <Button variant="outline-secondary" onClick={() => navigate('/recruiter/jobs')} className="rounded-circle p-2 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-arrow-left"></i>
          </Button>
          <div>
            <h1 className="h2 fw-bold mb-1">{isEditing ? 'Edit Job Posting' : 'Post a New Job'}</h1>
            <p className="text-secondary mb-0">Fill in the details to publish a new open position.</p>
          </div>
        </div>

        <GlassCard className="p-4 p-md-5 border-standard shadow-sm">
          <form onSubmit={(e) => handleSubmit(e, 'Active')}>
            
            <h5 className="fw-bold mb-4">Job Basics</h5>
            
            <div className="row g-4 mb-5">
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Job Title <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Senior Product Designer"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Location <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Remote, or New York, NY"
                />
              </div>
              
              <div className="col-12 col-md-4">
                <label className="form-label text-meta fw-medium">Job Category</label>
                <select 
                  className="form-select form-control-material bg-light" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-meta fw-medium">Job Type</label>
                <select 
                  className="form-select form-control-material bg-light" 
                  name="jobType" 
                  value={formData.jobType} 
                  onChange={handleChange}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-meta fw-medium">Experience Level</label>
                <select 
                  className="form-select form-control-material bg-light" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange}
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5-8 Years">5-8 Years</option>
                  <option value="8+ Years">8+ Years</option>
                </select>
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Salary Range</label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  name="salary" 
                  value={formData.salary} 
                  onChange={handleChange} 
                  placeholder="e.g. $80,000 - $120,000 (Optional)"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Skills (Comma separated) <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-material bg-light" 
                  value={skillsStr} 
                  onChange={handleSkillsChange} 
                  required
                  placeholder="e.g. React, Node.js, UI/UX"
                />
              </div>
            </div>

            <h5 className="fw-bold mb-4">Job Details</h5>
            
            <div className="row g-4 mb-5">
              <div className="col-12">
                <label className="form-label text-meta fw-medium">Job Description <span className="text-danger">*</span></label>
                <textarea 
                  className="form-control form-control-material bg-light" 
                  rows="4" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  required
                  placeholder="Describe the role, the team, and what the candidate will be doing."
                ></textarea>
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Key Responsibilities (One per line)</label>
                <textarea 
                  className="form-control form-control-material bg-light" 
                  rows="5" 
                  value={respStr} 
                  onChange={handleRespChange}
                  placeholder="Write each responsibility on a new line"
                ></textarea>
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label text-meta fw-medium">Requirements (One per line)</label>
                <textarea 
                  className="form-control form-control-material bg-light" 
                  rows="5" 
                  value={reqsStr} 
                  onChange={handleReqsChange}
                  placeholder="Write each requirement on a new line"
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center border-top pt-4">
              <Button type="button" variant="outline-danger" onClick={() => navigate('/recruiter/jobs')}>Cancel</Button>
              <div className="d-flex gap-2">
                <Button type="button" variant="outline-primary" onClick={(e) => handleSubmit(e, 'Draft')}>Save as Draft</Button>
                <Button type="submit" variant="primary">{isEditing ? 'Update Job' : 'Publish Job'}</Button>
              </div>
            </div>
            
          </form>
        </GlassCard>
      </Section>
    </PageContainer>
  );
};

export default JobPostForm;
