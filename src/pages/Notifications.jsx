import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { useJobPortal } from '../context/JobPortalContext';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, removeNotification } = useJobPortal();
  const [filter, setFilter] = useState('All'); // 'All', 'Unread', 'Read'

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Read') return n.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'application': return <span className="text-success fs-4">✓</span>;
      case 'saved': return <span className="text-info fs-4">♥</span>;
      case 'profile': return <span className="text-primary fs-4">✎</span>;
      case 'system': return <span className="text-warning fs-4">★</span>;
      default: return <span className="text-secondary fs-4">🔔</span>;
    }
  };

  const getLink = (type) => {
    switch (type) {
      case 'application': return '/applications';
      case 'saved': return '/saved-jobs';
      case 'profile': return '/profile';
      default: return '/dashboard';
    }
  };

  return (
    <PageContainer>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Notifications</h2>
              <p className="text-secondary mb-0">Stay updated on your job search</p>
            </div>
            {notifications.filter(n => !n.read).length > 0 && (
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={markAllNotificationsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="card border-standard shadow-sm">
            <div className="card-header bg-white border-bottom p-3">
              <div className="d-flex gap-2">
                <button 
                  className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('All')}
                >
                  All
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'Unread' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('Unread')}
                >
                  Unread {notifications.filter(n => !n.read).length > 0 && `(${notifications.filter(n => !n.read).length})`}
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'Read' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('Read')}
                >
                  Read
                </button>
              </div>
            </div>
            
            <div className="list-group list-group-flush">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`list-group-item p-4 d-flex justify-content-between align-items-start ${notif.read ? 'bg-transparent' : 'bg-light'}`}
                  >
                    <div className="d-flex gap-3 w-100">
                      <div className="mt-1">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h6 className={`mb-1 ${notif.read ? 'text-secondary' : 'fw-bold text-dark'}`}>
                            {notif.title}
                          </h6>
                          <span className="text-meta small">{notif.date}</span>
                        </div>
                        <p className="mb-2 text-secondary">{notif.message}</p>
                        <div className="d-flex gap-3 align-items-center">
                          <Link to={getLink(notif.type)} className="text-decoration-none small fw-medium">
                            View details
                          </Link>
                          {!notif.read && (
                            <button 
                              className="btn btn-link btn-sm text-decoration-none p-0 small"
                              onClick={() => markNotificationRead(notif.id)}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                      <button 
                        className="btn btn-link text-muted p-0 ms-2"
                        onClick={() => removeNotification(notif.id)}
                        aria-label="Remove notification"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5 text-center text-secondary">
                  <div className="fs-1 mb-3">📭</div>
                  <h5>No notifications</h5>
                  <p className="mb-0">You're all caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Notifications;
