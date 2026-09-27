import React, { useState } from 'react';
import { useJobPortal } from '../context/JobPortalContext';
import PageContainer from '../components/PageContainer';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { Navigate } from 'react-router-dom';

const AdminUsers = () => {
  const { currentUser, users, updateUserStatus, deleteUser } = useJobPortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [userToDelete, setUserToDelete] = useState(null);

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || 
                        (roleFilter === 'Job Seeker' && user.role === 'jobseeker') ||
                        (roleFilter === 'Recruiter' && user.role === 'recruiter') ||
                        (roleFilter === 'Admin' && user.role === 'admin');
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <PageContainer>
      <Section className="py-4 bg-light border-bottom">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="h3 fw-bold mb-1">User Management</h1>
            <p className="text-secondary mb-0">Manage job seekers, recruiters, and admins.</p>
          </div>
        </div>
      </Section>

      <Section className="py-4">
        <GlassCard className="p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input 
                  type="text" 
                  className="form-control form-control-lg ps-5 bg-light border-0" 
                  placeholder="Search users by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select form-select-lg bg-light border-0"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Job Seeker">Job Seekers</option>
                <option value="Recruiter">Recruiters</option>
                <option value="Admin">Admins</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select form-select-lg bg-light border-0"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-center">
               <button 
                className="btn btn-light w-100 h-100 border-0"
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('All');
                  setStatusFilter('All');
                }}
                title="Clear Filters"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Users Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {filteredUsers.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">User</th>
                      <th scope="col">Role</th>
                      <th scope="col">Location</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${user.role === 'admin' ? 'bg-danger' : user.role === 'recruiter' ? 'bg-warning' : 'bg-primary'}`} style={{width: '40px', height: '40px'}}>
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{user.name}</h6>
                              <span className="text-muted small">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'recruiter' ? 'bg-warning text-dark' : 'bg-primary'} bg-opacity-10 text-${user.role === 'admin' ? 'danger' : user.role === 'recruiter' ? 'warning text-dark' : 'primary'}`}>
                            {user.role === 'jobseeker' ? 'Job Seeker' : user.role === 'recruiter' ? 'Recruiter' : 'Admin'}
                          </span>
                        </td>
                        <td>{user.location}</td>
                        <td>
                          <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="dropdown">
                            <button className="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                              {user.status === 'Active' ? (
                                <li>
                                  <button className="dropdown-item text-warning" onClick={() => updateUserStatus(user.id, 'Suspended')}>
                                    <i className="bi bi-pause-circle me-2"></i> Suspend User
                                  </button>
                                </li>
                              ) : (
                                <li>
                                  <button className="dropdown-item text-success" onClick={() => updateUserStatus(user.id, 'Active')}>
                                    <i className="bi bi-play-circle me-2"></i> Activate User
                                  </button>
                                </li>
                              )}
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button 
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal" 
                                  data-bs-target="#deleteUserModal"
                                  onClick={() => setUserToDelete(user)}
                                >
                                  <i className="bi bi-trash me-2"></i> Delete User
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
                <div className="display-1 text-muted mb-3"><i className="bi bi-people"></i></div>
                <h4 className="fw-bold">No users found</h4>
                <p className="text-secondary mb-0">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom-0 pb-0">
              <h5 className="modal-title fw-bold" id="deleteUserModalLabel">Delete User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-4">
              {userToDelete && (
                <>
                  <div className="text-center mb-4">
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-3">
                      <i className="bi bi-exclamation-triangle fs-1"></i>
                    </div>
                    <h5 className="fw-bold">Are you absolutely sure?</h5>
                    <p className="text-secondary mb-0">
                      This action cannot be undone. This will permanently delete the user account for <strong>{userToDelete.name}</strong> and remove all their associated data from the platform.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer border-top-0 pt-0 justify-content-center gap-2">
              <button type="button" className="btn btn-light px-4" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger px-4" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

    </PageContainer>
  );
};

export default AdminUsers;
