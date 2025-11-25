import './MyReports.css';

interface Report {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  date: string;
  severity: string;
}

const mockReports: Report[] = [
  {
    id: 'REP-1023',
    title: 'Suspected expense fraud in Marketing Dept',
    category: 'Fraud / Financial Misconduct',
    status: 'reviewing',
    date: '2024-01-15',
    severity: 'high',
  },
  {
    id: 'REP-1021',
    title: 'Workplace harassment incident',
    category: 'Harassment',
    status: 'resolved',
    date: '2024-01-10',
    severity: 'medium',
  },
  {
    id: 'REP-1020',
    title: 'Safety protocol violation',
    category: 'Health & Safety Violation',
    status: 'pending',
    date: '2024-01-08',
    severity: 'low',
  },
];

const statusColors: Record<string, string> = {
  pending: '#ecc94b',
  reviewing: '#4299e1',
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
  return (
    <div className="my-reports">
      <div className="reports-header">
        <h1>My Reports</h1>
        <p>Track the status of your submitted reports</p>
      </div>

      <div className="reports-list">
        {mockReports.map(report => (
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
                📁 {report.category}
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

            <div className="report-actions">
              <button className="btn-view">View Details</button>
              <button className="btn-update">Add Update</button>
            </div>
          </div>
        ))}
      </div>

      {mockReports.length === 0 && (
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
