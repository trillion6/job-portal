import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import GlassCard from './GlassCard';
import Badge from './Badge';
import Button from './Button';

const JobCard = ({ job, isSaved, onToggleSave, hasApplied = false }) => {
  const CardWrapper = job.featured ? GlassCard : Card;
  const wrapperProps = job.featured ? { variant: 'featured' } : {};

  return (
    <CardWrapper className="h-100 d-flex flex-column" {...wrapperProps}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="card-title mb-0 fw-bold">{job.title}</h5>
        {job.featured && <Badge variant="warning" className="shadow-sm">Featured</Badge>}
      </div>
      
      <div className="d-flex align-items-center gap-2 mb-2">
        <p className="text-primary fw-medium mb-0">{job.company}</p>
        {/* Mock verified companies for UI demonstration */}
        {(job.company === 'TechNova' || job.company === 'DataWiz' || job.rating > 4.5) && (
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill d-flex align-items-center py-1 px-2" style={{ fontSize: '0.65rem' }}>
            <span className="me-1">✓</span> Verified
          </span>
        )}
      </div>
      
      <div className="d-flex align-items-center text-meta mb-3 gap-3 flex-wrap">
        <span>📍 {job.location}</span>
        <span>💼 {job.jobType || job.type}</span>
        <span>💵 {job.salary}</span>
        {job.experience && <span>⏳ {job.experience}</span>}
      </div>
      
      <div className="d-flex flex-wrap gap-2 mb-4">
        {job.skills && job.skills.map(skill => (
          <Badge key={skill} variant="secondary" className="bg-opacity-10 text-body">
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span className="text-meta">{job.postedDate || 'Posted recently'}</span>
        
        <div className="d-flex gap-2">
          {onToggleSave && (
            <Button 
              variant="light" 
              size="sm" 
              className={`border-standard ${isSaved ? 'text-danger' : 'text-secondary'}`}
              onClick={(e) => {
                e.preventDefault();
                onToggleSave(job.id, job.title);
              }}
              aria-label={isSaved ? "Unsave Job" : "Save Job"}
            >
              {isSaved ? '♥ Saved' : '♡ Save'}
            </Button>
          )}
          <Link to={`/jobs/${job.id}`} className="text-decoration-none">
            <Button variant={job.featured ? "primary" : "outline-primary"} size="sm" className="px-3 w-100">
              View Details
            </Button>
          </Link>
          
          {hasApplied ? (
            <Button variant="success" size="sm" className="px-3 w-100" disabled>
              ✓ Applied
            </Button>
          ) : (
            <Link to={`/jobs/${job.id}?apply=true`} className="text-decoration-none">
              <Button variant="primary" size="sm" className="px-3 w-100">
                Apply
              </Button>
            </Link>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default JobCard;
