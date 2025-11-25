import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

export default function EmployeeDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Employee Dashboard - Report concerns and track your submissions</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Reports Submitted</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>1</h3>
            <p>Pending Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <h3>1</h3>
            <p>New Updates</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/employee/report" className="action-btn primary">
              📝 Submit New Report
            </a>
            <a href="/employee/my-reports" className="action-btn secondary">
              📋 View My Reports
            </a>
          </div>
        </div>

        <div className="content-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">🔵</span>
              <div className="activity-content">
                <p>Your report #1023 is under review</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🟢</span>
              <div className="activity-content">
                <p>Report #1021 has been resolved</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🟡</span>
              <div className="activity-content">
                <p>HR requested additional information for report #1020</p>
                <span className="activity-time">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>Ethics Resources</h2>
          <div className="resources-list">
            <a href="#" className="resource-item">
              📘 Company Code of Conduct
            </a>
            <a href="#" className="resource-item">
              📗 Whistleblower Protection Policy
            </a>
            <a href="#" className="resource-item">
              📙 Ethics Training Materials
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
