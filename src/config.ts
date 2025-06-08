const config = {
  apiUrl: import.meta.env.MODE === 'production'
    ? 'https://oryfolks-website-madanravuri.vercel.app/api'  // Production API URL
    : 'http://localhost:5000/api', // Local development
};

export default config; 