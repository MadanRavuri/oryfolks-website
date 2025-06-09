const config = {
  apiUrl: import.meta.env.MODE === 'production'
    ? 'https://www.oryfolks.com/api'  // Production URL
    : 'http://localhost:3001/api', // Local development
};

export default config; 