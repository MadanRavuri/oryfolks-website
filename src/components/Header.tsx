import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector.tsx';

type HeaderProps = {
  scrolled: boolean;
};

const Header = ({ scrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'BOT Vision', path: '/services/bot-vision' },
        { name: 'IT Staffing', path: '/services/it-staffing' },
        { name: 'Full Cycle Development', path: '/services/full-cycle' }
      ]
    },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 bg-white transition-all duration-300 py-2 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="OryFolks Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative">
              {link.dropdown ? (
                <div className="relative">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 font-medium transition-colors hover:text-black ${
                        isActive ? 'text-black underline underline-offset-4' : 'text-gray-800'
                      }`
                    }
                  >
                    {link.name}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesDropdownOpen(!servicesDropdownOpen);
                      }}
                      className="focus:outline-none"
                    >
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </NavLink>
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors hover:text-black ${
                      isActive ? 'text-black underline underline-offset-4' : 'text-gray-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Right-side items: Language Selector and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-black text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation with backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white z-50 pt-20 shadow-lg">
            <nav className="flex flex-col p-6">
              {navLinks.map((link) => (
                <div key={link.path} className="w-full border-b border-gray-100 last:border-0">
                  {link.dropdown ? (
                    <div className="py-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setServicesDropdownOpen(!servicesDropdownOpen);
                        }}
                        className="flex items-center justify-between w-full text-lg font-medium text-gray-800 hover:text-black transition-colors"
                      >
                        {link.name}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {servicesDropdownOpen && (
                        <div className="mt-3 pl-4 space-y-3">
                          {link.dropdown.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              className="block text-base text-gray-600 hover:text-black transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-4 text-lg font-medium ${
                          isActive ? 'text-black' : 'text-gray-800'
                        } hover:text-black transition-colors`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
