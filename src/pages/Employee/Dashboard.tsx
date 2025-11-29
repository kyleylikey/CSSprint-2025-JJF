import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import './Dashboard.css';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { getReportsBySubmitter } = useReports();
  
  // Get user's reports using consolidated function
  const userReports = user 
    ? getReportsBySubmitter(user.id, user.name)
    : [];
  
  const totalSubmitted = userReports.length;
  const pendingReview = userReports.filter(r => 
    r.status === 'new' || r.status === 'reviewing' || r.status === 'pending'
  ).length;
  const resolved = userReports.filter(r => r.status === 'resolved').length;
  const reportsWithUpdates = userReports.filter(r => r.notes.length > 0).length;

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
            <h3>{totalSubmitted}</h3>
            <p>Reports Submitted</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{pendingReview}</h3>
            <p>Pending Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <h3>{reportsWithUpdates}</h3>
            <p>Reports with Updates</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/employee/report" className="action-btn primary">
              📝 Submit New Report
            </Link>
            <Link to="/employee/my-reports" className="action-btn secondary">
              📋 View My Reports
            </Link>
          </div>
        </div>

        <div className="content-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {userReports.slice(0, 3).map(report => (
              <div key={report.id} className="activity-item">
                <span className="activity-icon">
                  {report.status === 'resolved' ? '🟢' : 
                   report.status === 'reviewing' ? '🔵' : 
                   report.status === 'escalated' ? '🟠' : '🟡'}
                </span>
                <div className="activity-content">
                  <p>
                    {report.status === 'resolved' 
                      ? `Report ${report.id} has been resolved`
                      : report.status === 'reviewing'
                      ? `Report ${report.id} is under review`
                      : report.status === 'escalated'
                      ? `Report ${report.id} has been escalated`
                      : `Report ${report.id} is pending`}
                  </p>
                  <span className="activity-time">{report.id}</span>
                </div>
              </div>
            ))}
            {userReports.length === 0 && (
              <div className="activity-item">
                <span className="activity-icon">ℹ️</span>
                <div className="activity-content">
                  <p>No reports submitted yet</p>
                </div>
              </div>
            )}
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
