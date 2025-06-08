import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ApplicationForm from './pages/ApplicationForm';
import BotVisionPage from './pages/services/BotVisionPage';
import ITStaffingPage from './pages/services/ITStaffingPage';
import FullCyclePage from './pages/services/FullCyclePage';
import './i18n'; // Import i18n configuration

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/bot-vision" element={<BotVisionPage />} />
          <Route path="services/it-staffing" element={<ITStaffingPage />} />
          <Route path="services/full-cycle" element={<FullCyclePage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="apply" element={<ApplicationForm />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;