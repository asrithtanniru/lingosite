import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Globe, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white neo-border border-t-0 border-l-0 border-r-0 neo-brutal-shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center neo-border neo-brutal-shadow-sm transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold letter-spacing-wide">LingoSite</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-black hover:text-gray-600 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-black hover:text-gray-600 font-medium transition-colors"
            >
              Demo
            </a>
            <a
              href="#faq"
              className="text-black hover:text-gray-600 font-medium transition-colors"
            >
              FAQ
            </a>
            <Link to="/dashboard">
              <Button
                className="neo-border neo-brutal-shadow-sm bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold letter-spacing-wide"
              >
                Dashboard
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden neo-border p-2 neo-brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white neo-border border-t-4 neo-brutal-shadow-lg animate-scale-in">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href="#features"
              className="block py-2 text-black hover:text-gray-600 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#demo"
              className="block py-2 text-black hover:text-gray-600 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#faq"
              className="block py-2 text-black hover:text-gray-600 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full neo-border neo-brutal-shadow-sm bg-black text-white hover:bg-black font-bold letter-spacing-wide">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
