import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import VerifyPage from './pages/VerifyPage';
import RecordsPage from './pages/RecordsPage';
import Dashboard from './pages/Dashboard';
import Toast from './components/Toast';

// Dashboard Layout Component
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <div className="content-wrap">
          {children}
        </div>
      </main>
    </div>
  );
};

// App Content Component
const AppContent: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isLandingPage || isAuthPage) {
    return (
      <>
        <Toast />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Toast />
      <DashboardLayout>
        <Routes>
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/records" element={
            <ProtectedRoute>
              <RecordsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </DashboardLayout>
    </>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WalletProvider>
          <Router>
            <div className="min-h-screen">
              <AppContent />
            </div>
          </Router>
        </WalletProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
