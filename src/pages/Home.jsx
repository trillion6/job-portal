import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import JobCard from '../components/JobCard';
import CompanyCard from '../components/CompanyCard';
import { categories, featuredCompanies } from '../data/mockData';
import { useJobPortal } from '../context/JobPortalContext';
import { getRecommendedJobs } from '../utils/jobSearch';

const Home = () => {
  const navigate = useNavigate();
  const { jobs, profile, currentUser, savedJobs, toggleSaveJob, applications } = useJobPortal();
  
  const recommendedJobs = getRecommendedJobs(jobs, profile);

  const handleHeroSearch = ({ keyword, location }) => {
    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (location) params.append('loc', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <PageContainer as="div" className="p-0">
      {/* Hero Section */}
      <Section className="position-relative d-flex align-items-center pt-5 pb-5" style={{ minHeight: '80vh' }} bg="transparent">
        {/* Background Decorative Warm Sage & Amber Ambient Glow */}
        <div 
          className="position-absolute top-50 start-50 translate-middle w-100 h-100 pointer-events-none" 
          style={{ 
            background: 'radial-gradient(circle at 50% 40%, rgba(135, 169, 107, 0.16) 0%, rgba(213, 133, 31, 0.1) 35%, transparent 70%)',
            filter: 'blur(80px)', 
            zIndex: -1, 
            maxWidth: '1100px', 
            maxHeight: '1000px', 
            borderRadius: '50%' 
          }}
        ></div>
        
        <div className="row justify-content-center w-100 text-center m-0 pt-lg-5">
          <div className="col-xl-9 col-lg-10">
            <span className="status-badge badge-sage px-3 py-1 mb-3 shadow-sm">
              <i className="bi bi-stars me-1 text-amber"></i> Where Talent Meets Opportunity
            </span>
            <h1 className="hero-heading mb-3" style={{ letterSpacing: '-0.02em' }}>
              Find Your Next Career Move
            </h1>
            <p className="lead text-secondary mb-5 px-md-5 mx-md-5">
              Nexora connects ambitious professionals with verified, high-growth employers. Discover curated roles matching your craft.
            </p>
            
            <GlassCard variant="featured" className="p-2 p-md-3 shadow-lg mx-auto" style={{ maxWidth: '880px' }}>
              <SearchBar onSearch={handleHeroSearch} />
            </GlassCard>
            
            <div className="mt-4 text-meta d-flex flex-wrap justify-content-center align-items-center gap-2">
              <span className="text-secondary fw-medium">Trending keywords:</span>
              <Link to="/jobs?q=Python" className="status-badge badge-sage text-decoration-none py-1 px-3">Python</Link>
              <Link to="/jobs?q=React" className="status-badge badge-sage text-decoration-none py-1 px-3">React</Link>
              <Link to="/jobs?q=AI/ML" className="status-badge badge-sage text-decoration-none py-1 px-3">AI / ML</Link>
              <Link to="/jobs?q=Remote" className="status-badge badge-amber text-decoration-none py-1 px-3">Remote</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Recommended Jobs Section (For logged in users) */}
      {currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' && (
        <Section className="bg-light">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="status-badge badge-sage mb-2">Personalized Match</span>
              <h2 className="section-heading mb-1">Recommended for You</h2>
              <p className="text-secondary mb-0">Based on your skills: {profile.skills?.join(', ') || 'Software Development'}</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline-primary" className="d-none d-md-block">Explore All Jobs</Button>
            </Link>
          </div>
          
          <div className="row g-4">
            {recommendedJobs.map(job => (
              <div className="col-md-6 col-xl-6" key={job.id || job._id}>
                <JobCard 
                  job={job} 
                  isSaved={savedJobs.has(String(job.id || job._id))}
                  onToggleSave={toggleSaveJob}
                  hasApplied={applications.some(app => String(app.jobId) === String(job.id || job._id))}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Popular Categories Section */}
      <Section className={currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' ? '' : 'bg-light'}>
        <div className="text-center mb-5">
          <span className="status-badge badge-sage mb-2">Explore By Domain</span>
          <h2 className="section-heading mb-2">Popular Career Tracks</h2>
          <p className="text-secondary">Explore open roles curated across cutting-edge technology domains</p>
        </div>
        <div className="row g-4">
          {categories.map(category => (
            <div className="col-6 col-md-4 col-lg-3" key={category.id}>
              <Link to={`/jobs?category=${encodeURIComponent(category.name)}`} className="text-decoration-none">
                <CategoryCard category={category} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Top Hiring Companies Section */}
      <Section className={currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' ? 'bg-light' : ''}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
          <div>
            <span className="status-badge badge-sage mb-2">Verified Ecosystem</span>
            <h2 className="section-heading mb-2">Top Hiring Organizations</h2>
            <p className="text-secondary mb-0">Collaborate with world-class engineering and product teams</p>
          </div>
        </div>
        <div className="row g-4">
          {featuredCompanies.map(company => (
            <div className="col-6 col-lg-3" key={company.id}>
              <Link to={`/jobs?q=${encodeURIComponent(company.name)}`} className="text-decoration-none text-body d-block h-100">
                <CompanyCard company={company} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section>
        <div className="row align-items-center g-5 py-lg-4">
          <div className="col-lg-6">
            <span className="status-badge badge-amber mb-3">The Nexora Standard</span>
            <h2 className="section-heading mb-4">Why choose our career platform?</h2>
            <p className="text-secondary mb-5">
              We design tools that empower transparent recruitment. Job seekers enjoy verified employer insights and effortless applications, while recruiters leverage automated candidate tracking.
            </p>
            <ul className="list-unstyled mb-0">
              {[
                { icon: 'bi-briefcase', title: 'Verified opportunities', desc: 'Direct access to vetted enterprise & startup postings with zero spam.' },
                { icon: 'bi-lightning-charge', title: 'Streamlined applications', desc: 'One-click application workflows with custom cover notes and resume attachments.' },
                { icon: 'bi-file-earmark-person', title: 'Live Resume Builder', desc: 'Build an industry-standard ATS resume and export directly to PDF.' },
                { icon: 'bi-graph-up-arrow', title: 'Candidate transparency', desc: 'Real-time application tracking from review to interview stages.' }
              ].map((feature, i) => (
                <li className="d-flex mb-4" key={i}>
                  <div 
                    className="rounded p-2 me-3 fs-5 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" 
                    style={{ 
                      width: '52px', 
                      height: '52px',
                      backgroundColor: 'var(--btn-secondary-bg)',
                      color: 'var(--brand-walnut)'
                    }}
                  >
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-dark fw-bold fs-5">{feature.title}</h6>
                    <span className="text-secondary">{feature.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-6">
            <GlassCard variant="standard" className="p-0 overflow-hidden border-standard shadow-lg">
              <div 
                className="p-5 text-center d-flex flex-column justify-content-center h-100" 
                style={{ 
                  minHeight: '450px',
                  backgroundColor: 'var(--surface-subtle)'
                }}
              >
                 <div className="fs-1 mb-4 text-amber">
                   <i className="bi bi-people-fill"></i>
                 </div>
                 <h3 className="text-dark fw-bold mb-3">Join 2M+ Professionals</h3>
                 <p className="text-secondary mb-4 px-lg-4">
                   Discover opportunities matching your craft and accelerate your career trajectory.
                 </p>
                 <div>
                   <Link to="/register">
                     <Button variant="primary" size="lg" className="px-5 shadow-sm">
                       Get Started Now
                     </Button>
                   </Link>
                 </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="bg-walnut text-white text-center py-5">
        <div className="py-5">
          <span className="status-badge badge-sage mb-3">Get Started Today</span>
          <h2 className="page-heading mb-3" style={{ color: '#FAF8F4' }}>Ready to find your next opportunity?</h2>
          <p className="lead mb-5 px-3" style={{ color: 'rgba(250, 248, 244, 0.85)' }}>
            Create an account today and connect with leading employers.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/register">
              <Button variant="primary" size="lg" className="px-5 fw-bold shadow">
                Create Free Profile
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline-sage" size="lg" className="px-5 fw-bold" style={{ borderColor: 'var(--brand-sage)', color: 'var(--brand-sage)' }}>
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default Home;
