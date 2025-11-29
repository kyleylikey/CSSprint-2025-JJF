import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import type { Report, ReportStatus } from '../../context/ReportContext';
import './Reports.css';

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

const statusOptions = ['all', 'new', 'reviewing', 'pending', 'escalated', 'resolved', 'dismissed'];
const severityOptions = ['all', 'low', 'medium', 'high', 'critical'];

export default function ReviewReports() {
  const { user } = useAuth();
  const { reports, updateReportStatus, assignReport, addNote } = useReports();
  const [filter, setFilter] = useState({ status: 'all', severity: 'all' });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [noteText, setNoteText] = useState('');

  const filteredReports = reports.filter(report => {
    if (filter.status !== 'all' && report.status !== filter.status) return false;
    if (filter.severity !== 'all' && report.severity !== filter.severity) return false;
    return true;
  });

  const handleAssignToSelf = () => {
    if (selectedReport && user) {
      assignReport(selectedReport.id, user.id);
    }
  };

  const handleStatusChange = (status: ReportStatus) => {
    if (selectedReport) {
      updateReportStatus(selectedReport.id, status);
    }
  };

  const handleAddNote = () => {
    if (selectedReport && noteText.trim() && user) {
      addNote(selectedReport.id, {
        author: user.name,
        content: noteText,
      });
      setNoteText('');
    }
  };

  // Keep selected report in sync with reports state
  const currentSelectedReport = selectedReport 
    ? reports.find(r => r.id === selectedReport.id) || selectedReport
    : null;

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
          Showing {filteredReports.length} of {reports.length} reports
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
                <span>{categoryLabels[report.category] || report.category}</span>
                <span className={`status-tag ${report.status}`}>{report.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="report-detail-panel">
          {currentSelectedReport ? (
            <div className="report-detail">
              <div className="detail-header">
                <h2>{currentSelectedReport.title}</h2>
                <span className={`severity-badge ${currentSelectedReport.severity}`}>
                  {currentSelectedReport.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="detail-info">
                <div className="info-row">
                  <span className="info-label">Report ID:</span>
                  <span className="info-value">{currentSelectedReport.id}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{categoryLabels[currentSelectedReport.category] || currentSelectedReport.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className={`status-tag ${currentSelectedReport.status}`}>
                    {currentSelectedReport.status}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Submitted By:</span>
                  <span className="info-value">
                    {currentSelectedReport.anonymous ? '🔒 Anonymous' : currentSelectedReport.submittedBy}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {new Date(currentSelectedReport.date).toLocaleDateString()}
                  </span>
                </div>
                {currentSelectedReport.incidentDate && (
                  <div className="info-row">
                    <span className="info-label">Incident Date:</span>
                    <span className="info-value">
                      {new Date(currentSelectedReport.incidentDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {currentSelectedReport.involvedParties && (
                  <div className="info-row">
                    <span className="info-label">Involved Parties:</span>
                    <span className="info-value">{currentSelectedReport.involvedParties}</span>
                  </div>
                )}
              </div>

              <div className="detail-description">
                <h3>Description</h3>
                <p>{currentSelectedReport.description}</p>
              </div>

              {currentSelectedReport.evidence && (
                <div className="detail-description">
                  <h3>Evidence</h3>
                  <p>{currentSelectedReport.evidence}</p>
                </div>
              )}

              <div className="detail-actions">
                <button 
                  className="btn-action primary"
                  onClick={handleAssignToSelf}
                  disabled={currentSelectedReport.status === 'resolved' || currentSelectedReport.status === 'dismissed'}
                >
                  Assign to Self
                </button>
                <button 
                  className="btn-action secondary"
                  onClick={() => handleStatusChange('escalated')}
                  disabled={currentSelectedReport.status === 'resolved' || currentSelectedReport.status === 'dismissed'}
                >
                  Escalate
                </button>
                <button 
                  className="btn-action success"
                  onClick={() => handleStatusChange('resolved')}
                  disabled={currentSelectedReport.status === 'resolved' || currentSelectedReport.status === 'dismissed'}
                >
                  Mark Resolved
                </button>
                <button 
                  className="btn-action danger"
                  onClick={() => handleStatusChange('dismissed')}
                  disabled={currentSelectedReport.status === 'resolved' || currentSelectedReport.status === 'dismissed'}
                >
                  Dismiss
                </button>
              </div>

              {currentSelectedReport.notes.length > 0 && (
                <div className="notes-section">
                  <h3>Investigation Notes</h3>
                  {currentSelectedReport.notes.map(note => (
                    <div key={note.id} className="note-item">
                      <div className="note-header">
                        <strong>{note.author}</strong>
                        <span className="note-time">
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-note">
                <h3>Add Note</h3>
                <textarea 
                  placeholder="Add investigation notes..." 
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <button 
                  className="btn-add-note"
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                >
                  Save Note
                </button>
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
