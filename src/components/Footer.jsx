import React from 'react';
import { Link } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext';

const Footer = () => {
  const { theme } = useJobPortal();

  return (
    <footer className="border-top border-standard py-5 mt-auto" style={{ backgroundColor: 'var(--surface-color)' }}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <img src={theme === 'dark' ? "/branding/nexora-logo-dark.svg" : "/branding/nexora-logo.svg"} alt="Nexora Logo" height="32" className="me-2" />
            </div>
            <p className="text-secondary pe-lg-4 mb-3">
              Where Talent Meets Opportunity. A modern professional career marketplace connecting Job Seekers, Recruiters, and Verified Companies.
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="status-badge badge-sage">
                <i className="bi bi-shield-check me-1"></i> Verified Employers
              </span>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Job Seekers</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/jobs" className="text-secondary text-decoration-none hover-primary">Search Jobs</Link></li>
              <li className="mb-2"><Link to="/companies" className="text-secondary text-decoration-none hover-primary">Browse Companies</Link></li>
              <li className="mb-2"><Link to="/resume-builder" className="text-secondary text-decoration-none hover-primary">Resume Builder</Link></li>
              <li className="mb-2"><Link to="/saved-jobs" className="text-secondary text-decoration-none hover-primary">Saved Jobs</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Employers</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/recruiter/post-job" className="text-secondary text-decoration-none hover-primary">Post a Job</Link></li>
              <li className="mb-2"><Link to="/recruiter/dashboard" className="text-secondary text-decoration-none hover-primary">Recruiter ATS</Link></li>
              <li className="mb-2"><Link to="/recruiter/company" className="text-secondary text-decoration-none hover-primary">Company Profile</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-primary">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-primary">Contact</Link></li>
              <li className="mb-2"><Link to="/careers" className="text-secondary text-decoration-none hover-primary">Work with Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/help" className="text-secondary text-decoration-none hover-primary">Help Center</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-secondary text-decoration-none hover-primary">Terms of Service</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-secondary text-decoration-none hover-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-top border-standard mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-meta mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} Nexora. All rights reserved.
          </p>
          <div className="d-flex gap-3 fs-5">
            <a href="#" className="text-secondary hover-primary" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
            <a href="#" className="text-secondary hover-primary" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-secondary hover-primary" aria-label="GitHub"><i className="bi bi-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
