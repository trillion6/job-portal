import React, { createContext, useState, useContext, useEffect } from 'react';
import { jobsData } from '../data/jobs';

// Create the context
const JobPortalContext = createContext();

// Create a custom hook for easy access to the context
export const useJobPortal = () => {
  return useContext(JobPortalContext);
};

export const JobPortalProvider = ({ children }) => {
  // Theme State
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('jobPortalTheme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('jobPortalTheme', theme);
  }, [theme]);

  const setTheme = (newTheme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState(prev => prev === 'light' ? 'dark' : 'light');

  // Toast State for unified UI feedback
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      hideToast(id);
    }, 4000);
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 1. Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return { ...parsed, isLoggedIn: true, id: parsed._id || 1 };
      } catch(e) { }
    }
    return {
      id: 1,
      name: 'Anil Kumar',
      email: 'anil@example.com',
      isLoggedIn: false,
      role: 'jobseeker' // 'jobseeker' or 'recruiter'
    };
  });

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        const user = { ...data, isLoggedIn: true, id: data._id };
        setCurrentUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error', error);
      return { success: false, message: 'Server error. Please ensure backend is running.' };
    }
  };

  const registerUser = async (name, email, password, role) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (response.ok) {
        const user = { ...data, isLoggedIn: true, id: data._id };
        setCurrentUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Register error', error);
      return { success: false, message: 'Server error. Please ensure backend is running.' };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    setCurrentUser({
      id: 1,
      name: 'Guest User',
      email: '',
      isLoggedIn: false,
      role: 'jobseeker'
    });
    showToast('Logged out successfully', 'success');
  };

  const toggleRole = () => {
    setCurrentUser(prev => {
      let nextRole = 'jobseeker';
      if (prev.role === 'jobseeker') nextRole = 'recruiter';
      else if (prev.role === 'recruiter') nextRole = 'admin';
      
      return {
        ...prev,
        role: nextRole
      };
    });
  };

  // 2. Profile State
  const [profile, setProfile] = useState({
    name: 'Anil Kumar',
    email: 'anil@example.com',
    phone: '',
    location: 'Chandigarh',
    title: 'AI/ML Developer',
    experience: '2 Years',
    education: 'MCA',
    skills: ['Python', 'AI', 'ML', 'React'],
    bio: '',
    linkedin: '',
    portfolio: ''
  });

  // 3. Saved Jobs State
  const [savedJobs, setSavedJobs] = useState(new Set());

  // 4. Applications State
  const [applications, setApplications] = useState([]);

  // 5. Activity State
  const [activity, setActivity] = useState([]);

  // 6. Notifications State
  const [notifications, setNotifications] = useState([]);

  // 7. Resume State
  const [resume, setResume] = useState({
    personal: {},
    summary: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: []
  });

  // 8. Recruiter: Company State
  const [company, setCompany] = useState({
    id: 1,
    name: 'TechNova',
    logo: 'TN',
    industry: 'Software Development',
    size: '51-200',
    location: 'Chandigarh',
    website: 'https://technova.example.com',
    email: 'careers@technova.example',
    phone: '123-456-7890',
    description: 'Building intelligent software solutions for the future.',
    founded: '2018',
    linkedin: '',
    benefits: ['Health Insurance', 'Remote Work', 'Flexible Hours'],
    culture: 'We value innovation, transparency, and a strong work-life balance.'
  });

  // 9. Recruiter: Jobs State (Admin Moderation Added)
  const [jobs, setJobs] = useState(jobsData.map(job => ({...job, status: 'Active', moderationStatus: 'Approved'})));

  // 10. Admin: Platform State
  const [users, setUsers] = useState([
    { id: 1, name: 'Anil Kumar', email: 'anil@example.com', role: 'jobseeker', location: 'Chandigarh', status: 'Active', joinedDate: '2023-01-15' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@technova.example', role: 'recruiter', location: 'Delhi', status: 'Active', joinedDate: '2023-02-10' },
    { id: 3, name: 'Priya Singh', email: 'priya@example.com', role: 'jobseeker', location: 'Mumbai', status: 'Suspended', joinedDate: '2023-03-22' },
    { id: 999, name: 'Platform Admin', email: 'admin@jobportal.com', role: 'admin', location: 'System', status: 'Active', joinedDate: '2020-01-01' }
  ]);

  const [companies, setCompanies] = useState([
    { ...company, status: 'Approved' },
    {
      id: 2,
      name: 'Global Systems Inc.',
      logo: 'GS',
      industry: 'IT Consulting',
      size: '1000+',
      location: 'Bengaluru',
      website: 'https://globalsystems.example.com',
      email: 'hr@globalsystems.example',
      phone: '987-654-3210',
      description: 'Global IT consulting and solutions provider.',
      founded: '2005',
      linkedin: '',
      benefits: ['Global Travel', 'Health Insurance'],
      culture: 'Fast-paced, performance-driven.',
      status: 'Pending'
    }
  ]);

  const [adminActivity, setAdminActivity] = useState([
    { id: 1, description: 'Admin logged in', type: 'System', date: new Date().toLocaleString() }
  ]);

  const addAdminActivity = (description, type) => {
    setAdminActivity(prev => [{ id: Date.now(), description, type, date: new Date().toLocaleString() }, ...prev].slice(0, 20));
  };

  // 10. Recruiter: Activity State
  const [recruiterActivity, setRecruiterActivity] = useState([]);

  const addRecruiterActivity = (description, type) => {
    const newActivity = {
      id: Date.now(),
      description,
      type,
      date: new Date().toLocaleString()
    };
    setRecruiterActivity(prev => [newActivity, ...prev].slice(0, 20));
  };

  // Recruiter Functions
  const updateCompany = (newCompanyData) => {
    setCompany(prev => ({ ...prev, ...newCompanyData }));
    setCompanies(prev => prev.map(c => c.id === company.id ? { ...c, ...newCompanyData } : c));
    addRecruiterActivity('Updated company profile', 'Company');
  };

  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      company: company.name,
      companyLogo: company.logo,
      moderationStatus: 'Pending Review',
      ...jobData
    };
    setJobs(prev => [newJob, ...prev]);
    addRecruiterActivity(`Posted new job: ${jobData.title}`, 'Job');
    addNotification('Job Pending Review', `Your job ${jobData.title} is pending admin review.`, 'system');
  };

  const updateJob = (jobId, jobData) => {
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, ...jobData } : job));
    addRecruiterActivity(`Updated job: ${jobData.title || 'Job'}`, 'Job');
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    addRecruiterActivity(`Deleted a job posting`, 'Job');
  };

  // Admin Functions
  const updateUserStatus = (userId, newStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    addAdminActivity(`Updated user status to ${newStatus}`, 'User');
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    addAdminActivity(`Deleted user ID: ${userId}`, 'User');
  };

  const updateCompanyStatus = (companyId, newStatus) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, status: newStatus } : c));
    addAdminActivity(`Updated company status to ${newStatus}`, 'Company');
  };

  const deleteCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    addAdminActivity(`Deleted company ID: ${companyId}`, 'Company');
  };

  const updateJobModerationStatus = (jobId, newStatus) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, moderationStatus: newStatus } : j));
    addAdminActivity(`Updated job moderation to ${newStatus}`, 'Job');
  };

  // Functions for Notifications
  const addNotification = (title, message, type) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type, // 'application', 'saved', 'profile', 'system'
      date: 'Just now', // Simplified for demo
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Functions for Resume
  const saveResume = (resumeData) => {
    setResume(resumeData);
    addNotification('Resume Saved', 'Your resume has been saved successfully.', 'profile');
  };

  const addActivity = (description, type) => {
    const newActivity = {
      id: Date.now(),
      description,
      type, // 'Applied', 'Saved', 'Profile'
      date: new Date().toLocaleString()
    };
    setActivity(prev => [newActivity, ...prev].slice(0, 20)); // Keep last 20
  };

  // Profile Functions
  const updateProfile = (newProfileData) => {
    setProfile(prev => ({ ...prev, ...newProfileData }));
    addActivity('Updated profile', 'Profile');
    addNotification('Profile Updated', 'Your profile information was updated successfully.', 'profile');
  };

  // Functions for Saved Jobs
  const toggleSaveJob = (jobId, jobTitle) => {
    setSavedJobs((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
        addActivity(`Removed ${jobTitle || 'Job'} from saved jobs`, 'Unsaved');
      } else {
        newSaved.add(jobId);
        addActivity(`Saved ${jobTitle || 'Job'}`, 'Saved');
        addNotification('Job Saved', `${jobTitle || 'Job'} was added to your Saved Jobs.`, 'saved');
      }
      return newSaved;
    });
  };

  const isJobSaved = (jobId) => {
    return savedJobs.has(jobId);
  };

  // Functions for Applications
  const applyForJob = (applicationData) => {
    const newApplication = {
      id: Date.now(),
      appliedDate: new Date().toLocaleDateString(),
      status: 'Applied',
      ...applicationData
    };
    setApplications(prev => [newApplication, ...prev]);
    addActivity(`Applied for ${applicationData.jobTitle} at ${applicationData.company}`, 'Applied');
    addNotification('Application Submitted', `Your application for ${applicationData.jobTitle} was submitted successfully.`, 'application');
  };

  const hasAppliedForJob = (jobId) => {
    return applications.some(app => app.jobId === jobId);
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        // Find the job title for the notification
        const jobTitle = app.jobTitle || 'a job';
        
        // Add a notification for the job seeker
        let notifMessage = `Your application status for ${jobTitle} has been updated to ${newStatus}.`;
        if (newStatus === 'Shortlisted') notifMessage = `Congratulations! Your application for ${jobTitle} has been shortlisted.`;
        if (newStatus === 'Interview') notifMessage = `Great news! Your application for ${jobTitle} has moved to the Interview stage.`;
        if (newStatus === 'Selected') notifMessage = `Congratulations! You have been selected for ${jobTitle}.`;
        
        addNotification(`Application: ${newStatus}`, notifMessage, 'application');
        addRecruiterActivity(`Updated application status to ${newStatus}`, 'Application');

        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    toasts,
    showToast,
    hideToast,
    currentUser,
    setCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
    profile,
    updateProfile,
    savedJobs,
    toggleSaveJob,
    isJobSaved,
    applications,
    applyForJob,
    hasAppliedForJob,
    updateApplicationStatus,
    activity,
    notifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    removeNotification,
    resume,
    saveResume,
    toggleRole,
    company,
    updateCompany,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    recruiterActivity,
    users,
    companies,
    adminActivity,
    updateUserStatus,
    deleteUser,
    updateCompanyStatus,
    deleteCompany,
    updateJobModerationStatus
  };

  return (
    <JobPortalContext.Provider value={value}>
      {children}
    </JobPortalContext.Provider>
  );
};
