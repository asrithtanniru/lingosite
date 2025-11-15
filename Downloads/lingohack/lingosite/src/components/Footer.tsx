import { Globe, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white flex items-center justify-center neo-border">
                <Globe className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold letter-spacing-wide">LingoSite</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Build multilingual websites instantly. No coding required.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 letter-spacing-wide">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-white transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 letter-spacing-wide">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 letter-spacing-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-white pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2025 LingoSite. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-[var(--accent-green)] transition-colors group"
            >
              <Twitter className="w-5 h-5 text-black group-hover:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-[var(--accent-blue)] transition-colors group"
            >
              <Github className="w-5 h-5 text-black group-hover:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-[var(--accent-yellow)] transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-black group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
