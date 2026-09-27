import React, { useState, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { useJobPortal } from '../context/JobPortalContext';
import { useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
  const { profile, resume, saveResume } = useJobPortal();
  const navigate = useNavigate();

  // Local state for live preview
  const [localResume, setLocalResume] = useState(() => {
    if (Object.keys(resume.personal).length === 0) {
      // Pre-fill from profile if resume is empty
      return {
        ...resume,
        personal: {
          fullName: profile.name || '',
          title: profile.title || '',
          email: profile.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          linkedin: profile.linkedin || '',
          portfolio: profile.portfolio || '',
          github: ''
        },
        skills: profile.skills || [],
        summary: profile.bio || ''
      };
    }
    return resume;
  });

  const handleSave = () => {
    saveResume(localResume);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your entire resume? This cannot be undone.")) {
      setLocalResume({
        personal: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', github: '' },
        summary: '',
        skills: [],
        education: [],
        experience: [],
        projects: [],
        certifications: [],
        achievements: []
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    let score = 0;
    const { personal, summary, skills, education, experience } = localResume;
    if (personal.fullName) score += 10;
    if (personal.title) score += 10;
    if (personal.email) score += 10;
    if (personal.phone) score += 10;
    if (summary) score += 20;
    if (skills.length > 0) score += 10;
    if (education.length > 0) score += 15;
    if (experience.length > 0) score += 15;
    return score;
  };

  const completion = calculateCompletion();

  return (
    <PageContainer>
      <div className="d-print-none mb-4">
        <h2 className="fw-bold mb-1">Resume Builder</h2>
        <p className="text-secondary mb-0">Create a professional resume tailored for your job search.</p>
      </div>

      <div className="row g-4 d-print-block">
        {/* Form Column - Hidden when printing */}
        <div className="col-12 col-xl-5 d-print-none">
          <div className="card border-standard shadow-sm glassmorphism mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-bold">Resume Completion</h6>
                <span className="text-primary fw-bold">{completion}%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: `${completion}%` }} 
                  aria-valuenow={completion} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button className="btn btn-primary btn-material flex-grow-1" onClick={handleSave}>
              Save Resume
            </button>
            <button className="btn btn-outline-primary" onClick={handlePrint}>
              Print / PDF
            </button>
            <button className="btn btn-outline-danger" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="accordion" id="resumeBuilderAccordion">
            <ResumeForm localResume={localResume} setLocalResume={setLocalResume} />
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="col-12 col-xl-7 print-full-width">
          <div className="sticky-xl-top" style={{ top: '100px', zIndex: 1 }}>
            <div className="d-flex justify-content-between align-items-center mb-3 d-xl-none d-print-none">
              <h5 className="fw-bold mb-0">Live Preview</h5>
            </div>
            
            {/* The Resume Document itself */}
            <div className="card border-standard shadow-sm overflow-hidden resume-preview-container">
              <div className="card-body p-0">
                 <ResumePreview data={localResume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResumeBuilder;
