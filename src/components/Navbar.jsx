import React from 'react';
import { Link } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { 
    currentUser, 
    setCurrentUser,
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    toggleRole,
    theme
  } = useJobPortal();

  const isRecruiter = currentUser?.role === 'recruiter';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3" style={{ zIndex: 1020 }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/">
          <img src={theme === 'dark' ? "/branding/nexora-icon-dark.svg" : "/branding/nexora-icon.svg"} alt="Nexora Logo" width="32" height="32" className="d-block d-sm-none" />
          <img src={theme === 'dark' ? "/branding/nexora-logo-dark.svg" : "/branding/nexora-logo.svg"} alt="Nexora Logo" height="32" className="d-none d-sm-block" />
        </Link>
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/admin/dashboard">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/admin/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/jobs">Jobs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/companies">Companies</Link>
                </li>
                {isRecruiter ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/recruiter/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/recruiter/jobs">Manage Jobs</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/applications">Applications</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/about">About</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <ThemeToggle />
            {/* Notification Bell */}
            {currentUser && currentUser.isLoggedIn && (
              <div className="dropdown position-relative">
                <button 
                  className="btn btn-link text-decoration-none text-muted hover-primary p-0 border-0 shadow-none position-relative" 
                  type="button"
                  id="notificationDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                  </svg>
                  {notifications?.filter(n => !n.read).length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                      {notifications.filter(n => !n.read).length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </button>
                <div 
                  className="dropdown-menu dropdown-menu-end border-standard shadow mt-2 p-0" 
                  aria-labelledby="notificationDropdown" 
                  style={{ width: '320px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h6 className="mb-0 fw-bold">Notifications</h6>
                    {notifications?.filter(n => !n.read).length > 0 && (
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </div>
                  
                  <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                    {notifications?.length > 0 ? (
                      notifications.slice(0, 5).map(notif => (
                        <div 
                          key={notif.id} 
                          className={`p-3 border-bottom ${notif.read ? 'bg-transparent' : 'bg-light'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            if (!notif.read) markNotificationRead(notif.id);
                          }}
                        >
                          <div className="d-flex gap-3">
                            <div className="mt-1">
                              {notif.type === 'application' && <span className="text-success fs-5">✓</span>}
                              {notif.type === 'saved' && <span className="text-info fs-5">♥</span>}
                              {notif.type === 'profile' && <span className="text-primary fs-5">✎</span>}
                              {notif.type === 'system' && <span className="text-warning fs-5">★</span>}
                            </div>
                            <div>
                              <p className={`mb-1 text-sm ${notif.read ? 'text-secondary' : 'fw-bold text-dark'}`}>
                                {notif.title}
                              </p>
                              <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>{notif.message}</p>
                              <span className="text-meta" style={{ fontSize: '0.75rem' }}>{notif.date}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-secondary">
                        <p className="mb-0 small">No notifications</p>
                      </div>
                    )}
                  </div>

                  {notifications?.length > 0 && (
                    <div className="p-2 border-top bg-white d-flex justify-content-between">
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllNotificationsRead();
                        }}
                      >
                        Mark all as read
                      </button>
                      <Link to="/notifications" className="btn btn-link btn-sm text-decoration-none fw-medium">
                        View all
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="vr d-none d-lg-block mx-2"></div>
            {currentUser && currentUser.isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <button 
                  onClick={toggleRole} 
                  className={`btn btn-sm ${isAdmin ? 'btn-outline-danger' : isRecruiter ? 'btn-outline-warning' : 'btn-outline-info'} rounded-pill`}
                  title="Dev Tool: Toggle Role"
                >
                  {isAdmin ? 'Admin' : isRecruiter ? 'Recruiter' : 'Job Seeker'}
                </button>
                
                {isAdmin ? (
                  <>
                    <Link to="/admin/reports" className="text-decoration-none text-body fw-medium hover-primary d-none d-lg-block">Reports</Link>
                  </>
                ) : isRecruiter ? (
                  <>
                    <Link to="/recruiter/post-job" className="btn btn-primary btn-sm rounded-pill d-none d-lg-flex align-items-center gap-1">
                      <i className="bi bi-plus-lg"></i> Post Job
                    </Link>
                    <Link to="/recruiter/company" className="text-decoration-none text-body fw-medium hover-primary d-none d-lg-block">Company</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-decoration-none text-body fw-medium hover-primary d-none d-lg-block">Dashboard</Link>
                    <Link to="/saved-jobs" className="text-decoration-none text-body fw-medium hover-primary d-none d-lg-block">Saved</Link>
                  </>
                )}
                
                <Link to={isAdmin ? "/admin/dashboard" : isRecruiter ? "/recruiter/dashboard" : "/profile"} className="text-decoration-none d-flex align-items-center gap-2">
                  <div className={`bg-${isAdmin ? 'danger' : 'primary'} text-white rounded-circle d-flex justify-content-center align-items-center`} style={{width: '36px', height: '36px'}}>
                    {currentUser.name.charAt(0)}
                  </div>
                </Link>
                <button 
                  onClick={() => setCurrentUser(prev => ({ ...prev, isLoggedIn: false }))} 
                  className="btn btn-sm btn-outline-secondary rounded-pill"
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-decoration-none text-body fw-medium hover-primary">Log in</Link>
                <Link to="/register" className="btn btn-primary btn-material btn-primary-custom px-4 ms-lg-2">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
