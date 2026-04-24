import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isWalletConnected, publicKey, connectWallet, disconnectWallet, isTestMode } = useWallet();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div>
        <h2>🛡️ DataGuard</h2>
        
        <nav>
          <Link 
            to="/dashboard" 
            className={`sidebar button ${isActive('/dashboard') ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            🏠 Dashboard
          </Link>
          <Link 
            to="/upload" 
            className={`sidebar button ${isActive('/upload') ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            📤 Upload Data
          </Link>
          <Link 
            to="/verify" 
            className={`sidebar button ${isActive('/verify') ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            ✅ Verify Data
          </Link>
          <Link 
            to="/records" 
            className={`sidebar button ${isActive('/records') ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            📑 My Records
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        {/* User Info */}
        {user && (
          <div className="card p-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">👤</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>
        )}

        {isTestMode && (
          <div className="status-indicator status-warning text-center">
            ⚠️ Test Mode
          </div>
        )}
        
        {isWalletConnected ? (
          <div className="flex flex-col gap-2">
            <div className="wallet-address-box text-center">
              <div className="wallet-address-row justify-center">
                <span className="wallet-address-text">{formatAddress(publicKey!)}</span>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="btn-secondary text-sm w-full"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="btn-primary w-full"
          >
            Connect Wallet
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn-secondary w-full text-sm"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;