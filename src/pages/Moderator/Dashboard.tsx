import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

export default function ModeratorDashboard() {
  const { user } = useAuth();

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
            <h3>5</h3>
            <p>Urgent Cases</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <div className="stat-content">
            <h3>12</h3>
            <p>New Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>8</h3>
            <p>Under Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>34</h3>
            <p>Resolved This Month</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="content-section urgent-reports">
          <h2>⚠️ Urgent Reports Requiring Action</h2>
          <div className="urgent-list">
            <div className="urgent-item">
              <span className="priority-badge critical">CRITICAL</span>
              <div className="urgent-content">
                <h4>Financial fraud allegation in Accounting</h4>
                <p>Submitted 2 hours ago • REP-1045</p>
              </div>
              <button className="btn-review">Review Now</button>
            </div>
            <div className="urgent-item">
              <span className="priority-badge high">HIGH</span>
              <div className="urgent-content">
                <h4>Harassment complaint - immediate attention needed</h4>
                <p>Submitted 5 hours ago • REP-1044</p>
              </div>
              <button className="btn-review">Review Now</button>
            </div>
            <div className="urgent-item">
              <span className="priority-badge high">HIGH</span>
              <div className="urgent-content">
                <h4>Data breach concern - IT Department</h4>
                <p>Submitted 1 day ago • REP-1042</p>
              </div>
              <button className="btn-review">Review Now</button>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>📊 Quick Stats</h2>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="stat-label">Avg. Resolution Time</span>
              <span className="stat-value">3.2 days</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Reports This Week</span>
              <span className="stat-value">18</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Resolution Rate</span>
              <span className="stat-value">94%</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Pending Escalations</span>
              <span className="stat-value">3</span>
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
                <tr>
                  <td>REP-1043</td>
                  <td>Conflict of Interest</td>
                  <td><span className="status new">New</span></td>
                  <td>Today</td>
                  <td><button className="table-action">View</button></td>
                </tr>
                <tr>
                  <td>REP-1041</td>
                  <td>Discrimination</td>
                  <td><span className="status reviewing">Reviewing</span></td>
                  <td>Yesterday</td>
                  <td><button className="table-action">View</button></td>
                </tr>
                <tr>
                  <td>REP-1040</td>
                  <td>Safety Violation</td>
                  <td><span className="status pending">Pending</span></td>
                  <td>2 days ago</td>
                  <td><button className="table-action">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
