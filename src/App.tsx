import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
import Logg from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Fill from './pages/Fill';
// import DashboardPage from './pages/DashboardPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ReportEmergencyPage from './pages/ReportEmergencyPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './components/ThemeProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/login" element={<Logg />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            {/* <Route path="dashboard" element={<DashboardPage />} /> */}
            <Route path="guidelines" element={<GuidelinesPage />} />
            <Route path="report" element={<ReportEmergencyPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="fill" element={<Fill />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
