import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import EmployeeDashboard from './pages/Employee/Dashboard';
import SubmitReport from './pages/Employee/Report';
import MyReports from './pages/Employee/MyReports';
import ModeratorDashboard from './pages/Moderator/Dashboard';
import ReviewReports from './pages/Moderator/Reports';
import ManageCases from './pages/Moderator/Cases';
import AdminDashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/Users';
import Analytics from './pages/Admin/Analytics';
import Settings from './pages/Admin/Settings';
import './App.css';

// Protected Route Component
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: string[];
}) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'employee') return <Navigate to="/employee/dashboard" replace />;
    if (user.role === 'moderator') return <Navigate to="/moderator/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to={`/${user?.role}/dashboard`} replace />
            ) : (
              <Login />
            )
          } />

          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/employee/report" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <SubmitReport />
            </ProtectedRoute>
          } />
          <Route path="/employee/my-reports" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <MyReports />
            </ProtectedRoute>
          } />

          {/* Moderator Routes */}
          <Route path="/moderator/dashboard" element={
            <ProtectedRoute allowedRoles={['moderator']}>
              <ModeratorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/moderator/reports" element={
            <ProtectedRoute allowedRoles={['moderator']}>
              <ReviewReports />
            </ProtectedRoute>
          } />
          <Route path="/moderator/cases" element={
            <ProtectedRoute allowedRoles={['moderator']}>
              <ManageCases />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReportProvider>
          <AppRoutes />
        </ReportProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
