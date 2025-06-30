# Japan Deployment Guide

This guide addresses the specific issues that can cause the OryFolks website to not work properly in Japan and provides solutions for optimal performance.

## 🚨 Common Issues in Japan

### 1. **External CDN Dependencies**
- **Problem**: Google Fonts, YouTube, and other external services may be blocked or slow
- **Solution**: Implemented fallback fonts and local video hosting

### 2. **CORS Configuration**
- **Problem**: Limited allowed origins blocking Japanese domains
- **Solution**: Updated CORS to include wildcard patterns and Japanese domains

### 3. **Language Support**
- **Problem**: No Japanese language support
- **Solution**: Added comprehensive Japanese translations and language detection

### 4. **Network Performance**
- **Problem**: Slow loading times due to regional distance
- **Solution**: Optimized caching, compression, and regional configurations

## 🔧 Implemented Fixes

### Font Optimization
- Added fallback fonts for Japanese systems
- Implemented `font-display: swap` for better loading
- Added system font fallbacks: `Hiragino Sans`, `Hiragino Kaku Gothic ProN`, `Yu Gothic`, `Meiryo`

### CORS Configuration
```javascript
// Updated allowed origins in api/index.ts
const allowedOrigins = [
  // ... existing origins
  'https://*.vercel.app',
  'https://*.netlify.app',
  'https://*.herokuapp.com',
  'https://*.railway.app',
  'https://*.render.com',
  'https://*.oryfolks.com',
  'https://*.ngrok.io',
  'https://*.ngrok-free.app'
];
```

### Japanese Language Support
- Added `ja.json` translation file
- Implemented automatic language detection
- Created language selector component
- Added Japanese system font support

### Video Optimization
- Replaced YouTube iframe with local video files
- Added multiple video source fallbacks
- Implemented proper video error handling

### Performance Optimizations
- Added aggressive caching headers
- Implemented regional timeout configurations
- Added error boundary for better error handling
- Optimized build configuration for Japan

## 🚀 Deployment Steps

### 1. Environment Variables
Ensure these are set in your Vercel deployment:
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
NODE_ENV=production
```

### 2. MongoDB Atlas Configuration
- Ensure your MongoDB Atlas cluster allows connections from Japan
- Add `0.0.0.0/0` to IP whitelist for global access
- Or add specific Japanese IP ranges if needed

### 3. Vercel Deployment
```bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration for automatic deployments
```

### 4. Domain Configuration
- Point your domain to Vercel
- Enable HTTPS
- Configure DNS for optimal routing

## 🔍 Testing in Japan

### 1. Use Japanese VPN/Proxy
- Test with Japanese IP addresses
- Verify language detection works
- Check loading times

### 2. Browser Testing
- Test in Japanese browsers (Chrome, Firefox, Safari)
- Verify font rendering
- Check video playback

### 3. Network Testing
- Test on different Japanese ISPs
- Check mobile vs desktop performance
- Verify API endpoints work

## 📊 Monitoring

### 1. Error Tracking
The ErrorBoundary component logs errors with:
- User agent information
- Language settings
- Timestamp and URL
- Error stack traces

### 2. Performance Monitoring
- Monitor Core Web Vitals
- Track API response times
- Monitor font loading times

### 3. Regional Analytics
- Track user locations
- Monitor language preferences
- Analyze error patterns by region

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Fonts Not Loading
**Symptoms**: Text appears in system fonts
**Solution**: Check network connectivity to Google Fonts, fallback fonts will load

#### 2. Videos Not Playing
**Symptoms**: Video player shows error
**Solution**: Ensure video files are properly uploaded to `/public` directory

#### 3. API Calls Failing
**Symptoms**: Forms not submitting, data not loading
**Solution**: Check CORS configuration and MongoDB connection

#### 4. Slow Loading
**Symptoms**: Page takes long to load
**Solution**: Check CDN configuration and caching headers

### Debug Commands
```bash
# Check build output
npm run build

# Test locally
npm run dev

# Check for TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint
```

## 📞 Support

If issues persist in Japan:

1. **Check Vercel Logs**: Monitor function logs for errors
2. **Test API Endpoints**: Use tools like Postman to test `/api/health`
3. **Monitor MongoDB**: Check Atlas dashboard for connection issues
4. **Contact Support**: Provide error logs and user agent information

## 🔄 Updates

This guide will be updated as new issues are identified and resolved. Monitor the repository for the latest fixes and optimizations.

---

**Last Updated**: December 2024
**Version**: 1.0.0 