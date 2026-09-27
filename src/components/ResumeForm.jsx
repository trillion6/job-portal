import React, { useState } from 'react';

const ResumeForm = ({ localResume, setLocalResume }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (section, field, value) => {
    if (section === 'personal') {
      setLocalResume(prev => ({
        ...prev,
        personal: { ...prev.personal, [field]: value }
      }));
    } else {
      setLocalResume(prev => ({ ...prev, [section]: value }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !localResume.skills.includes(trimmed)) {
      setLocalResume(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove) => {
    setLocalResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Helper for array fields (education, experience, etc.)
  const addArrayItem = (section, emptyItem) => {
    setLocalResume(prev => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now(), ...emptyItem }]
    }));
  };

  const updateArrayItem = (section, id, field, value) => {
    setLocalResume(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeArrayItem = (section, id) => {
    setLocalResume(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  return (
    <>
      {/* Personal Info Section */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePersonal">
            Personal Information
          </button>
        </h2>
        <div id="collapsePersonal" className="accordion-collapse collapse show" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label text-secondary small fw-medium">Full Name <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localResume.personal.fullName || ''}
                  onChange={(e) => handleChange('personal', 'fullName', e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-secondary small fw-medium">Professional Title <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localResume.personal.title || ''}
                  onChange={(e) => handleChange('personal', 'title', e.target.value)}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-secondary small fw-medium">Email <span className="text-danger">*</span></label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={localResume.personal.email || ''}
                  onChange={(e) => handleChange('personal', 'email', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-secondary small fw-medium">Phone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localResume.personal.phone || ''}
                  onChange={(e) => handleChange('personal', 'phone', e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-secondary small fw-medium">Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localResume.personal.location || ''}
                  onChange={(e) => handleChange('personal', 'location', e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-secondary small fw-medium">LinkedIn</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={localResume.personal.linkedin || ''}
                  onChange={(e) => handleChange('personal', 'linkedin', e.target.value)}
                  placeholder="URL"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-secondary small fw-medium">GitHub</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={localResume.personal.github || ''}
                  onChange={(e) => handleChange('personal', 'github', e.target.value)}
                  placeholder="URL"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-secondary small fw-medium">Portfolio</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={localResume.personal.portfolio || ''}
                  onChange={(e) => handleChange('personal', 'portfolio', e.target.value)}
                  placeholder="URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSummary">
            Professional Summary
          </button>
        </h2>
        <div id="collapseSummary" className="accordion-collapse collapse" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white">
            <textarea 
              className="form-control" 
              rows="4" 
              value={localResume.summary || ''}
              onChange={(e) => handleChange('summary', null, e.target.value)}
              placeholder="A brief summary of your professional background and goals..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSkills">
            Skills
          </button>
        </h2>
        <div id="collapseSkills" className="accordion-collapse collapse" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white">
            <form onSubmit={handleAddSkill} className="d-flex gap-2 mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Add a skill (e.g., Python, React)" 
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-primary">Add</button>
            </form>
            <div className="d-flex flex-wrap gap-2">
              {localResume.skills.map((skill, index) => (
                <div key={index} className="bg-light border px-3 py-1 rounded-pill d-flex align-items-center gap-2">
                  <span className="small fw-medium">{skill}</span>
                  <button 
                    type="button" 
                    className="btn-close" 
                    style={{ fontSize: '0.5rem' }} 
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                  ></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExperience">
            Experience
          </button>
        </h2>
        <div id="collapseExperience" className="accordion-collapse collapse" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white p-0">
            {localResume.experience.map((exp, index) => (
              <div key={exp.id} className="p-3 border-bottom bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="mb-0 fw-bold">Experience {index + 1}</h6>
                  <button className="btn btn-sm btn-outline-danger py-0" onClick={() => removeArrayItem('experience', exp.id)}>Remove</button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Job Title</label>
                    <input type="text" className="form-control form-control-sm" value={exp.title} onChange={e => updateArrayItem('experience', exp.id, 'title', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Company</label>
                    <input type="text" className="form-control form-control-sm" value={exp.company} onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Location</label>
                    <input type="text" className="form-control form-control-sm" value={exp.location} onChange={e => updateArrayItem('experience', exp.id, 'location', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Start Date</label>
                    <input type="text" className="form-control form-control-sm" placeholder="e.g., Jan 2020" value={exp.startDate} onChange={e => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">End Date</label>
                    <input type="text" className="form-control form-control-sm" placeholder="e.g., Present" value={exp.endDate} onChange={e => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Description</label>
                    <textarea className="form-control form-control-sm" rows="3" value={exp.description} onChange={e => updateArrayItem('experience', exp.id, 'description', e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-3">
              <button 
                className="btn btn-outline-primary btn-sm w-100 fw-medium"
                onClick={() => addArrayItem('experience', { title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}
              >
                + Add Experience
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEducation">
            Education
          </button>
        </h2>
        <div id="collapseEducation" className="accordion-collapse collapse" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white p-0">
            {localResume.education.map((edu, index) => (
              <div key={edu.id} className="p-3 border-bottom bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="mb-0 fw-bold">Education {index + 1}</h6>
                  <button className="btn btn-sm btn-outline-danger py-0" onClick={() => removeArrayItem('education', edu.id)}>Remove</button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Degree</label>
                    <input type="text" className="form-control form-control-sm" value={edu.degree} onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Institution</label>
                    <input type="text" className="form-control form-control-sm" value={edu.institution} onChange={e => updateArrayItem('education', edu.id, 'institution', e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Location</label>
                    <input type="text" className="form-control form-control-sm" value={edu.location} onChange={e => updateArrayItem('education', edu.id, 'location', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Start Year</label>
                    <input type="text" className="form-control form-control-sm" value={edu.startYear} onChange={e => updateArrayItem('education', edu.id, 'startYear', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">End Year</label>
                    <input type="text" className="form-control form-control-sm" value={edu.endYear} onChange={e => updateArrayItem('education', edu.id, 'endYear', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <div className="p-3">
              <button 
                className="btn btn-outline-primary btn-sm w-100 fw-medium"
                onClick={() => addArrayItem('education', { degree: '', institution: '', location: '', startYear: '', endYear: '' })}
              >
                + Add Education
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects */}
      <div className="accordion-item border-standard shadow-sm mb-3 rounded overflow-hidden">
        <h2 className="accordion-header">
          <button className="accordion-button fw-bold bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProjects">
            Projects
          </button>
        </h2>
        <div id="collapseProjects" className="accordion-collapse collapse" data-bs-parent="#resumeBuilderAccordion">
          <div className="accordion-body bg-white p-0">
            {localResume.projects.map((proj, index) => (
              <div key={proj.id} className="p-3 border-bottom bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="mb-0 fw-bold">Project {index + 1}</h6>
                  <button className="btn btn-sm btn-outline-danger py-0" onClick={() => removeArrayItem('projects', proj.id)}>Remove</button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Project Name</label>
                    <input type="text" className="form-control form-control-sm" value={proj.name} onChange={e => updateArrayItem('projects', proj.id, 'name', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Project URL</label>
                    <input type="url" className="form-control form-control-sm" value={proj.url} onChange={e => updateArrayItem('projects', proj.id, 'url', e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Technologies</label>
                    <input type="text" className="form-control form-control-sm" placeholder="e.g., React, Node.js" value={proj.technologies} onChange={e => updateArrayItem('projects', proj.id, 'technologies', e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Description</label>
                    <textarea className="form-control form-control-sm" rows="3" value={proj.description} onChange={e => updateArrayItem('projects', proj.id, 'description', e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-3">
              <button 
                className="btn btn-outline-primary btn-sm w-100 fw-medium"
                onClick={() => addArrayItem('projects', { name: '', url: '', technologies: '', description: '' })}
              >
                + Add Project
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ResumeForm;
