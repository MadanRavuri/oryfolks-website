import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isFirstMount, setIsFirstMount] = useState(true);

  const handleScroll = useCallback(() => {
    const isScrolledNow = window.scrollY > 50;
    setScrolled(prev => (isScrolledNow !== prev ? isScrolledNow : prev));
  }, []);

  useEffect(() => {
    // Throttle scroll events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header scrolled={scrolled} />

      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={!isFirstMount && { opacity: 0, y: 20 }}
            animate={!isFirstMount && { opacity: 1, y: 0 }}
            exit={!isFirstMount ? { opacity: 0, y: -20 } : undefined}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ChatBot mounted globally */}
      <ChatBot
        onNavigate={(page: string) => {
          switch (page) {
            case 'services':
              navigate('/services');
              break;
            case 'contact':
              navigate('/contact');
              break;
            case 'careers':
              navigate('/careers');
              break;
            case 'about':
              navigate('/about');
              break;
            case 'navigate_services':
              navigate('/services');
              break;
            case 'navigate_contact':
              navigate('/contact');
              break;
            case 'navigate_career':
              navigate('/careers');
              break;
            case 'navigate_about':
              navigate('/about');
              break;
            default:
              // If the page isn't mapped, try navigating to root
              navigate('/');
          }
        }}
      />

      <Footer />
    </div>
  );
};

export default Layout;
