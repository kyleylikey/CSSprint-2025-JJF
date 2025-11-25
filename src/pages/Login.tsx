import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      // Redirect based on role
      if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (email.includes('moderator')) {
        navigate('/moderator/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🛡️ Ethics Monitor</h1>
          <p>Corporate Integrity Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="demo-accounts">
          <h3>Demo Accounts</h3>
          <div className="account-list">
            <div className="account-item">
              <strong>Employee:</strong> employee@company.com
            </div>
            <div className="account-item">
              <strong>Moderator (HR):</strong> moderator@company.com
            </div>
            <div className="account-item">
              <strong>Admin:</strong> admin@company.com
            </div>
            <div className="account-item">
              <em>Password for all: password123</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
