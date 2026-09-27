import React from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Navigate } from 'react-router-dom';

const AdminReports = () => {
  const { currentUser, adminActivity } = useJobPortal();

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-1">Activity Reports & Audit Log</h1>
            <p className="text-secondary mb-0">Complete historical trail of administrative actions.</p>
          </div>
        </div>
      </Section>

      <Section className="py-4">
        <GlassCard className="p-0 overflow-hidden">
          {adminActivity.length === 0 ? (
             <div className="p-5 text-center">
                <div className="display-1 text-muted mb-3"><i className="bi bi-journal-x"></i></div>
                <h4 className="fw-bold">No activity recorded</h4>
                <p className="text-secondary mb-0">Administrative actions will appear here.</p>
              </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-4">Date & Time</th>
                    <th scope="col">Type</th>
                    <th scope="col">Target ID</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {adminActivity.map(act => (
                    <tr key={act.id}>
                      <td className="ps-4 py-3 text-muted small">{act.date}</td>
                      <td>
                        <span className={`badge ${
                          act.type === 'User' ? 'bg-primary' : 
                          act.type === 'Company' ? 'bg-info' : 
                          act.type === 'Job' ? 'bg-success' : 'bg-secondary'
                        } bg-opacity-10 text-${
                          act.type === 'User' ? 'primary' : 
                          act.type === 'Company' ? 'info text-dark' : 
                          act.type === 'Job' ? 'success' : 'secondary'
                        }`}>
                          {act.type}
                        </span>
                      </td>
                      <td className="font-monospace small text-secondary">{act.targetId}</td>
                      <td className="fw-medium">{act.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </Section>
    </PageContainer>
  );
};

export default AdminReports;
