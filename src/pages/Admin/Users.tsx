import { useState } from 'react';
import './Users.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'moderator' | 'admin';
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Employee',
    email: 'john.employee@company.com',
    role: 'employee',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2024-01-16',
  },
  {
    id: '2',
    name: 'Jane Moderator',
    email: 'jane.moderator@company.com',
    role: 'moderator',
    department: 'Human Resources',
    status: 'active',
    lastLogin: '2024-01-16',
  },
  {
    id: '3',
    name: 'Alex Admin',
    email: 'alex.admin@company.com',
    role: 'admin',
    department: 'IT',
    status: 'active',
    lastLogin: '2024-01-16',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'employee',
    department: 'Marketing',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'employee',
    department: 'Sales',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: '6',
    name: 'Emily Brown',
    email: 'emily.brown@company.com',
    role: 'moderator',
    department: 'Human Resources',
    status: 'active',
    lastLogin: '2024-01-14',
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p>Manage user accounts and access permissions</p>
        </div>
        <button className="btn-add-user" onClick={() => setShowModal(true)}>
          + Add New User
        </button>
      </div>

      <div className="user-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${roleFilter === 'all' ? 'active' : ''}`}
            onClick={() => setRoleFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${roleFilter === 'employee' ? 'active' : ''}`}
            onClick={() => setRoleFilter('employee')}
          >
            Employees
          </button>
          <button
            className={`filter-btn ${roleFilter === 'moderator' ? 'active' : ''}`}
            onClick={() => setRoleFilter('moderator')}
          >
            Moderators
          </button>
          <button
            className={`filter-btn ${roleFilter === 'admin' ? 'active' : ''}`}
            onClick={() => setRoleFilter('admin')}
          >
            Admins
          </button>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" title="Edit">✏️</button>
                    <button className="btn-disable" title="Disable">🚫</button>
                    <button className="btn-delete" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add New User</h2>
            <form className="user-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select>
                  <option value="employee">Employee</option>
                  <option value="moderator">Moderator (HR)</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" placeholder="Enter department" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
