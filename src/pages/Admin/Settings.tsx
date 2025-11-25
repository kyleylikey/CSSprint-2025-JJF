import { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    anonymousReporting: true,
    autoEscalation: true,
    escalationDays: 3,
    retentionDays: 365,
    twoFactorAuth: false,
  });

  const handleChange = (name: string, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings">
      <div className="page-header">
        <h1>System Settings</h1>
        <p>Configure system parameters and preferences</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2>🔔 Notifications</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Email Notifications</h3>
              <p>Send email notifications for new reports and updates</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>📝 Reporting Options</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Anonymous Reporting</h3>
              <p>Allow employees to submit reports anonymously</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.anonymousReporting}
                onChange={(e) => handleChange('anonymousReporting', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Auto-Escalation</h3>
              <p>Automatically escalate reports that haven't been reviewed</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.autoEscalation}
                onChange={(e) => handleChange('autoEscalation', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.autoEscalation && (
            <div className="setting-item nested">
              <div className="setting-info">
                <h3>Escalation Threshold</h3>
                <p>Days before unreviewed reports are automatically escalated</p>
              </div>
              <div className="number-input">
                <button onClick={() => handleChange('escalationDays', Math.max(1, settings.escalationDays - 1))}>-</button>
                <span>{settings.escalationDays} days</span>
                <button onClick={() => handleChange('escalationDays', settings.escalationDays + 1)}>+</button>
              </div>
            </div>
          )}
        </div>

        <div className="settings-section">
          <h2>🔒 Security</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Two-Factor Authentication</h3>
              <p>Require 2FA for all admin users</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>📦 Data Management</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Data Retention Period</h3>
              <p>How long to retain resolved case data</p>
            </div>
            <select
              value={settings.retentionDays}
              onChange={(e) => handleChange('retentionDays', parseInt(e.target.value))}
            >
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
              <option value={730}>2 years</option>
              <option value={1825}>5 years</option>
            </select>
          </div>

          <div className="danger-zone">
            <h3>⚠️ Danger Zone</h3>
            <div className="danger-actions">
              <button className="btn-danger-outline">Export All Data</button>
              <button className="btn-danger">Purge Old Records</button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
