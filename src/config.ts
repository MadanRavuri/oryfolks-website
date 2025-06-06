const config = {
  apiUrl: import.meta.env.MODE === 'production' 
    ? 'https://oryfolks-website-backend.vercel.app/api'  // Correct backend Vercel deployment URL
    : 'http://localhost:5000/api', // Local development
};

export default config; 