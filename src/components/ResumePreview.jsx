import React from 'react';

const ResumePreview = ({ data }) => {
  const { personal, summary, skills, education, experience, projects } = data;

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white text-dark w-100 h-100" style={{ minHeight: '842px', fontFamily: '"Inter", sans-serif' }}>
      {/* Header */}
      <div className="p-4 p-md-5 border-bottom border-2 border-dark text-center">
        <h1 className="fw-bold mb-1 text-uppercase" style={{ letterSpacing: '2px' }}>{personal.fullName || 'Your Name'}</h1>
        <h5 className="text-secondary mb-3 fw-normal" style={{ letterSpacing: '1px' }}>{personal.title || 'Professional Title'}</h5>
        <div className="d-flex flex-wrap justify-content-center gap-3 small">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && (
            <>
              <span className="text-muted">•</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.location && (
            <>
              <span className="text-muted">•</span>
              <span>{personal.location}</span>
            </>
          )}
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-2 small">
          {personal.linkedin && <span><a href={personal.linkedin} className="text-dark text-decoration-none">LinkedIn</a></span>}
          {personal.github && (
            <>
              <span className="text-muted">•</span>
              <span><a href={personal.github} className="text-dark text-decoration-none">GitHub</a></span>
            </>
          )}
          {personal.portfolio && (
            <>
              <span className="text-muted">•</span>
              <span><a href={personal.portfolio} className="text-dark text-decoration-none">Portfolio</a></span>
            </>
          )}
        </div>
      </div>

      <div className="p-4 p-md-5 pt-4">
        {/* Professional Summary */}
        {summary && (
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px' }}>Professional Summary</h6>
            <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px' }}>Skills</h6>
            <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              {skills.join(' • ')}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px' }}>Experience</h6>
            <div className="d-flex flex-column gap-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="fw-bold mb-1">{exp.title}</h6>
                    <span className="small fw-bold text-muted">{exp.startDate} {exp.endDate && `- ${exp.endDate}`}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline mb-2">
                    <span className="small fw-medium">{exp.company}</span>
                    <span className="small text-muted">{exp.location}</span>
                  </div>
                  <p className="mb-0 text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px' }}>Education</h6>
            <div className="d-flex flex-column gap-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="fw-bold mb-1">{edu.degree}</h6>
                    <span className="small fw-bold text-muted">{edu.startYear} {edu.endYear && `- ${edu.endYear}`}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <span className="small fw-medium">{edu.institution}</span>
                    <span className="small text-muted">{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px' }}>Projects</h6>
            <div className="d-flex flex-column gap-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <h6 className="fw-bold mb-0">
                      {proj.name}
                      {proj.url && <a href={proj.url} className="ms-2 small text-decoration-none" target="_blank" rel="noopener noreferrer">🔗</a>}
                    </h6>
                  </div>
                  {proj.technologies && (
                    <div className="mb-2 small fw-medium text-secondary">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  <p className="mb-0 text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
