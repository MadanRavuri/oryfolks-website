const config = {
  apiUrl: import.meta.env.MODE === 'production'
    ? '/api'  // Update to a relative path for combined deployment
    : 'http://localhost:5000/api', // Local development
};

export default config; 