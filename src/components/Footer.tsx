import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info with logo */}
          <div className="md:col-span-3">
            <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="/logo.webp" 
                  alt="OryFolks Logo" 
                  className="h-8 w-auto object-contain"
                  width={32}
                  height={32}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </NavLink>
            <p className="text-gray-300 mb-6">
              Empowering communities through innovative solutions and dedicated service.
            </p>
            <div className="mb-4">
              <h4 className="text-secondary-500 font-semibold mb-3 text-sm">ISO Certified Company</h4>
              <img 
                src="/ISO.jpeg"  
                alt="ISO 27001 Certified" 
                className="h-40 w-auto object-contain hover:scale-105 transition-transform"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-300 hover:text-secondary-500 transition-colors">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Global Offices</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-secondary-500 font-medium mb-3 text-base">India Office</h4>
                <p className="text-gray-300 text-base leading-relaxed">
                  Plot No. 25/11/23, Savithri Nagar 3rd street, Vedayapalem, Nellore 524004, Andhra Pradesh, India
                </p>
              </div>
              <div>
                <h4 className="text-secondary-500 font-medium mb-3 text-base">Singapore Office</h4>
                <p className="text-gray-300 text-base leading-relaxed">
                  #1792, MBFC Tower 3, 12 Marina Blvd, Singapore 018982
                </p>
              </div>
          <div>
                <h4 className="text-secondary-500 font-medium mb-3 text-base">Japan Office</h4>
                <p className="text-gray-300 text-base leading-relaxed">
                  Higashi Azabu K building 3F, 3-4-17 Higashi Azabu Minato-ku, Tokyo, Japan 106-0044
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-secondary-500 font-medium mb-3 text-base">Phone Numbers</h4>
                <ul className="space-y-2 text-base">
                  <li className="text-gray-300">India: +91 0861-4500024</li>
                  <li className="text-gray-300">Singapore: +65 81198492</li>
                  <li className="text-gray-300">Japan: +81-50-1706-3337</li>
                </ul>
              </div>
              <div>
                <h4 className="text-secondary-500 font-medium mb-3 text-base">Email</h4>
                <a 
                  href="mailto:info@oryfolks.com" 
                  className="text-gray-300 hover:text-secondary-500 transition-colors text-base"
                >
                  info@oryfolks.com
                </a>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/oryfolks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500 text-gray-300 hover:border-secondary-500 hover:text-secondary-500 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://twitter.com/oryfolks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500 text-gray-300 hover:border-secondary-500 hover:text-secondary-500 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/oryfolks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500 text-gray-300 hover:border-secondary-500 hover:text-secondary-500 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/oryfolks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500 text-gray-300 hover:border-secondary-500 hover:text-secondary-500 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
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
