import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { lazy } from 'react';
import LazyRoute from './components/LazyRoute';
import './i18n'; // Import i18n configuration

// Lazy load pages for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ApplicationForm = lazy(() => import('./pages/ApplicationForm'));
const BotVisionPage = lazy(() => import('./pages/services/BotVisionPage'));
const ITStaffingPage = lazy(() => import('./pages/services/ITStaffingPage'));
const FullCyclePage = lazy(() => import('./pages/services/FullCyclePage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<LazyRoute><AboutPage /></LazyRoute>} />
        <Route path="services" element={<LazyRoute><ServicesPage /></LazyRoute>} />
        <Route path="services/bot-vision" element={<LazyRoute><BotVisionPage /></LazyRoute>} />
        <Route path="services/it-staffing" element={<LazyRoute><ITStaffingPage /></LazyRoute>} />
        <Route path="services/full-cycle" element={<LazyRoute><FullCyclePage /></LazyRoute>} />
        <Route path="careers" element={<LazyRoute><CareersPage /></LazyRoute>} />
        <Route path="blog" element={<LazyRoute><BlogPage /></LazyRoute>} />
        <Route path="contact" element={<LazyRoute><ContactPage /></LazyRoute>} />
        <Route path="apply" element={<LazyRoute><ApplicationForm /></LazyRoute>} />
        
      </Route>
    </Routes>
  );
}

export default App;