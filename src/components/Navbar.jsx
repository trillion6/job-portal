import React from 'react';
import { Link } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { 
    currentUser, 
    logoutUser,
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    toggleRole,
    theme
  } = useJobPortal();

  const isRecruiter = currentUser?.role === 'recruiter';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top py-3" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-standard)', zIndex: 1020 }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
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
                      <Link className="nav-link text-body fw-medium px-lg-3 hover-primary" to="/resume-builder">Resume</Link>
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
                  aria-label="Notifications"
                >
                  <i className="bi bi-bell fs-5"></i>
                  {notifications?.filter(n => !n.read).length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-amber text-dark fw-bold" style={{ fontSize: '0.65rem' }}>
                      {notifications.filter(n => !n.read).length}
                      <span className="visually-hidden">unread notifications</span>
                    </span>
                  )}
                </button>
                <div 
                  className="dropdown-menu dropdown-menu-end border-standard shadow-lg mt-2 p-0" 
                  aria-labelledby="notificationDropdown" 
                  style={{ width: '320px', backgroundColor: 'var(--surface-color)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-standard">
                    <h6 className="mb-0 fw-bold">Notifications</h6>
                    {notifications?.filter(n => !n.read).length > 0 && (
                      <span className="status-badge badge-amber">
                        {notifications.filter(n => !n.read).length} new
                      </span>
                    )}
                  </div>
                  
                  <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                    {notifications?.length > 0 ? (
                      notifications.slice(0, 5).map(notif => (
                        <div 
                          key={notif._id || notif.id} 
                          className={`p-3 border-bottom border-standard ${notif.read ? 'bg-transparent' : 'bg-subtle'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            if (!notif.read) markNotificationRead(notif._id || notif.id);
                          }}
                        >
                          <div className="d-flex gap-3">
                            <div className="mt-1">
                              {notif.type === 'application' && <i className="bi bi-send-check text-sage fs-5"></i>}
                              {notif.type === 'saved' && <i className="bi bi-bookmark-heart text-amber fs-5"></i>}
                              {notif.type === 'profile' && <i className="bi bi-person-check text-walnut fs-5"></i>}
                              {notif.type === 'system' && <i className="bi bi-bell text-secondary fs-5"></i>}
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
                    <div className="p-2 border-top border-standard d-flex justify-content-between">
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllNotificationsRead();
                        }}
                      >
                        Mark all as read
                      </button>
                      <Link to="/notifications" className="btn btn-link btn-sm text-decoration-none fw-medium text-amber">
                        View all
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="vr d-none d-lg-block mx-2 border-standard"></div>
            {currentUser && currentUser.isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <button 
                  onClick={toggleRole} 
                  className="status-badge badge-sage border border-sage text-decoration-none btn-material py-1 px-3"
                  title="Dev Tool: Switch Role"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-arrow-repeat me-1 text-amber"></i>
                  {isAdmin ? 'Admin' : isRecruiter ? 'Recruiter' : 'Job Seeker'}
                </button>
                
                {isAdmin ? (
                  <>
                    <Link to="/admin/reports" className="text-decoration-none text-body fw-medium hover-primary d-none d-lg-block">Reports</Link>
                  </>
                ) : isRecruiter ? (
                  <>
                    <Link to="/recruiter/post-job" className="btn btn-primary btn-sm btn-material d-none d-lg-flex align-items-center gap-1">
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
                  <div className="bg-walnut rounded-circle d-flex justify-content-center align-items-center fw-bold shadow-sm" style={{width: '36px', height: '36px', color: '#FAF8F4'}}>
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                </Link>
                <button 
                  onClick={logoutUser} 
                  className="btn btn-sm btn-outline-secondary btn-material py-1 px-3"
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-decoration-none text-body fw-medium hover-primary">Log in</Link>
                <Link to="/register" className="btn btn-primary btn-material px-4 ms-lg-2">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
