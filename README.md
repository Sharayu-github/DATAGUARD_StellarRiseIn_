# DataGuard - Blockchain Data Protection Platform

🛡️ **DataGuard** is a cutting-edge data protection platform built on Stellar blockchain with Soroban smart contracts and Freighter wallet integration. It ensures your sensitive data is tamper-proof, privacy-protected, and instantly verifiable through cryptographic hashing and immutable blockchain storage.

## 🌐 Live Demo

- **Production**: [https://dataguard-stellar.vercel.app](https://dataguard-stellar.vercel.app)
- **GitHub**: [https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_](https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_)
- **Smart Contract**: `PLACEHOLDER_CONTRACT_ID` (Will be updated after deployment)
- **Contract Explorer**: [Stellar Expert](https://stellar.expert/explorer/testnet/contract/PLACEHOLDER_CONTRACT_ID)

## 🔗 Quick Links

### Application
- **Live Demo**: [https://dataguard-stellar.vercel.app](https://dataguard-stellar.vercel.app)
- **GitHub Repository**: [https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_](https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_)
- **Vercel Dashboard**: [Vercel Project](https://vercel.com/dashboard)

### Smart Contract
- **Contract ID**: `PLACEHOLDER_CONTRACT_ID`
- **Stellar Expert**: [Contract Explorer](https://stellar.expert/explorer/testnet/contract/PLACEHOLDER_CONTRACT_ID)
- **Stellar Laboratory**: [Contract Interface](https://laboratory.stellar.org/#explorer?resource=contracts&endpoint=single&network=test)
- **Contract Source Code**: `contracts/src/lib.rs`

### Documentation
- **Contract Documentation**: `contracts/README.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **API Documentation**: `API.md`

## 🌟 Features

### Core Data Protection Features
- 🔒 **Tamper-Proof Records**: Data hashes stored immutably on Stellar blockchain via Soroban smart contracts
- 🛡️ **Privacy Protected**: Only cryptographic hashes stored on-chain, protecting sensitive data
- ✅ **Instant Verification**: Verify data integrity in seconds through smart contract calls
- 📊 **Multi-Category Support**: Works with documents, images, videos, code, and any file type
- 🔐 **Ownership Control**: Only authorized users can upload and manage their records
- 📈 **Analytics Dashboard**: Real-time statistics and insights for users
- 🔍 **Audit Trail**: Complete history of data modifications tracked on blockchain

### Blockchain & Smart Contract Features
- ⛓️ **Stellar Network**: Built on Stellar blockchain for fast, low-cost transactions
- 🤖 **Soroban Smart Contracts**: Rust-based smart contracts for secure data management
- 👛 **Freighter Wallet**: Seamless wallet connection and transaction signing
- 🌐 **Testnet Ready**: Development on official Stellar testnet network
- 🔄 **User Management**: Smart contract-based user registration and management
- 💰 **Low Fees**: Minimal transaction costs (0.01 XLM per record)
- 🛡️ **Emergency Controls**: Admin functions for contract management and security

### Technical Features
- 🎨 **Professional UI**: Modern, responsive design optimized for data protection workflows
- 🚀 **Fast Performance**: Lightning-fast verification with minimal blockchain fees
- 🔍 **Advanced Search**: Find records by ID, type, category, or metadata
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🌍 **Global CDN**: Deployed on Vercel with worldwide edge distribution
- 🔒 **Security Headers**: XSS protection, content security, and HTTPS enforcement

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for professional design
- **React Router**: Client-side routing for single-page application
- **Axios**: HTTP client for API communication
- **Freighter API**: Stellar wallet integration
- **CryptoJS**: SHA-256 hashing for file integrity

### Blockchain & Smart Contracts
- **Stellar Network**: Blockchain platform for data records
- **Soroban**: Rust-based smart contract platform
- **Smart Contract Features**:
  - Data record hash storage
  - User registration and management
  - Record verification and integrity checking
  - Access control and permissions
  - Emergency admin controls
  - Complete audit trail
- **Freighter Wallet**: Browser extension wallet for Stellar
- **Testnet**: Development and testing environment

### Deployment & Infrastructure
- **Vercel**: Global CDN deployment platform
- **GitHub**: Version control and CI/CD integration
- **Automatic Deployments**: Connected to GitHub for seamless updates
- **SSL/HTTPS**: Automatic certificate management
- **Security Headers**: XSS protection and content security policies

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- Freighter Wallet browser extension (optional for development)
- Git 2.0 or higher
- Rust and Cargo (for smart contract development)

### 1. Clone the Repository
```bash
git clone https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_.git
cd DATAGUARD_StellarRiseIn_/dataguard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file in root:
```env
VITE_APP_NAME=DataGuard
VITE_STELLAR_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_CONTRACT_ID=PLACEHOLDER_CONTRACT_ID
VITE_FREIGHTER_ENABLED=true
```

### 4. Start the Application
```bash
# Development mode
npm run dev

# Application will be available at:
# Frontend: http://localhost:3000
```

### 5. Wallet Connection

**Option A: Development (TEST MODE)**
- App loads automatically with a mock wallet
- You'll see: "⚠️ TEST MODE"
- All features work for testing
- No Freighter installation required

**Option B: Production (Real Wallet)**
- Install Freighter browser extension
- Create/import Stellar testnet account
- Fund account from [Friendbot](https://laboratory.stellar.org/#account-creator?network=test)
- App auto-detects and connects to Freighter

## 📖 How to Use

### 1. Upload Data for Protection
1. Navigate to "Upload Data" page
2. Fill in title and description
3. Select data category (Document, Image, Video, etc.)
4. Upload your file
5. Click "Protect Data on Blockchain"
6. Confirm transaction in Freighter wallet
7. Receive Record ID for future verification

### 2. Verify Data Integrity
1. Go to "Verify Data" page
2. Enter the Record ID
3. Upload the file to verify
4. Click "Verify Data Integrity"
5. View verification results:
   - ✅ **Verified**: File is authentic and unmodified
   - ❌ **Failed**: File has been tampered with or modified

### 3. Browse Records
1. Visit "My Records" to see your protected data
2. Use "All Records" to browse public record metadata
3. Search by Record ID, title, or category
4. Filter by data type or category
5. View detailed record information and blockchain transaction

### 4. Analytics Dashboard
1. Access "Dashboard" for comprehensive analytics
2. View your record statistics and activity
3. See records by type and category
4. Monitor upload trends
5. Track platform-wide statistics

## 🏗️ Project Structure

```
dataguard/
├── src/                          # React frontend
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation with wallet connection
│   │   ├── AnimatedBackground.tsx # Security-themed background
│   │   └── Toast.tsx            # Notification system
│   ├── pages/
│   │   ├── LandingPage.tsx      # Homepage with features
│   │   ├── UploadPage.tsx       # Data upload interface
│   │   ├── VerifyPage.tsx       # Data verification
│   │   ├── RecordsPage.tsx      # Browse all records
│   │   └── Dashboard.tsx        # Analytics dashboard
│   ├── context/
│   │   ├── WalletContext.tsx    # Wallet state management
│   │   └── ToastContext.tsx     # Notification context
│   ├── services/
│   │   ├── contractService.ts   # Smart contract operations
│   │   └── hashService.ts       # SHA-256 file hashing
│   └── App.tsx                  # Main application component
│
├── contracts/                    # Soroban Smart Contracts
│   ├── src/
│   │   ├── lib.rs              # Main smart contract code
│   │   └── main.rs             # Binary target
│   ├── Cargo.toml              # Rust dependencies
│   ├── deploy.sh               # Deployment script
│   └── README.md               # Contract documentation
│
├── .github/workflows/           # CI/CD Pipeline
│   └── ci-cd.yml               # GitHub Actions workflow
│
├── vercel.json                  # Vercel deployment config
├── .env.production             # Production environment variables
├── package.json                # Frontend dependencies
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # This file
```

## 🔒 Security Features

- **SHA-256 Hashing**: Cryptographically secure file integrity verification
- **Privacy Protection**: Only hashes stored on blockchain, not sensitive data
- **Smart Contract Security**: Rust-based contracts with access control and validation
- **User Registration**: Only registered users can store records
- **Ownership Verification**: Only record owners can modify their data
- **Immutable Records**: Blockchain prevents tampering with verification data
- **Emergency Controls**: Admin functions for contract pause and management
- **Input Validation**: Comprehensive data validation and sanitization
- **HTTPS Enforcement**: Automatic SSL certificates and secure connections
- **Security Headers**: XSS protection, content security policies, and frame options

## 🤖 Smart Contract Integration

### Contract Features
- **Data Record Storage**: Store SHA-256 hashes of files on blockchain
- **User Management**: Register and manage users
- **Access Control**: Only registered users can store records
- **Record Verification**: Verify file integrity by comparing hashes
- **Audit Trail**: Complete history of all record operations
- **Emergency Controls**: Admin functions for contract management

### Contract Functions

#### Core Functions
```rust
// Store a new data record
store_record(record_id, file_hash, owner, title, category, file_size, metadata) -> bool

// Verify record integrity
verify_record(record_id, file_hash) -> bool

// Get record information
get_record(record_id) -> Option<DataRecord>
```

#### Query Functions
```rust
// Get all records for a user
get_user_records(owner) -> Vec<DataRecord>

// Get all records (public view)
get_all_records() -> Vec<DataRecord>

// Get contract statistics
get_stats() -> ContractStats
```

### Contract Deployment Status
- **Status**: Ready for deployment
- **Network**: Stellar Testnet
- **Language**: Rust (Soroban)
- **Features**: Complete data management system
- **Security**: Access control, input validation, emergency controls

## 🌐 API Endpoints

### Data Records
- `POST /api/records/upload` - Upload new data record
- `POST /api/records/verify` - Verify record integrity
- `GET /api/records/:recordId` - Get specific record details
- `GET /api/records/user/:walletAddress` - Get user's records
- `GET /api/records` - Get all records (paginated)

### Analytics
- `GET /api/analytics/:walletAddress` - Get user analytics
- `GET /api/analytics` - Get system-wide statistics

### Blockchain
- `POST /api/blockchain/submit` - Submit transaction to blockchain
- `GET /api/blockchain/status/:txHash` - Get transaction status

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/DATAGUARD_StellarRiseIn_.git
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Environment Variables**
   ```env
   VITE_STELLAR_NETWORK=testnet
   VITE_HORIZON_URL=https://horizon-testnet.stellar.org
   VITE_CONTRACT_ID=YOUR_DEPLOYED_CONTRACT_ID
   ```

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Preview deployments for pull requests

### Smart Contract Deployment

1. **Install Prerequisites**
   ```bash
   # Install Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # Install Stellar CLI
   cargo install --locked stellar-cli
   
   # Add WebAssembly target
   rustup target add wasm32-unknown-unknown
   ```

2. **Deploy Contract**
   ```bash
   cd contracts
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Update Configuration**
   - Copy the deployed contract ID
   - Update environment variables
   - Redeploy frontend

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to your preferred hosting platform
# (Netlify, GitHub Pages, AWS S3, etc.)
```

## 🐛 Troubleshooting

### Wallet Connection Issues
**Q: "Wallet connection failed" - What should I do?**
A: The app automatically falls back to TEST MODE with a mock wallet. All features work normally! Install Freighter for production use.

**Q: How do I switch from TEST MODE to real Freighter?**
A: Install Freighter extension, create testnet account, fund it, and reload the app.

### Smart Contract Issues
**Q: Smart contract deployment fails**
A: Ensure you have Rust and Stellar CLI installed. Check the contracts/README.md for detailed setup instructions.

**Q: Contract functions return errors**
A: Verify the contract is deployed and the contract ID is correctly set in environment variables.

### Installation Issues
**Q: npm install fails with dependency errors**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Q: Build fails with TypeScript errors**
A: Ensure all dependencies are installed and TypeScript is properly configured.

### Development Issues
**Q: App shows blank page**
- Check browser console for errors
- Verify environment variables are set
- Ensure all dependencies are installed

**Q: Vercel deployment fails**
- Check build logs in Vercel dashboard
- Verify environment variables are set correctly
- Ensure build command completes successfully locally

## 📈 Future Enhancements

- ✅ **Smart Contracts**: Soroban smart contract integration (COMPLETED)
- ✅ **Vercel Deployment**: Global CDN deployment (COMPLETED)
- 🔄 **Multi-chain Support**: Ethereum, Polygon integration
- 🔄 **IPFS Integration**: Decentralized file storage
- 🔄 **Mobile App**: React Native mobile application
- 🔄 **Advanced Analytics**: Machine learning insights
- 🔄 **API Rate Limiting**: Enhanced security features
- 🔄 **Multi-language Support**: Internationalization
- 🔄 **Advanced Access Control**: Role-based permissions
- 🔄 **Enterprise Features**: Team management and collaboration

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow the existing code style
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments

- **Stellar Foundation** - Blockchain platform and development tools
- **Freighter Team** - Stellar wallet integration
- **React Community** - Frontend framework and ecosystem
- **Vercel** - Deployment and hosting platform
- **Open Source Community** - Various libraries and tools

## 📞 Support

For issues, questions, or feature requests:

- **GitHub Issues**: [Create an issue](https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_/issues)
- **Documentation**: Check the troubleshooting section above
- **Community**: Join the Stellar Discord

---

**Built with ❤️ for Data Security and Blockchain Innovation**

⭐ **If you find this project useful, please give it a star!**

## 🚀 Live Links

- **Production App**: [https://dataguard-stellar.vercel.app](https://dataguard-stellar.vercel.app)
- **GitHub Repository**: [https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_](https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_)
- **Smart Contract Explorer**: [Stellar Expert](https://stellar.expert/explorer/testnet)
- **Vercel Dashboard**: [Project Dashboard](https://vercel.com/dashboard)

---

*DataGuard - Securing Your Data with Blockchain Technology*