# DataGuard Deployment Guide

This guide covers deploying DataGuard to Vercel and setting up the smart contract on Stellar Testnet.

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account with the DataGuard repository
- Vercel account (free tier available)

### Step 1: Connect Repository to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository: `DATAGUARD_StellarRiseIn_`
   - Choose the `dataguard` folder as the root directory

3. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Root Directory: `dataguard`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Step 2: Environment Variables

Add these environment variables in Vercel dashboard:

```env
VITE_APP_NAME=DataGuard
VITE_APP_VERSION=1.0.0
VITE_STELLAR_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_CONTRACT_ID=PLACEHOLDER_CONTRACT_ID
VITE_FREIGHTER_ENABLED=true
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
```

### Step 3: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for build to complete
3. Your app will be available at: `https://your-project-name.vercel.app`

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 🤖 Smart Contract Deployment

### Prerequisites
- Rust and Cargo installed
- Stellar CLI installed
- Stellar testnet account with XLM

### Step 1: Install Tools

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Stellar CLI
cargo install --locked stellar-cli

# Add WebAssembly target
rustup target add wasm32-unknown-unknown
```

### Step 2: Deploy Contract

```bash
# Navigate to contracts directory
cd contracts

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Step 3: Update Configuration

1. Copy the deployed contract ID from the deployment output
2. Update environment variables in Vercel:
   - Set `VITE_CONTRACT_ID` to your deployed contract ID
3. Redeploy the frontend

### Step 4: Verify Deployment

1. Visit your deployed app
2. Connect Freighter wallet
3. Try uploading a test file
4. Verify the record on Stellar Expert

## 🔧 Manual Deployment Steps

### Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test locally
npm install -g serve
serve -s build
```

### Deploy to Other Platforms

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

#### AWS S3 + CloudFront
```bash
# Build the app
npm run build

# Upload to S3 bucket
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔍 Troubleshooting

### Build Failures

**Issue**: Build fails with Tailwind CSS errors
**Solution**: Ensure Craco is properly configured and all dependencies are installed

**Issue**: TypeScript compilation errors
**Solution**: Check all imports and type definitions, especially Freighter API usage

### Deployment Issues

**Issue**: Vercel deployment fails
**Solution**: 
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Ensure build succeeds locally first

**Issue**: App shows blank page after deployment
**Solution**:
1. Check browser console for errors
2. Verify all environment variables are set correctly
3. Check network requests in browser dev tools

### Smart Contract Issues

**Issue**: Contract deployment fails
**Solution**:
1. Ensure Rust and Stellar CLI are properly installed
2. Check you have sufficient XLM in your account
3. Verify network connectivity to Stellar testnet

**Issue**: Contract functions don't work
**Solution**:
1. Verify contract ID is correctly set in environment variables
2. Check contract is properly initialized
3. Ensure wallet is connected and has XLM for fees

## 📊 Monitoring and Analytics

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor page views, performance, and user behavior

### Error Tracking
- Consider integrating Sentry for error tracking
- Monitor console errors and API failures

### Performance Monitoring
- Use Lighthouse CI for performance monitoring
- Monitor Core Web Vitals in Vercel dashboard

## 🔄 Continuous Deployment

### Automatic Deployments
- Vercel automatically deploys on push to main branch
- Preview deployments for pull requests
- Environment-specific deployments

### GitHub Actions
- CI/CD pipeline runs tests and builds
- Automatic security scanning
- Performance testing with Lighthouse

## 🔒 Security Considerations

### Environment Variables
- Never commit sensitive data to repository
- Use Vercel's secure environment variable storage
- Rotate secrets regularly

### Content Security Policy
- Configure CSP headers in vercel.json
- Restrict external resource loading
- Monitor for XSS attempts

### HTTPS
- Vercel provides automatic HTTPS
- Ensure all external APIs use HTTPS
- Configure secure headers

## 📈 Scaling Considerations

### Performance Optimization
- Enable Vercel's Edge Network
- Optimize images and assets
- Implement code splitting

### Database Scaling
- Consider adding a backend database for metadata
- Implement caching strategies
- Monitor API rate limits

### Global Distribution
- Use Vercel's global CDN
- Consider regional deployments
- Monitor performance across regions

---

## 🎉 Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build succeeds locally
- [ ] Smart contract deployed
- [ ] Contract ID updated in environment
- [ ] Frontend deployed successfully
- [ ] Wallet connection tested
- [ ] File upload/verification tested
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring setup
- [ ] Performance monitoring active

**Congratulations! Your DataGuard application is now live! 🚀**