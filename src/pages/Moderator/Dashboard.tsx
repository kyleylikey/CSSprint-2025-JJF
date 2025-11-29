import { useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const categoryLabels: Record<string, string> = {
  harassment: 'Harassment',
  discrimination: 'Discrimination',
  fraud: 'Fraud / Financial Misconduct',
  corruption: 'Corruption / Bribery',
  safety: 'Health & Safety Violation',
  conflict: 'Conflict of Interest',
  data: 'Data Privacy Violation',
  other: 'Other',
};

export default function ModeratorDashboard() {
  const { user } = useAuth();
  const { reports, getStatistics } = useReports();
  const navigate = useNavigate();
  const stats = getStatistics();

  // Get urgent reports (critical or high severity, not resolved/dismissed)
  const urgentReports = reports.filter(r => 
    (r.severity === 'critical' || r.severity === 'high') && 
    r.status !== 'resolved' && 
    r.status !== 'dismissed'
  ).slice(0, 3);

  // Get recent reports
  const recentReports = reports.slice(0, 3);

  // Calculate days since report
  const getDaysAgo = useCallback((date: string) => {
    const now = Date.now();
    const diff = now - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  }, []);

  return (
    <div className="dashboard moderator-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>HR Moderator Dashboard - Review and manage ethics reports</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card urgent">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <h3>{stats.critical}</h3>
            <p>Urgent Cases</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <div className="stat-content">
            <h3>{stats.newReports}</h3>
            <p>New Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>Under Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="content-section urgent-reports">
          <h2>⚠️ Urgent Reports Requiring Action</h2>
          <div className="urgent-list">
            {urgentReports.map(report => (
              <div key={report.id} className="urgent-item">
                <span className={`priority-badge ${report.severity}`}>
                  {report.severity.toUpperCase()}
                </span>
                <div className="urgent-content">
                  <h4>{report.title}</h4>
                  <p>Submitted {getDaysAgo(report.date)} • {report.id}</p>
                </div>
                <button 
                  className="btn-review"
                  onClick={() => navigate('/moderator/reports')}
                >
                  Review Now
                </button>
              </div>
            ))}
            {urgentReports.length === 0 && (
              <div className="no-urgent">
                <p>No urgent reports at this time</p>
              </div>
            )}
          </div>
        </div>

        <div className="content-section">
          <h2>📊 Quick Stats</h2>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="stat-label">Total Reports</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">This Month</span>
              <span className="stat-value">{stats.thisMonth}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Resolution Rate</span>
              <span className="stat-value">{stats.resolutionRate}%</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Pending Escalations</span>
              <span className="stat-value">
                {reports.filter(r => r.status === 'escalated').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>📋 Recent Reports</h2>
          <div className="reports-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map(report => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{categoryLabels[report.category] || report.category}</td>
                    <td><span className={`status ${report.status}`}>{report.status}</span></td>
                    <td>{getDaysAgo(report.date)}</td>
                    <td>
                      <button 
                        className="table-action"
                        onClick={() => navigate('/moderator/reports')}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
