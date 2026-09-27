import React, { useState } from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Navigate } from 'react-router-dom';

const AdminCompanies = () => {
  const { currentUser, companies, updateCompanyStatus, deleteCompany } = useJobPortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [companyToDelete, setCompanyToDelete] = useState(null);

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteConfirm = () => {
    if (companyToDelete) {
      deleteCompany(companyToDelete.id);
      setCompanyToDelete(null);
    }
  };

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-1">Company Management</h1>
            <p className="text-secondary mb-0">Review, approve, and manage registered companies.</p>
          </div>
        </div>
      </Section>

      <Section className="py-4">
        <GlassCard className="p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input 
                  type="text" 
                  className="form-control form-control-lg ps-5 bg-light border-0" 
                  placeholder="Search companies..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select 
                className="form-select form-select-lg bg-light border-0"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending Review</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-center">
               <button 
                className="btn btn-light w-100 h-100 border-0"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {filteredCompanies.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Company</th>
                      <th scope="col">Industry</th>
                      <th scope="col">Location</th>
                      <th scope="col">Verification</th>
                      <th scope="col" className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map(company => (
                      <tr key={company.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-center text-primary fw-bold" style={{width: '48px', height: '48px', fontSize: '1.2rem'}}>
                              {company.logo || company.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                {company.name}
                                {company.status === 'Approved' && (
                                  <i className="bi bi-patch-check-fill text-primary" title="Verified Company"></i>
                                )}
                              </h6>
                              <span className="text-muted small">{company.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{company.industry}</td>
                        <td>{company.location}</td>
                        <td>
                          <span className={`badge ${
                            company.status === 'Approved' ? 'bg-success' : 
                            company.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'
                          } rounded-pill`}>
                            {company.status === 'Pending' ? 'Pending Review' : company.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="dropdown">
                            <button className="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                              {company.status === 'Pending' && (
                                <li>
                                  <button className="dropdown-item text-success fw-medium" onClick={() => updateCompanyStatus(company.id, 'Approved')}>
                                    <i className="bi bi-check-circle me-2"></i> Approve Company
                                  </button>
                                </li>
                              )}
                              {company.status === 'Approved' ? (
                                <li>
                                  <button className="dropdown-item text-warning" onClick={() => updateCompanyStatus(company.id, 'Suspended')}>
                                    <i className="bi bi-pause-circle me-2"></i> Suspend Company
                                  </button>
                                </li>
                              ) : company.status === 'Suspended' ? (
                                <li>
                                  <button className="dropdown-item text-success" onClick={() => updateCompanyStatus(company.id, 'Approved')}>
                                    <i className="bi bi-play-circle me-2"></i> Reactivate Company
                                  </button>
                                </li>
                              ) : null}
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button 
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal" 
                                  data-bs-target="#deleteCompanyModal"
                                  onClick={() => setCompanyToDelete(company)}
                                >
                                  <i className="bi bi-trash me-2"></i> Delete Company
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center">
                <div className="display-1 text-muted mb-3"><i className="bi bi-building"></i></div>
                <h4 className="fw-bold">No companies found</h4>
                <p className="text-secondary mb-0">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteCompanyModal" tabIndex="-1" aria-labelledby="deleteCompanyModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom-0 pb-0">
              <h5 className="modal-title fw-bold" id="deleteCompanyModalLabel">Delete Company</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-4">
              {companyToDelete && (
                <div className="text-center mb-4">
                  <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-exclamation-triangle fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Delete {companyToDelete.name}?</h5>
                  <p className="text-secondary mb-0">
                    This action is permanent. All jobs associated with this company will be orphaned or deleted.
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer border-top-0 pt-0 justify-content-center gap-2">
              <button type="button" className="btn btn-light px-4" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger px-4" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

    </PageContainer>
  );
};

export default AdminCompanies;
