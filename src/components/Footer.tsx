import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with logo image */}
          <div>
            <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="/logo.jpg" 
                  alt="OryFolks Logo" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </NavLink>
            <p className="text-gray-300 mb-4">
              Empowering communities through innovative solutions and dedicated service.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/oryfolks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/oryfolks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.instagram.com/oryfolks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/oryfolks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-secondary-500 transition-colors">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-300 hover:text-secondary-500 transition-colors">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-secondary-500 transition-colors">Services</NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="text-gray-300 hover:text-secondary-500 transition-colors">Careers</NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-gray-300 hover:text-secondary-500 transition-colors">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-300 hover:text-secondary-500 transition-colors">Contact Us</NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/services/bot-vision" 
                  className="text-gray-300 hover:text-secondary-500 transition-colors"
                >
                  BOT Vision
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services/it-staffing" 
                  className="text-gray-300 hover:text-secondary-500 transition-colors"
                >
                  IT Staffing
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services/full-cycle" 
                  className="text-gray-300 hover:text-secondary-500 transition-colors"
                >
                  Full Cycle Development
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-secondary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Plot No. 25/11/23, Savithri Nagar 3rd street, Vedayapalem, Nellore 524004, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-secondary-500 flex-shrink-0" />
                <a href="tel:+918614500024" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  +91 0861-4500024
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-secondary-500 flex-shrink-0" />
                <a href="mailto:info@oryfolks.com" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  info@oryfolks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OryFolks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
