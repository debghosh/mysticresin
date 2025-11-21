import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { config } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`font-serif text-2xl font-bold transition-colors ${scrolled ? 'text-slate-800' : 'text-slate-800 md:text-slate-900'}`}>
              {(config.name || "Shelly's").split(' ')[0]}<span style={{ color: 'var(--color-primary)' }}>Resin</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-wider font-medium hover:text-[color:var(--color-primary)] transition-colors ${location.pathname === link.path ? 'text-[color:var(--color-primary)]' : 'text-slate-600'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 hover:bg-gray-200">
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-slate-900 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[color:var(--color-primary)]"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="block px-3 py-2 text-sm text-gray-400">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { config } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <h3 className="text-white text-lg font-serif font-bold mb-4">Shelly's Resin</h3>
             <p className="text-sm text-slate-400 mb-4">Handcrafted resin art and decor, inspired by nature's beauty.</p>
             <div className="flex space-x-4">
               <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
               <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
               <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
             </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Shelly</Link></li>
              <li><Link to="/destinations" className="hover:text-white">Shop Collection</Link></li>
              <li><Link to="/services" className="hover:text-white">Custom & Workshops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white">Care Instructions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Stay Updated</h4>
            <p className="text-xs mb-2">Subscribe for new drops and workshop dates.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="bg-slate-800 text-white px-4 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[color:var(--color-primary)]" />
              <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {year} {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[color:var(--color-accent)]">
      <Navigation />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;