import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">⚖️ JJF</Link>
      </div>
      
      <div className="navbar-links">
        {user?.role === 'employee' && (
          <>
            <Link to="/employee/dashboard">Dashboard</Link>
            <Link to="/employee/report">Submit Report</Link>
            <Link to="/employee/my-reports">My Reports</Link>
          </>
        )}
        
        {user?.role === 'moderator' && (
          <>
            <Link to="/moderator/dashboard">Dashboard</Link>
            <Link to="/moderator/reports">Review Reports</Link>
            <Link to="/moderator/cases">Manage Cases</Link>
          </>
        )}
        
        {user?.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">User Management</Link>
            <Link to="/admin/analytics">Analytics</Link>
            <Link to="/admin/settings">Settings</Link>
          </>
        )}
      </div>
      
      <div className="navbar-user">
        <span className="user-info">
          {user?.name} ({user?.role})
        </span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
