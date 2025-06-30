const config = {
  apiUrl: import.meta.env.MODE === 'production'
    ? '/api'  // Update to a relative path for combined deployment
    : 'http://localhost:5000/api', // Local development
  
  // Regional fallback configuration
  regionalConfig: {
    japan: {
      apiUrl: '/api',
      cdnUrl: '/',
      timeout: 10000, // 10 seconds timeout for Japan
    },
    default: {
      apiUrl: '/api',
      cdnUrl: '/',
      timeout: 5000, // 5 seconds default timeout
    }
  },
  
  // Detect user region and apply appropriate settings
  getRegionalConfig: () => {
    const userLanguage = navigator.language || 'en';
    const isJapan = userLanguage.startsWith('ja') || 
                   navigator.languages?.some(lang => lang.startsWith('ja')) ||
                   Intl.DateTimeFormat().resolvedOptions().locale.startsWith('ja');
    
    return isJapan ? config.regionalConfig.japan : config.regionalConfig.default;
  }
};

export default config; 