import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';

const LandingPage: React.FC = () => {
  const { isWalletConnected, connectWallet, disconnectWallet, publicKey } = useWallet();
  const { addToast } = useToast();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      addToast('Wallet address copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-2xl">🛡️</span>
                <span className="text-2xl font-bold text-gradient">DataGuard</span>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              {isWalletConnected ? (
                <>
                  <div 
                    className="wallet-address-box cursor-pointer"
                    onClick={copyAddress}
                    title="Click to copy wallet address"
                  >
                    <div className="wallet-address-row">
                      <span className="wallet-address-text">{formatAddress(publicKey!)}</span>
                      <span className="text-xs opacity-75">📋</span>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="btn-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={disconnectWallet}
                    className="btn-secondary"
                    title="Disconnect Wallet"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={connectWallet}
                    className="btn-primary ml-2"
                  >
                    Connect Wallet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="content-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              DataGuard
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light mb-8">
              Blockchain-Powered Data Protection
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Secure your sensitive data with tamper-proof blockchain technology. 
              Store, verify, and manage files with cryptographic security on the Stellar network.
            </p>
          </div>

          <div className="button-container">
            {isWalletConnected ? (
              <Link
                to="/upload"
                className="landing-btn-primary"
              >
                Start Protecting Data
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="landing-btn-primary"
                >
                  Get Started Free
                </Link>
                <button
                  onClick={connectWallet}
                  className="landing-btn-secondary"
                >
                  Connect Wallet
                </button>
              </>
            )}
            <Link
              to="/verify"
              className="landing-btn-secondary"
            >
              Verify Data
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Files Protected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0.01</div>
              <div className="stat-label">XLM per Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-section white">
        <div className="section-content">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose DataGuard?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced blockchain security meets user-friendly design
            </p>
          </div>

          <div className="feature-grid">
            {[
              {
                icon: '🔒',
                title: 'Tamper-Proof Security',
                description: 'Your data hashes are stored immutably on the Stellar blockchain, ensuring complete integrity protection.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Verify data integrity in seconds with minimal blockchain fees using Stellar\'s efficient network.'
              },
              {
                icon: '🛡️',
                title: 'Privacy Protected',
                description: 'Only cryptographic hashes are stored on-chain, keeping your sensitive data completely private.'
              },
              {
                icon: '📊',
                title: 'Complete Audit Trail',
                description: 'Track all data modifications with immutable blockchain records and comprehensive analytics.'
              },
              {
                icon: '🌐',
                title: 'Global Access',
                description: 'Access your protected data from anywhere in the world with just your Stellar wallet.'
              },
              {
                icon: '💰',
                title: 'Low Cost',
                description: 'Minimal transaction fees (0.01 XLM per record) make data protection affordable for everyone.'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section gray">
        <div className="section-content">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to ultimate data security
            </p>
          </div>

          <div className="step-grid">
            {[
              {
                step: '01',
                title: 'Upload Your Data',
                description: 'Select your file and provide metadata. We generate a cryptographic hash of your data.',
                icon: '📤'
              },
              {
                step: '02',
                title: 'Blockchain Storage',
                description: 'The hash is stored immutably on Stellar blockchain via our smart contract.',
                icon: '⛓️'
              },
              {
                step: '03',
                title: 'Verify Anytime',
                description: 'Use your Record ID to verify data integrity and detect any tampering instantly.',
                icon: '✅'
              }
            ].map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">
                  <span>{step.icon}</span>
                  <div className="step-number">{step.step}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="landing-section white">
        <div className="section-content">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Built on Stellar Blockchain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging cutting-edge technology for maximum security and efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Stellar Network?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fast Transactions</h4>
                    <p className="text-gray-600">3-5 second confirmation times</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Low Fees</h4>
                    <p className="text-gray-600">Fractions of a penny per transaction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Contracts</h4>
                    <p className="text-gray-600">Soroban smart contracts in Rust</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Eco-Friendly</h4>
                    <p className="text-gray-600">Energy-efficient consensus mechanism</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Technical Specifications
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blockchain</span>
                  <span className="font-semibold text-gray-900">Stellar Network</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Smart Contracts</span>
                  <span className="font-semibold text-gray-900">Soroban (Rust)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hashing Algorithm</span>
                  <span className="font-semibold text-gray-900">SHA-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-semibold text-gray-900">Testnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Fee</span>
                  <span className="font-semibold text-gray-900">0.01 XLM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-section dark">
        <div className="content-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Data?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join hundreds of users protecting their data with blockchain technology. 
              Start securing your files today.
            </p>
            
            <div className="button-container">
              {isWalletConnected ? (
                <Link
                  to="/upload"
                  className="landing-btn-primary"
                >
                  Start Now
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="landing-btn-primary"
                >
                  Get Started Free
                </Link>
              )}
              
              <Link
                to="/verify"
                className="landing-btn-secondary"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;