const DEFAULT_DEV_API = 'http://localhost:5000/api';

// Vite exposes variables that start with VITE_ via import.meta.env
const apiUrlFromEnv = import.meta.env.VITE_API_URL as string | undefined;

const config = {
  // Priority order: explicit VITE_API_URL -> production relative `/api` -> local dev URL
  apiUrl: apiUrlFromEnv
    ? apiUrlFromEnv
    : import.meta.env.MODE === 'production'
      ? '/api'
      : DEFAULT_DEV_API,
};

export default config;