import './Analytics.css';

export default function Analytics() {
  return (
    <div className="analytics">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive overview of ethics reporting trends and metrics</p>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Reports</h3>
          <span className="summary-value">847</span>
          <span className="summary-change positive">+12% from last month</span>
        </div>
        <div className="summary-card">
          <h3>Avg Resolution Time</h3>
          <span className="summary-value">3.2 days</span>
          <span className="summary-change positive">-0.5 days improvement</span>
        </div>
        <div className="summary-card">
          <h3>Resolution Rate</h3>
          <span className="summary-value">94%</span>
          <span className="summary-change positive">+2% from last month</span>
        </div>
        <div className="summary-card">
          <h3>Anonymous Reports</h3>
          <span className="summary-value">62%</span>
          <span className="summary-change neutral">No change</span>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <h2>📊 Reports by Category</h2>
          <div className="category-chart">
            <div className="chart-bar">
              <div className="bar-label">Harassment</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '75%' }}></div>
              </div>
              <span className="bar-count">156</span>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Fraud</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '60%' }}></div>
              </div>
              <span className="bar-count">124</span>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Discrimination</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '45%' }}></div>
              </div>
              <span className="bar-count">93</span>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Safety Violations</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '35%' }}></div>
              </div>
              <span className="bar-count">72</span>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Conflict of Interest</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '28%' }}></div>
              </div>
              <span className="bar-count">58</span>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Other</div>
              <div className="bar-track">
                <div className="bar-value" style={{ width: '40%' }}></div>
              </div>
              <span className="bar-count">84</span>
            </div>
          </div>
        </div>

        <div className="analytics-section">
          <h2>📈 Monthly Trend</h2>
          <div className="trend-chart">
            <div className="trend-bars">
              <div className="trend-bar" style={{ height: '60%' }}>
                <span className="trend-value">65</span>
              </div>
              <div className="trend-bar" style={{ height: '45%' }}>
                <span className="trend-value">48</span>
              </div>
              <div className="trend-bar" style={{ height: '70%' }}>
                <span className="trend-value">75</span>
              </div>
              <div className="trend-bar" style={{ height: '55%' }}>
                <span className="trend-value">58</span>
              </div>
              <div className="trend-bar" style={{ height: '80%' }}>
                <span className="trend-value">84</span>
              </div>
              <div className="trend-bar active" style={{ height: '85%' }}>
                <span className="trend-value">89</span>
              </div>
            </div>
            <div className="trend-labels">
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <h2>⚡ Report Status Distribution</h2>
          <div className="status-distribution">
            <div className="status-item">
              <div className="status-color new"></div>
              <span className="status-label">New</span>
              <span className="status-count">45</span>
              <span className="status-percent">5%</span>
            </div>
            <div className="status-item">
              <div className="status-color reviewing"></div>
              <span className="status-label">Under Review</span>
              <span className="status-count">78</span>
              <span className="status-percent">9%</span>
            </div>
            <div className="status-item">
              <div className="status-color pending"></div>
              <span className="status-label">Pending Action</span>
              <span className="status-count">34</span>
              <span className="status-percent">4%</span>
            </div>
            <div className="status-item">
              <div className="status-color resolved"></div>
              <span className="status-label">Resolved</span>
              <span className="status-count">650</span>
              <span className="status-percent">77%</span>
            </div>
            <div className="status-item">
              <div className="status-color dismissed"></div>
              <span className="status-label">Dismissed</span>
              <span className="status-count">40</span>
              <span className="status-percent">5%</span>
            </div>
          </div>
        </div>

        <div className="analytics-section">
          <h2>🏢 Top Reporting Departments</h2>
          <div className="department-list">
            <div className="department-item">
              <span className="dept-rank">1</span>
              <span className="dept-name">Engineering</span>
              <span className="dept-count">156 reports</span>
            </div>
            <div className="department-item">
              <span className="dept-rank">2</span>
              <span className="dept-name">Sales</span>
              <span className="dept-count">124 reports</span>
            </div>
            <div className="department-item">
              <span className="dept-rank">3</span>
              <span className="dept-name">Marketing</span>
              <span className="dept-count">98 reports</span>
            </div>
            <div className="department-item">
              <span className="dept-rank">4</span>
              <span className="dept-name">Operations</span>
              <span className="dept-count">87 reports</span>
            </div>
            <div className="department-item">
              <span className="dept-rank">5</span>
              <span className="dept-name">Finance</span>
              <span className="dept-count">76 reports</span>
            </div>
          </div>
        </div>
      </div>

      <div className="export-section">
        <button className="btn-export">📥 Export Report (PDF)</button>
        <button className="btn-export secondary">📊 Export Data (CSV)</button>
      </div>
    </div>
  );
}
