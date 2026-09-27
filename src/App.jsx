import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageContainer from './components/PageContainer';
import Section from './components/Section';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/ToastContainer';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import SavedJobs from './pages/SavedJobs';
import MyApplications from './pages/MyApplications';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import ResumeBuilder from './pages/ResumeBuilder';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CompanyProfile from './pages/CompanyProfile';
import PublicCompanyPage from './pages/PublicCompanyPage';
import JobPostForm from './pages/JobPostForm';
import RecruiterJobs from './pages/RecruiterJobs';
import RecruiterApplicants from './pages/RecruiterApplicants';
import ApplicantDetails from './pages/ApplicantDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCompanies from './pages/AdminCompanies';
import AdminJobs from './pages/AdminJobs';
import AdminApplications from './pages/AdminApplications';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import { JobPortalProvider } from './context/JobPortalContext';
import './App.css';

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <PageContainer>
    <Section className="py-5 text-center min-vh-50">
      <h2 className="page-heading">{title}</h2>
      <p className="text-body mt-3">This page will be implemented in a later phase. The responsive application shell and design system are active here.</p>
    </Section>
  </PageContainer>
);

const TitleUpdater = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    const path = location.pathname;
    let title = "Nexora — Where Talent Meets Opportunity";
    
    if (path.startsWith('/jobs')) title = "Jobs | Nexora";
    if (path.startsWith('/login')) title = "Login | Nexora";
    if (path.startsWith('/register')) title = "Create Account | Nexora";
    if (path.startsWith('/dashboard')) title = "Dashboard | Nexora";
    if (path.startsWith('/profile')) title = "Profile | Nexora";
    if (path.startsWith('/resume-builder')) title = "Resume Builder | Nexora";
    if (path.startsWith('/recruiter/dashboard')) title = "Recruiter Dashboard | Nexora";
    if (path.startsWith('/admin/dashboard')) title = "Admin Dashboard | Nexora";
    
    document.title = title;
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <JobPortalProvider>
        <Router>
          <TitleUpdater />
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <ToastContainer />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/applications" element={<MyApplications />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/companies" element={<PlaceholderPage title="Companies" />} />
              <Route path="/company/:id" element={<PublicCompanyPage />} />
              
              {/* Recruiter Routes */}
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/company" element={<CompanyProfile />} />
              <Route path="/recruiter/post-job" element={<JobPostForm />} />
              <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
              <Route path="/recruiter/jobs/:id/edit" element={<JobPostForm />} />
              <Route path="/recruiter/applicants" element={<RecruiterApplicants />} />
              <Route path="/recruiter/applicants/:id" element={<ApplicantDetails />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/companies" element={<AdminCompanies />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/applications" element={<AdminApplications />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              <Route path="/about" element={<PlaceholderPage title="About Us" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Footer dummy links coverage */}
              <Route path="/salary" element={<PlaceholderPage title="Salary Tools" />} />
              <Route path="/career-advice" element={<PlaceholderPage title="Career Advice" />} />
              <Route path="/post-job" element={<PlaceholderPage title="Post a Job" />} />
              <Route path="/search-resumes" element={<PlaceholderPage title="Search Resumes" />} />
              <Route path="/recruiting" element={<PlaceholderPage title="Recruiting Solutions" />} />
              <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
              <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
              <Route path="/help" element={<PlaceholderPage title="Help Center" />} />
              <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
              <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
              
              {/* Fallback Routes */}
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </JobPortalProvider>
    </ErrorBoundary>
  );
}

export default App;
