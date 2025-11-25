import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.css';

export default function SubmitReport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    severity: '',
    title: '',
    description: '',
    involvedParties: '',
    date: '',
    anonymous: false,
    evidence: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate reference number when submitted
    setReferenceNumber(`#REP-${Math.floor(Math.random() * 900000 + 100000)}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="report-page">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Report Submitted Successfully</h2>
          <p>Your report has been submitted and will be reviewed by our ethics team.</p>
          <p>Reference Number: <strong>{referenceNumber}</strong></p>
          <button onClick={() => navigate('/employee/dashboard')} className="btn-primary">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-header">
        <h1>Submit Ethics Report</h1>
        <p>Report concerns about unethical behavior confidentially and securely</p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <h2>Report Details</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="harassment">Harassment</option>
                <option value="discrimination">Discrimination</option>
                <option value="fraud">Fraud / Financial Misconduct</option>
                <option value="corruption">Corruption / Bribery</option>
                <option value="safety">Health & Safety Violation</option>
                <option value="conflict">Conflict of Interest</option>
                <option value="data">Data Privacy Violation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="severity">Severity Level *</label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="">Select severity</option>
                <option value="low">Low - Minor concern</option>
                <option value="medium">Medium - Moderate concern</option>
                <option value="high">High - Serious violation</option>
                <option value="critical">Critical - Immediate action needed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="title">Report Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of the concern"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide a detailed description of the incident or concern..."
              rows={6}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Additional Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="involvedParties">Involved Parties</label>
              <input
                type="text"
                id="involvedParties"
                name="involvedParties"
                value={formData.involvedParties}
                onChange={handleChange}
                placeholder="Names or departments involved (optional)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date of Incident</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="evidence">Supporting Evidence</label>
            <textarea
              id="evidence"
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              placeholder="Describe any evidence, documents, or witnesses that support your report..."
              rows={3}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Submission Options</h2>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span>Submit anonymously</span>
            </label>
            <p className="help-text">
              Your identity will be protected. However, providing contact information may help investigators follow up if needed.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
