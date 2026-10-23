import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import GlassCard from './GlassCard';
import Badge from './Badge';
import Button from './Button';

const JobCard = ({ job, isSaved, onToggleSave, hasApplied = false }) => {
  const CardWrapper = job.featured ? GlassCard : Card;
  const wrapperProps = job.featured ? { variant: 'featured', className: 'border-amber shadow-sm' } : {};
  const jobId = job.id || job._id;

  return (
    <CardWrapper className="h-100 d-flex flex-column minimal-card" {...wrapperProps}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="card-title mb-0 fw-bold">{job.title}</h5>
        {job.featured && <Badge variant="amber" className="shadow-sm">Featured</Badge>}
      </div>
      
      <div className="d-flex align-items-center gap-2 mb-2">
        <span className="text-walnut fw-semibold">{job.company}</span>
        {/* Verified company badge in signature Sage */}
        {(job.company === 'TechNova' || job.company === 'Global Systems Inc.' || job.rating > 4.5) && (
          <span className="status-badge badge-sage py-0 px-2" style={{ fontSize: '0.7rem' }}>
            <i className="bi bi-patch-check-fill me-1"></i> Verified
          </span>
        )}
      </div>
      
      <div className="d-flex align-items-center text-meta mb-3 gap-3 flex-wrap">
        <span><i className="bi bi-geo-alt me-1 text-muted"></i>{job.location}</span>
        <span><i className="bi bi-briefcase me-1 text-muted"></i>{job.jobType || job.type}</span>
        <span><i className="bi bi-currency-rupee me-1 text-muted"></i>{job.salary}</span>
        {job.experience && <span><i className="bi bi-clock me-1 text-muted"></i>{job.experience}</span>}
      </div>
      
      <div className="d-flex flex-wrap gap-1 mb-4">
        {job.skills && job.skills.map(skill => (
          <Badge key={skill} variant="sage" className="py-1 px-2" style={{ fontSize: '0.75rem' }}>
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="mt-auto pt-3 border-top border-standard d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span className="text-meta">{job.postedDate || 'Posted recently'}</span>
        
        <div className="d-flex gap-2">
          {onToggleSave && (
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className={`px-2 ${isSaved ? 'text-amber border-amber' : 'text-secondary'}`}
              onClick={(e) => {
                e.preventDefault();
                onToggleSave(jobId, job.title);
              }}
              aria-label={isSaved ? "Unsave Job" : "Save Job"}
              title={isSaved ? "Saved" : "Save Job"}
            >
              <i className={`bi bi-bookmark${isSaved ? '-fill' : ''}`}></i>
            </Button>
          )}
          <Link to={`/jobs/${jobId}`} className="text-decoration-none">
            <Button variant={job.featured ? "primary" : "outline-primary"} size="sm" className="px-3">
              View Details
            </Button>
          </Link>
          
          {hasApplied ? (
            <Button variant="secondary" size="sm" className="px-3" disabled>
              <i className="bi bi-check2 me-1"></i> Applied
            </Button>
          ) : (
            <Link to={`/jobs/${jobId}?apply=true`} className="text-decoration-none">
              <Button variant="primary" size="sm" className="px-3">
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
