import React from 'react';
import { Link } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext';

const Footer = () => {
  const { theme } = useJobPortal();

  return (
    <footer className="bg-white border-top py-5 mt-auto">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-primary mb-3">
              <img src={theme === 'dark' ? "/branding/nexora-logo-dark.svg" : "/branding/nexora-logo.svg"} alt="Nexora Logo" height="32" className="me-2" />
            </h5>
            <p className="text-secondary pe-lg-4">
              Where Talent Meets Opportunity.
            </p>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Job Seekers</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/jobs" className="text-secondary text-decoration-none hover-primary">Search Jobs</Link></li>
              <li className="mb-2"><Link to="/companies" className="text-secondary text-decoration-none hover-primary">Browse Companies</Link></li>
              <li className="mb-2"><Link to="/salary" className="text-secondary text-decoration-none hover-primary">Salary Tools</Link></li>
              <li className="mb-2"><Link to="/career-advice" className="text-secondary text-decoration-none hover-primary">Career Advice</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Employers</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/post-job" className="text-secondary text-decoration-none hover-primary">Post a Job</Link></li>
              <li className="mb-2"><Link to="/search-resumes" className="text-secondary text-decoration-none hover-primary">Search Resumes</Link></li>
              <li className="mb-2"><Link to="/recruiting" className="text-secondary text-decoration-none hover-primary">Recruiting Solutions</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-label mb-3">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-primary">About Us</Link></li>
              <li className="mb-2"><Link to="/careers" className="text-secondary text-decoration-none hover-primary">Work with Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-primary">Contact</Link></li>
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
        <div className="border-top mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-meta mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} Nexora. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className="text-secondary text-decoration-none hover-primary" aria-label="LinkedIn">LN</a>
            <a href="#" className="text-secondary text-decoration-none hover-primary" aria-label="Twitter">TW</a>
            <a href="#" className="text-secondary text-decoration-none hover-primary" aria-label="Facebook">FB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
