const config = {
  apiUrl: import.meta.env.MODE === 'production'
    ? 'https://api.oryfolks.com/api'  // Production API URL
    : 'http://localhost:5000/api', // Local development
};

export default config; 