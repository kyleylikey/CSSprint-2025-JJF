import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Admin Dashboard - System overview and management</p>
      </div>

      <div className="stats-grid admin-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>156</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>89</h3>
            <p>Reports This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>94%</h3>
            <p>Resolution Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔒</div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Active Cases</p>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <div className="content-section">
          <h2>📈 System Health</h2>
          <div className="health-indicators">
            <div className="health-item">
              <span className="health-label">System Status</span>
              <span className="health-value online">🟢 Online</span>
            </div>
            <div className="health-item">
              <span className="health-label">Database</span>
              <span className="health-value online">🟢 Healthy</span>
            </div>
            <div className="health-item">
              <span className="health-label">API Response</span>
              <span className="health-value">~120ms</span>
            </div>
            <div className="health-item">
              <span className="health-label">Last Backup</span>
              <span className="health-value">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>👥 User Overview</h2>
          <div className="user-breakdown">
            <div className="user-type">
              <span className="type-label">Employees</span>
              <div className="type-bar">
                <div className="bar-fill" style={{ width: '80%' }}></div>
              </div>
              <span className="type-count">128</span>
            </div>
            <div className="user-type">
              <span className="type-label">Moderators</span>
              <div className="type-bar">
                <div className="bar-fill moderator" style={{ width: '15%' }}></div>
              </div>
              <span className="type-count">24</span>
            </div>
            <div className="user-type">
              <span className="type-label">Admins</span>
              <div className="type-bar">
                <div className="bar-fill admin" style={{ width: '2.5%' }}></div>
              </div>
              <span className="type-count">4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>📋 Quick Actions</h2>
          <div className="admin-actions">
            <a href="/admin/users" className="admin-action-card">
              <span className="action-icon">👤</span>
              <h3>User Management</h3>
              <p>Add, edit, or remove users</p>
            </a>
            <a href="/admin/analytics" className="admin-action-card">
              <span className="action-icon">📊</span>
              <h3>Analytics</h3>
              <p>View detailed reports and trends</p>
            </a>
            <a href="/admin/settings" className="admin-action-card">
              <span className="action-icon">⚙️</span>
              <h3>System Settings</h3>
              <p>Configure system parameters</p>
            </a>
            <a href="#" className="admin-action-card">
              <span className="action-icon">📧</span>
              <h3>Notifications</h3>
              <p>Manage email templates</p>
            </a>
          </div>
        </div>

        <div className="content-section">
          <h2>🕐 Recent Activity</h2>
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p>New user <strong>Sarah Wilson</strong> was added</p>
                <span className="timeline-time">10 minutes ago</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p>System backup completed successfully</p>
                <span className="timeline-time">2 hours ago</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p>Case CASE-2024-001 was escalated by Jane Moderator</p>
                <span className="timeline-time">5 hours ago</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p>Email notification settings were updated</p>
                <span className="timeline-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
