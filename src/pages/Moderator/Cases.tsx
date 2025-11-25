import './Cases.css';

interface Case {
  id: string;
  title: string;
  status: 'active' | 'under_investigation' | 'pending_action' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  reportsCount: number;
  lastUpdated: string;
}

const mockCases: Case[] = [
  {
    id: 'CASE-2024-001',
    title: 'Systematic procurement fraud investigation',
    status: 'under_investigation',
    priority: 'critical',
    assignedTo: 'Jane Moderator',
    reportsCount: 3,
    lastUpdated: '2024-01-16',
  },
  {
    id: 'CASE-2024-002',
    title: 'Workplace harassment - Marketing Department',
    status: 'active',
    priority: 'high',
    assignedTo: 'Jane Moderator',
    reportsCount: 2,
    lastUpdated: '2024-01-15',
  },
  {
    id: 'CASE-2024-003',
    title: 'Data privacy violation assessment',
    status: 'pending_action',
    priority: 'high',
    assignedTo: 'Mark Wilson',
    reportsCount: 1,
    lastUpdated: '2024-01-14',
  },
  {
    id: 'CASE-2023-045',
    title: 'Conflict of interest - Executive level',
    status: 'closed',
    priority: 'medium',
    assignedTo: 'Jane Moderator',
    reportsCount: 4,
    lastUpdated: '2024-01-10',
  },
];

const statusLabels: Record<string, string> = {
  active: 'Active',
  under_investigation: 'Under Investigation',
  pending_action: 'Pending Action',
  closed: 'Closed',
};

export default function ManageCases() {
  return (
    <div className="manage-cases">
      <div className="page-header">
        <div className="header-content">
          <h1>Manage Cases</h1>
          <p>Track and manage ongoing ethics investigation cases</p>
        </div>
        <button className="btn-new-case">+ Create New Case</button>
      </div>

      <div className="cases-stats">
        <div className="case-stat">
          <span className="stat-number">4</span>
          <span className="stat-label">Active Cases</span>
        </div>
        <div className="case-stat">
          <span className="stat-number">2</span>
          <span className="stat-label">Under Investigation</span>
        </div>
        <div className="case-stat">
          <span className="stat-number">1</span>
          <span className="stat-label">Pending Action</span>
        </div>
        <div className="case-stat">
          <span className="stat-number">12</span>
          <span className="stat-label">Closed This Month</span>
        </div>
      </div>

      <div className="cases-list">
        {mockCases.map(caseItem => (
          <div key={caseItem.id} className="case-card">
            <div className="case-header">
              <div className="case-id">{caseItem.id}</div>
              <span className={`case-priority ${caseItem.priority}`}>
                {caseItem.priority.toUpperCase()}
              </span>
            </div>
            
            <h3 className="case-title">{caseItem.title}</h3>
            
            <div className="case-status">
              <span className={`status-indicator ${caseItem.status}`}>
                {statusLabels[caseItem.status]}
              </span>
            </div>

            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-icon">👤</span>
                <span>{caseItem.assignedTo}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📋</span>
                <span>{caseItem.reportsCount} linked report(s)</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🕐</span>
                <span>Updated {new Date(caseItem.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="case-actions">
              <button className="btn-case view">View Details</button>
              <button className="btn-case edit">Edit Case</button>
              {caseItem.status !== 'closed' && (
                <button className="btn-case close">Close Case</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
