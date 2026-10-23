import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jobsData as fallbackJobs } from '../data/jobs';

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
  
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      hideToast(id);
    }, 4000);
  }, []);

  const hideToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 1. Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return { ...parsed, isLoggedIn: true, id: parsed._id || parsed.id || 1 };
      } catch (e) {
        console.error('Failed to parse cached user info', e);
      }
    }
    return {
      id: 1,
      name: 'Anil Kumar',
      email: 'anil@example.com',
      isLoggedIn: false,
      role: 'jobseeker',
    };
  });

  // Helper for authenticated API calls
  const getAuthHeaders = useCallback(() => {
    const headers = { 'Content-Type': 'application/json' };
    if (currentUser?.token) {
      headers['Authorization'] = `Bearer ${currentUser.token}`;
    }
    return headers;
  }, [currentUser?.token]);

  // 2. Profile State
  const [profile, setProfile] = useState(() => ({
    name: currentUser?.name || 'Anil Kumar',
    email: currentUser?.email || 'anil@example.com',
    phone: currentUser?.phone || '+91 98765 43210',
    location: currentUser?.location || 'Chandigarh',
    title: currentUser?.title || 'AI/ML & Full Stack Developer',
    experience: currentUser?.experience || '2 Years',
    education: currentUser?.education || 'MCA',
    skills: currentUser?.skills || ['Python', 'AI/ML', 'React', 'Node.js'],
    bio: currentUser?.bio || '',
    linkedin: currentUser?.linkedin || '',
    portfolio: currentUser?.portfolio || '',
  }));

  // Synchronize profile with currentUser updates
  useEffect(() => {
    if (currentUser?.isLoggedIn) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        location: currentUser.location || prev.location,
        title: currentUser.title || prev.title,
        experience: currentUser.experience || prev.experience,
        education: currentUser.education || prev.education,
        skills: currentUser.skills || prev.skills,
        bio: currentUser.bio || prev.bio,
        linkedin: currentUser.linkedin || prev.linkedin,
        portfolio: currentUser.portfolio || prev.portfolio,
      }));
    }
  }, [currentUser]);

  // 3. Saved Jobs State
  const [savedJobs, setSavedJobs] = useState(() => {
    if (currentUser?.savedJobs && Array.isArray(currentUser.savedJobs)) {
      return new Set(currentUser.savedJobs.map(id => String(id)));
    }
    return new Set(['1', '2']);
  });

  // 4. Applications State
  const [applications, setApplications] = useState([]);

  // 5. Activity State
  const [activity, setActivity] = useState([]);

  // 6. Notifications State
  const [notifications, setNotifications] = useState([]);

  // 7. Resume State
  const [resume, setResume] = useState(() => currentUser?.resume || {
    personal: {
      fullName: 'Anil Kumar',
      title: 'AI/ML & Full Stack Developer',
      email: 'anil@example.com',
      phone: '+91 98765 43210',
      location: 'Chandigarh, India',
    },
    summary: 'Forward-thinking developer with experience in crafting scalable web applications.',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
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
    culture: 'We value innovation, transparency, and a strong work-life balance.',
    status: 'Approved',
  });

  // 9. Jobs State (Backend fetched with rich fallback)
  const [jobs, setJobs] = useState(() => 
    fallbackJobs.map(job => ({ ...job, status: 'Active', moderationStatus: 'Approved' }))
  );

  // 10. Admin: Platform State
  const [users, setUsers] = useState([
    { id: 1, name: 'Anil Kumar', email: 'anil@example.com', role: 'jobseeker', location: 'Chandigarh', status: 'Active', joinedDate: '2023-01-15' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@technova.example', role: 'recruiter', location: 'Delhi', status: 'Active', joinedDate: '2023-02-10' },
    { id: 3, name: 'Priya Singh', email: 'priya@example.com', role: 'jobseeker', location: 'Mumbai', status: 'Suspended', joinedDate: '2023-03-22' },
    { id: 999, name: 'Platform Admin', email: 'admin@jobportal.com', role: 'admin', location: 'System', status: 'Active', joinedDate: '2020-01-01' },
  ]);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechNova',
      logo: 'TN',
      industry: 'Software Development',
      size: '51-200',
      location: 'Chandigarh',
      website: 'https://technova.example.com',
      email: 'careers@technova.example',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Global Systems Inc.',
      logo: 'GS',
      industry: 'IT Consulting',
      size: '1000+',
      location: 'Bengaluru',
      website: 'https://globalsystems.example.com',
      email: 'hr@globalsystems.example',
      status: 'Approved',
    },
    {
      id: 3,
      name: 'AI Frontier',
      logo: 'AF',
      industry: 'Artificial Intelligence',
      size: '10-50',
      location: 'Bangalore',
      website: 'https://aifrontier.example.com',
      email: 'careers@aifrontier.example',
      status: 'Approved',
    }
  ]);

  const [adminActivity, setAdminActivity] = useState([
    { id: 1, description: 'Platform initialized in Full Stack Mode', type: 'System', date: new Date().toLocaleString() },
  ]);

  const [recruiterActivity, setRecruiterActivity] = useState([]);

  // Fetch Jobs from backend on mount
  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Merge with fallback data to ensure rich representation
          const existingIds = new Set(data.map(j => String(j.id || j._id)));
          const additional = fallbackJobs.filter(j => !existingIds.has(String(j.id)));
          setJobs([...data, ...additional]);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend /api/jobs unreachable, using fallback dataset:', err.message);
    }
  }, []);

  // Fetch applications based on current role
  const fetchApplications = useCallback(async () => {
    if (!currentUser?.token) return;

    try {
      const endpoint = currentUser.role === 'admin' 
        ? '/api/applications/admin'
        : currentUser.role === 'recruiter'
        ? '/api/applications/recruiter'
        : '/api/applications/my';

      const res = await fetch(endpoint, {
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.warn('Failed to fetch applications from API:', err.message);
    }
  }, [currentUser?.role, currentUser?.token, getAuthHeaders]);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!currentUser?.token) return;

    try {
      const res = await fetch('/api/notifications', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.warn('Failed to fetch notifications from API:', err.message);
    }
  }, [currentUser?.token, getAuthHeaders]);

  // Fetch recruiter company
  const fetchCompany = useCallback(async () => {
    if (currentUser?.role !== 'recruiter' || !currentUser?.token) return;

    try {
      const res = await fetch('/api/companies/my', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setCompany(data);
      }
    } catch (err) {
      console.warn('Failed to fetch company from API:', err.message);
    }
  }, [currentUser?.role, currentUser?.token, getAuthHeaders]);

  // Fetch admin platform data
  const fetchAdminData = useCallback(async () => {
    if (currentUser?.role !== 'admin' || !currentUser?.token) return;

    try {
      const [usersRes, companiesRes] = await Promise.all([
        fetch('/api/auth/users', { headers: getAuthHeaders() }),
        fetch('/api/companies?all=true'),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);
      }
    } catch (err) {
      console.warn('Failed to fetch admin data from API:', err.message);
    }
  }, [currentUser?.role, currentUser?.token, getAuthHeaders]);

  // Initial and reactive data loading
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (currentUser?.isLoggedIn && currentUser?.token) {
      fetchApplications();
      fetchNotifications();
      if (currentUser.role === 'recruiter') fetchCompany();
      if (currentUser.role === 'admin') fetchAdminData();
    }
  }, [currentUser?.isLoggedIn, currentUser?.token, currentUser?.role, fetchApplications, fetchNotifications, fetchCompany, fetchAdminData]);

  // Authentication functions
  const loginUser = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const user = { ...data, isLoggedIn: true, id: data._id || data.id };
        setCurrentUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));

        if (data.savedJobs) {
          setSavedJobs(new Set(data.savedJobs.map(id => String(id))));
        }
        if (data.resume) {
          setResume(data.resume);
        }

        showToast(`Welcome back, ${data.name}!`, 'success');
        return { success: true };
      } else {
        showToast(data.message || 'Login failed', 'error');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error', error);
      showToast('Server error. Please ensure backend is running.', 'error');
      return { success: false, message: 'Server error. Please ensure backend is running.' };
    }
  };

  const registerUser = async (name, email, password, role) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        const user = { ...data, isLoggedIn: true, id: data._id || data.id };
        setCurrentUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        showToast('Account registered successfully!', 'success');
        return { success: true };
      } else {
        showToast(data.message || 'Registration failed', 'error');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Register error', error);
      showToast('Server error. Please ensure backend is running.', 'error');
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
      role: 'jobseeker',
    });
    setApplications([]);
    setNotifications([]);
    showToast('Logged out successfully', 'success');
  };

  // Demo Switcher: cycles between Jobseeker, Recruiter, and Admin with live backend sessions
  const toggleRole = async () => {
    let targetEmail = 'anil@example.com';
    let nextRole = 'jobseeker';

    if (currentUser.role === 'jobseeker') {
      targetEmail = 'rahul@technova.example';
      nextRole = 'recruiter';
    } else if (currentUser.role === 'recruiter') {
      targetEmail = 'admin@jobportal.com';
      nextRole = 'admin';
    }

    const res = await loginUser(targetEmail, 'password123');
    if (!res.success) {
      // Local fallback if server is offline
      setCurrentUser(prev => ({
        ...prev,
        role: nextRole,
        name: nextRole === 'recruiter' ? 'Rahul Sharma' : nextRole === 'admin' ? 'Platform Admin' : 'Anil Kumar',
        email: targetEmail,
        isLoggedIn: true,
      }));
    }
    showToast(`Switched active role to: ${nextRole.toUpperCase()}`, 'info');
  };

  // Profile update with API sync
  const updateProfile = async (newProfileData) => {
    setProfile(prev => ({ ...prev, ...newProfileData }));
    addActivity('Updated profile', 'Profile');

    if (currentUser?.token) {
      try {
        await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(newProfileData),
        });
      } catch (err) {
        console.warn('Failed to sync profile update to API', err);
      }
    }

    addNotification('Profile Updated', 'Your profile information was updated successfully.', 'profile');
    showToast('Profile updated successfully!', 'success');
  };

  // Saved Jobs with API sync
  const toggleSaveJob = async (jobId, jobTitle) => {
    const strJobId = String(jobId);
    let isNowSaved = false;

    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(strJobId)) {
        next.delete(strJobId);
        isNowSaved = false;
        addActivity(`Removed ${jobTitle || 'Job'} from saved jobs`, 'Unsaved');
        showToast('Removed from saved jobs', 'info');
      } else {
        next.add(strJobId);
        isNowSaved = true;
        addActivity(`Saved ${jobTitle || 'Job'}`, 'Saved');
        addNotification('Job Saved', `${jobTitle || 'Job'} was added to your Saved Jobs.`, 'saved');
        showToast('Job saved to your bookmarks!', 'success');
      }
      return next;
    });

    if (currentUser?.token) {
      try {
        await fetch(`/api/auth/saved-jobs/${strJobId}`, {
          method: 'POST',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync saved job to API', err);
      }
    }
  };

  const isJobSaved = (jobId) => savedJobs.has(String(jobId));

  // Application submission with API sync
  const applyForJob = async (applicationData) => {
    const newApplication = {
      id: Date.now(),
      appliedDate: new Date().toLocaleDateString(),
      status: 'Applied',
      ...applicationData,
    };

    setApplications(prev => [newApplication, ...prev]);
    addActivity(`Applied for ${applicationData.jobTitle} at ${applicationData.company}`, 'Applied');
    addNotification('Application Submitted', `Your application for ${applicationData.jobTitle} was submitted successfully.`, 'application');
    showToast('Application submitted successfully!', 'success');

    if (currentUser?.token) {
      try {
        const res = await fetch('/api/applications', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(applicationData),
        });
        if (res.ok) {
          const saved = await res.json();
          setApplications(prev => prev.map(a => a.id === newApplication.id ? saved : a));
        }
      } catch (err) {
        console.warn('Failed to sync application to API', err);
      }
    }
  };

  const hasAppliedForJob = (jobId) => {
    return applications.some(app => String(app.jobId) === String(jobId));
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      const isMatch = (app._id && String(app._id) === String(appId)) || (app.id && String(app.id) === String(appId));
      if (isMatch) {
        return { ...app, status: newStatus };
      }
      return app;
    }));

    addRecruiterActivity(`Updated application status to ${newStatus}`, 'Application');
    showToast(`Candidate status updated to ${newStatus}`, 'success');

    if (currentUser?.token) {
      try {
        await fetch(`/api/applications/${appId}/status`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.warn('Failed to sync application status to API', err);
      }
    }
  };

  // Recruiter Job management with API sync
  const addJob = async (jobData) => {
    const newJob = {
      id: Date.now(),
      company: company.name,
      companyLogo: company.logo,
      moderationStatus: currentUser.role === 'admin' ? 'Approved' : 'Pending Review',
      status: 'Active',
      ...jobData,
    };

    setJobs(prev => [newJob, ...prev]);
    addRecruiterActivity(`Posted new job: ${jobData.title}`, 'Job');
    addNotification('Job Pending Review', `Your job ${jobData.title} is pending admin review.`, 'system');
    showToast('Job posted successfully!', 'success');

    if (currentUser?.token) {
      try {
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            ...jobData,
            company: company.name,
            companyLogo: company.logo,
          }),
        });
        if (res.ok) {
          const savedJob = await res.json();
          setJobs(prev => prev.map(j => j.id === newJob.id ? savedJob : j));
        }
      } catch (err) {
        console.warn('Failed to sync job creation to API', err);
      }
    }
  };

  const updateJob = async (jobId, jobData) => {
    setJobs(prev => prev.map(job => (String(job.id || job._id) === String(jobId) ? { ...job, ...jobData } : job)));
    addRecruiterActivity(`Updated job: ${jobData.title || 'Job'}`, 'Job');
    showToast('Job details updated', 'success');

    if (currentUser?.token) {
      try {
        await fetch(`/api/jobs/${jobId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(jobData),
        });
      } catch (err) {
        console.warn('Failed to sync job update to API', err);
      }
    }
  };

  const deleteJob = async (jobId) => {
    setJobs(prev => prev.filter(job => String(job.id || job._id) !== String(jobId)));
    addRecruiterActivity('Deleted a job posting', 'Job');
    showToast('Job posting removed', 'info');

    if (currentUser?.token) {
      try {
        await fetch(`/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync job deletion to API', err);
      }
    }
  };

  // Company management
  const updateCompany = async (newCompanyData) => {
    setCompany(prev => ({ ...prev, ...newCompanyData }));
    setCompanies(prev => prev.map(c => c.name === company.name ? { ...c, ...newCompanyData } : c));
    addRecruiterActivity('Updated company profile', 'Company');
    showToast('Company profile updated', 'success');

    if (currentUser?.token) {
      try {
        await fetch('/api/companies/my', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(newCompanyData),
        });
      } catch (err) {
        console.warn('Failed to sync company update to API', err);
      }
    }
  };

  // Admin moderation functions
  const updateUserStatus = async (userId, newStatus) => {
    setUsers(prev => prev.map(u => String(u.id || u._id) === String(userId) ? { ...u, status: newStatus } : u));
    addAdminActivity(`Updated user status to ${newStatus}`, 'User');
    showToast(`User status set to ${newStatus}`, 'info');

    if (currentUser?.token) {
      try {
        await fetch(`/api/auth/users/${userId}/status`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.warn('Failed to sync user status to API', err);
      }
    }
  };

  const deleteUser = async (userId) => {
    setUsers(prev => prev.filter(u => String(u.id || u._id) !== String(userId)));
    addAdminActivity(`Deleted user ID: ${userId}`, 'User');
    showToast('User deleted from platform', 'warning');

    if (currentUser?.token) {
      try {
        await fetch(`/api/auth/users/${userId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync user deletion to API', err);
      }
    }
  };

  const updateCompanyStatus = async (companyId, newStatus) => {
    setCompanies(prev => prev.map(c => String(c.id || c._id) === String(companyId) ? { ...c, status: newStatus } : c));
    addAdminActivity(`Updated company status to ${newStatus}`, 'Company');
    showToast(`Company status updated to ${newStatus}`, 'info');

    if (currentUser?.token) {
      try {
        await fetch(`/api/companies/${companyId}/status`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.warn('Failed to sync company status to API', err);
      }
    }
  };

  const deleteCompany = async (companyId) => {
    setCompanies(prev => prev.filter(c => String(c.id || c._id) !== String(companyId)));
    addAdminActivity(`Deleted company ID: ${companyId}`, 'Company');
    showToast('Company record removed', 'warning');

    if (currentUser?.token) {
      try {
        await fetch(`/api/companies/${companyId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync company deletion to API', err);
      }
    }
  };

  const updateJobModerationStatus = async (jobId, newStatus) => {
    setJobs(prev => prev.map(j => String(j.id || j._id) === String(jobId) ? { ...j, moderationStatus: newStatus } : j));
    addAdminActivity(`Updated job moderation to ${newStatus}`, 'Job');
    showToast(`Job listing moderation: ${newStatus}`, 'info');

    if (currentUser?.token) {
      try {
        await fetch(`/api/jobs/${jobId}/moderation`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ moderationStatus: newStatus }),
        });
      } catch (err) {
        console.warn('Failed to sync job moderation to API', err);
      }
    }
  };

  // Notifications management
  const addNotification = (title, message, type) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      date: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = async (id) => {
    setNotifications(prev => prev.map(n => String(n._id || n.id) === String(id) ? { ...n, read: true } : n));

    if (currentUser?.token) {
      try {
        await fetch(`/api/notifications/${id}/read`, {
          method: 'PUT',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync notification read to API', err);
      }
    }
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'success');

    if (currentUser?.token) {
      try {
        await fetch('/api/notifications/read-all', {
          method: 'PUT',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync mark all read to API', err);
      }
    }
  };

  const removeNotification = async (id) => {
    setNotifications(prev => prev.filter(n => String(n._id || n.id) !== String(id)));

    if (currentUser?.token) {
      try {
        await fetch(`/api/notifications/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } catch (err) {
        console.warn('Failed to sync notification delete to API', err);
      }
    }
  };

  // Resume builder persistence
  const saveResume = async (resumeData) => {
    setResume(resumeData);
    addNotification('Resume Saved', 'Your resume has been saved successfully.', 'profile');
    showToast('Resume saved successfully!', 'success');

    if (currentUser?.token) {
      try {
        await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ resume: resumeData }),
        });
      } catch (err) {
        console.warn('Failed to sync resume save to API', err);
      }
    }
  };

  const addActivity = (description, type) => {
    const newActivity = {
      id: Date.now(),
      description,
      type,
      date: new Date().toLocaleString(),
    };
    setActivity(prev => [newActivity, ...prev].slice(0, 20));
  };

  const addRecruiterActivity = (description, type) => {
    const newAct = {
      id: Date.now(),
      description,
      type,
      date: new Date().toLocaleString(),
    };
    setRecruiterActivity(prev => [newAct, ...prev].slice(0, 20));
  };

  const addAdminActivity = (description, type) => {
    setAdminActivity(prev => [{ id: Date.now(), description, type, date: new Date().toLocaleString() }, ...prev].slice(0, 20));
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
    toggleRole,
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
    updateJobModerationStatus,
    fetchJobs,
  };

  return (
    <JobPortalContext.Provider value={value}>
      {children}
    </JobPortalContext.Provider>
  );
};
