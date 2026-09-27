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
        {/* Background Decorative Blur */}
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-primary opacity-10" style={{ filter: 'blur(120px)', zIndex: -1, maxWidth: '1000px', maxHeight: '1000px', borderRadius: '50%' }}></div>
        
        <div className="row justify-content-center w-100 text-center m-0 pt-lg-5">
          <div className="col-xl-9 col-lg-10">
            <h1 className="hero-heading mb-4 text-primary" style={{ letterSpacing: '0.05em' }}>
              NEXORA
            </h1>
            <p className="lead text-secondary mb-5 px-md-5 mx-md-5">
              Where Talent Meets Opportunity. Discover thousands of opportunities and take the next step in your career.
            </p>
            
            <GlassCard variant="featured" className="p-2 p-md-3 shadow-lg mx-auto" style={{ maxWidth: '850px' }}>
              <SearchBar onSearch={handleHeroSearch} />
            </GlassCard>
            
            <div className="mt-4 text-meta">
              Popular searches: 
              <Link to="/jobs?q=Remote" className="text-decoration-none ms-1">Remote</Link>, 
              <Link to="/jobs?q=Software Engineer" className="text-decoration-none ms-1">Software Engineer</Link>, 
              <Link to="/jobs?q=AI" className="text-decoration-none ms-1">AI</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Recommended Jobs Section (For logged in users) */}
      {currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' && (
        <Section className="bg-light">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <h2 className="section-heading mb-2">Recommended for You</h2>
              <p className="text-secondary mb-0">Based on your skills and profile</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline-primary" className="d-none d-md-block">Explore More</Button>
            </Link>
          </div>
          
          <div className="row g-4">
            {recommendedJobs.map(job => (
              <div className="col-md-6 col-xl-6" key={job.id}>
                <JobCard 
                  job={job} 
                  isSaved={savedJobs.has(job.id)}
                  onToggleSave={toggleSaveJob}
                  hasApplied={applications.some(app => app.jobId === job.id)}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Popular Categories Section */}
      <Section className={currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' ? '' : 'bg-light'}>
        <div className="text-center mb-5">
          <h2 className="section-heading">Popular Categories</h2>
          <p className="text-secondary">Explore roles across top industries</p>
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

      {/* Featured Companies Section */}
      <Section className={currentUser?.isLoggedIn && currentUser?.role === 'jobseeker' ? 'bg-light' : ''}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
          <div>
            <h2 className="section-heading mb-2">Top Hiring Companies</h2>
            <p className="text-secondary mb-0">Work with the best organizations in the world</p>
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
            <h2 className="section-heading mb-4">Why choose our platform?</h2>
            <p className="text-secondary mb-5">
              We provide the tools and connections you need to build a successful career. Our platform is designed with both job seekers and employers in mind.
            </p>
            <ul className="list-unstyled mb-0">
              {[
                { icon: '🌟', title: 'Thousands of jobs', desc: 'New opportunities posted daily across all industries.' },
                { icon: '🏢', title: 'Trusted companies', desc: 'Direct access to verified and top-tier employers.' },
                { icon: '⚡', title: 'Easy applications', desc: 'Apply to jobs with a single click using your profile.' },
                { icon: '📈', title: 'Personalized opportunities', desc: 'Get smart recommendations based on your unique skills.' }
              ].map((feature, i) => (
                <li className="d-flex mb-4" key={i}>
                  <div className="bg-primary bg-opacity-10 rounded text-primary p-2 me-3 fs-5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                    {feature.icon}
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
            <GlassCard variant="standard" className="p-0 overflow-hidden border-0 shadow-lg">
              <div className="bg-primary bg-opacity-10 p-5 text-center d-flex flex-column justify-content-center h-100" style={{ minHeight: '450px' }}>
                 <div className="fs-1 mb-4">🤝</div>
                 <h3 className="text-primary fw-bold mb-3">Join 2M+ Professionals</h3>
                 <p className="text-secondary mb-4 px-lg-4">Who have already found their dream jobs and accelerated their career growth through our platform.</p>
                 <div>
                   <Link to="/register">
                     <Button variant="primary" className="px-4">Get Started</Button>
                   </Link>
                 </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="bg-primary text-white text-center py-5">
        <div className="py-5">
          <h2 className="page-heading text-white mb-3">Ready to find your next opportunity?</h2>
          <p className="lead text-white text-opacity-75 mb-5 px-3">
            Create an account today and let top companies come to you.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/register">
              <Button variant="light" size="lg" className="px-5 fw-bold text-primary">
                Create Profile
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline-light" size="lg" className="px-5 fw-bold border-light text-white hover-white">
                Find Jobs
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default Home;
