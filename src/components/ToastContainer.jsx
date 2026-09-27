import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';

const ToastContainer = () => {
  const { toasts, hideToast } = useJobPortal();

  if (toasts.length === 0) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`toast show align-items-center text-white bg-${toast.type} border-0 mb-2 shadow-lg`} 
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
          style={{ minWidth: '250px' }}
        >
          <div className="d-flex">
            <div className="toast-body fw-medium">
              {toast.type === 'success' && <i className="bi bi-check-circle me-2"></i>}
              {toast.type === 'danger' && <i className="bi bi-exclamation-circle me-2"></i>}
              {toast.type === 'warning' && <i className="bi bi-exclamation-triangle me-2"></i>}
              {toast.type === 'info' && <i className="bi bi-info-circle me-2"></i>}
              {toast.message}
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white me-2 m-auto" 
              data-bs-dismiss="toast" 
              aria-label="Close" 
              onClick={() => hideToast(toast.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
