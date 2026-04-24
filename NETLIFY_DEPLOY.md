# Netlify Deployment Guide for DataGuard

## 🚀 Quick Deploy to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. **Fork/Access Repository**:
   - Repository: https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_
   - Ensure you have access to this repository

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select the `DATAGUARD_StellarRiseIn_` repository

3. **Configure Build Settings**:
   ```
   Base directory: dataguard
   Build command: npm run build
   Publish directory: dataguard/build
   ```

4. **Environment Variables**:
   Add these in Netlify Dashboard → Site Settings → Environment Variables:
   ```
   REACT_APP_NAME=DataGuard
   REACT_APP_STELLAR_NETWORK=testnet
   REACT_APP_HORIZON_URL=https://horizon-testnet.stellar.org
   REACT_APP_CONTRACT_ID=PLACEHOLDER_CONTRACT_ID
   REACT_APP_FREIGHTER_ENABLED=true
   REACT_APP_API_URL=https://your-backend-api.herokuapp.com/api
   REACT_APP_ENVIRONMENT=production
   ```

5. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at: `https://[random-name].netlify.app`

### Option 2: Manual Deploy

1. **Build Locally**:
   ```bash
   cd dataguard
   npm install
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://app.netlify.com)
   - Drag and drop the `build` folder to the deploy area
   - Your site will be deployed instantly

## 🔧 Configuration Files

The repository includes pre-configured files for Netlify:

### `netlify.toml`
```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `public/_redirects`
```
/*    /index.html   200
```

## 🌐 Expected Deployment URL

Your DataGuard application will be deployed at:
- **Primary**: `https://stellardataguard.netlify.app`
- **Custom Domain**: Configure in Netlify Dashboard → Domain Settings

## 📋 Post-Deployment Checklist

After deployment, verify:

- [ ] Application loads correctly
- [ ] Authentication system works (login/signup)
- [ ] Wallet connection functions
- [ ] All pages are accessible
- [ ] Environment variables are set correctly
- [ ] SSL certificate is active (automatic)

## 🔄 Automatic Deployments

Once connected to GitHub:
- Every push to `master` branch triggers automatic deployment
- Pull request previews are generated automatically
- Build logs are available in Netlify Dashboard

## 🛠️ Troubleshooting

### Build Fails
1. Check build logs in Netlify Dashboard
2. Verify all dependencies are in `package.json`
3. Ensure Node.js version is 18+

### Environment Variables
1. Double-check variable names (case-sensitive)
2. Restart deployment after adding variables
3. Verify API URLs are correct

### 404 Errors
1. Ensure `_redirects` file is in `public` folder
2. Check `netlify.toml` redirect configuration
3. Verify React Router is properly configured

## 📞 Support

For deployment issues:
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Issues**: https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_/issues
- **Repository**: https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_

---

**Ready to deploy? Click the button below:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Sharayu-github/DATAGUARD_StellarRiseIn_)

---

*DataGuard - Securing Your Data with Blockchain Technology*