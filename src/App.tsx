import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import VerifyPage from './pages/VerifyPage';
import RecordsPage from './pages/RecordsPage';
import Dashboard from './pages/Dashboard';
import AnimatedBackground from './components/AnimatedBackground';
import Toast from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 relative">
            <AnimatedBackground />
            <Navbar />
            <Toast />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/records" element={<RecordsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletProvider>
    </ToastProvider>
  );
}

export default App;
