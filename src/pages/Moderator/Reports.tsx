import { useState } from 'react';
import './Reports.css';

interface Report {
  id: string;
  title: string;
  category: string;
  status: 'new' | 'reviewing' | 'pending' | 'escalated' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  submittedBy: string;
  date: string;
  anonymous: boolean;
}

const mockReports: Report[] = [
  {
    id: 'REP-1045',
    title: 'Financial fraud allegation in Accounting Department',
    category: 'Fraud / Financial Misconduct',
    status: 'new',
    severity: 'critical',
    submittedBy: 'Anonymous',
    date: '2024-01-16',
    anonymous: true,
  },
  {
    id: 'REP-1044',
    title: 'Harassment complaint - immediate attention needed',
    category: 'Harassment',
    status: 'reviewing',
    severity: 'high',
    submittedBy: 'John Smith',
    date: '2024-01-16',
    anonymous: false,
  },
  {
    id: 'REP-1043',
    title: 'Conflict of interest in procurement process',
    category: 'Conflict of Interest',
    status: 'new',
    severity: 'medium',
    submittedBy: 'Anonymous',
    date: '2024-01-15',
    anonymous: true,
  },
  {
    id: 'REP-1042',
    title: 'Data breach concern - IT Department',
    category: 'Data Privacy Violation',
    status: 'escalated',
    severity: 'high',
    submittedBy: 'Sarah Johnson',
    date: '2024-01-14',
    anonymous: false,
  },
  {
    id: 'REP-1041',
    title: 'Discrimination in hiring practices',
    category: 'Discrimination',
    status: 'pending',
    severity: 'medium',
    submittedBy: 'Anonymous',
    date: '2024-01-13',
    anonymous: true,
  },
];

const statusOptions = ['all', 'new', 'reviewing', 'pending', 'escalated', 'resolved', 'dismissed'];
const severityOptions = ['all', 'low', 'medium', 'high', 'critical'];

export default function ReviewReports() {
  const [filter, setFilter] = useState({ status: 'all', severity: 'all' });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = mockReports.filter(report => {
    if (filter.status !== 'all' && report.status !== filter.status) return false;
    if (filter.severity !== 'all' && report.severity !== filter.severity) return false;
    return true;
  });

  return (
    <div className="review-reports">
      <div className="page-header">
        <h1>Review Reports</h1>
        <p>Review and take action on submitted ethics reports</p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Severity:</label>
          <select
            value={filter.severity}
            onChange={(e) => setFilter(prev => ({ ...prev, severity: e.target.value }))}
          >
            {severityOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="filter-results">
          Showing {filteredReports.length} of {mockReports.length} reports
        </div>
      </div>

      <div className="reports-grid">
        <div className="reports-list-panel">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className={`report-item ${selectedReport?.id === report.id ? 'selected' : ''}`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="report-item-header">
                <span className="report-item-id">{report.id}</span>
                <span className={`severity-tag ${report.severity}`}>
                  {report.severity.toUpperCase()}
                </span>
              </div>
              <h4 className="report-item-title">{report.title}</h4>
              <div className="report-item-meta">
                <span>{report.category}</span>
                <span className={`status-tag ${report.status}`}>{report.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="report-detail-panel">
          {selectedReport ? (
            <div className="report-detail">
              <div className="detail-header">
                <h2>{selectedReport.title}</h2>
                <span className={`severity-badge ${selectedReport.severity}`}>
                  {selectedReport.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="detail-info">
                <div className="info-row">
                  <span className="info-label">Report ID:</span>
                  <span className="info-value">{selectedReport.id}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{selectedReport.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className={`status-tag ${selectedReport.status}`}>
                    {selectedReport.status}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Submitted By:</span>
                  <span className="info-value">
                    {selectedReport.anonymous ? '🔒 Anonymous' : selectedReport.submittedBy}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {new Date(selectedReport.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="detail-description">
                <h3>Description</h3>
                <p>
                  This is a placeholder for the detailed description of the report.
                  In a real application, this would contain the full report content
                  submitted by the employee, including any evidence or supporting
                  documentation.
                </p>
              </div>

              <div className="detail-actions">
                <button className="btn-action primary">Assign to Self</button>
                <button className="btn-action secondary">Escalate</button>
                <button className="btn-action success">Mark Resolved</button>
                <button className="btn-action danger">Dismiss</button>
              </div>

              <div className="add-note">
                <h3>Add Note</h3>
                <textarea placeholder="Add investigation notes..." rows={3} />
                <button className="btn-add-note">Save Note</button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a report from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
