const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://oryfolks-website-n2aw.vercel.app/api'  // Backend Vercel deployment URL
    : 'http://localhost:5000/api', // Local development
};

export default config; 