import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import type { Report } from '../../context/ReportContext';
import './MyReports.css';

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

const statusColors: Record<string, string> = {
  new: '#805ad5',
  pending: '#ecc94b',
  reviewing: '#4299e1',
  escalated: '#ed8936',
  resolved: '#48bb78',
  dismissed: '#a0aec0',
};

const severityColors: Record<string, string> = {
  low: '#48bb78',
  medium: '#ecc94b',
  high: '#ed8936',
  critical: '#f56565',
};

export default function MyReports() {
  const { user } = useAuth();
  const { getReportsBySubmitter } = useReports();
  
  // Get reports for current user using consolidated function
  const userReports: Report[] = user 
    ? getReportsBySubmitter(user.id, user.name)
    : [];

  return (
    <div className="my-reports">
      <div className="reports-header">
        <h1>My Reports</h1>
        <p>Track the status of your submitted reports</p>
      </div>

      <div className="reports-list">
        {userReports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-card-header">
              <span className="report-id">{report.id}</span>
              <span
                className="status-badge"
                style={{ backgroundColor: statusColors[report.status] }}
              >
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            </div>
            
            <h3 className="report-title">{report.title}</h3>
            
            <div className="report-meta">
              <span className="meta-item">
                📁 {categoryLabels[report.category] || report.category}
              </span>
              <span className="meta-item">
                📅 {new Date(report.date).toLocaleDateString()}
              </span>
              <span
                className="severity-badge"
                style={{ borderColor: severityColors[report.severity], color: severityColors[report.severity] }}
              >
                {report.severity.toUpperCase()}
              </span>
            </div>

            {report.anonymous && (
              <div className="anonymous-badge">
                🔒 Submitted Anonymously
              </div>
            )}

            <div className="report-actions">
              <button className="btn-view">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {userReports.length === 0 && (
        <div className="no-reports">
          <p>You haven't submitted any reports yet.</p>
          <a href="/employee/report" className="btn-primary">
            Submit Your First Report
          </a>
        </div>
      )}
    </div>
  );
}
