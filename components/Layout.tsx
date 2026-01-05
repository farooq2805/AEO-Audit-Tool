
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, Activity, BookOpen, Layers, Info, Mail, Zap } from 'lucide-react';
import { NavigationPaths } from '../types';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'AEO Checker', path: NavigationPaths.AEO_CHECKER, icon: Zap },
    { label: 'Product', path: NavigationPaths.PRODUCT, icon: Layers },
    { label: 'How it Works', path: NavigationPaths.HOW_IT_WORKS, icon: Activity },
    { label: 'Pricing', path: NavigationPaths.PRICING, icon: Search },
    { label: 'Education', path: NavigationPaths.EDUCATION, icon: BookOpen },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={NavigationPaths.HOME} className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">AdVantage<span className="text-blue-600">AI</span></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === item.path ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to={NavigationPaths.CONTACT} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Book a Demo
            </Link>
            <Link to={NavigationPaths.AEO_CHECKER} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm">
              Try Checker
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={NavigationPaths.CONTACT}
              className="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to={NavigationPaths.HOME} className="flex items-center space-x-2 mb-6">
              <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">AdVantage<span className="text-blue-600">AI</span></span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              The premium Generative Engine Optimization (GEO) platform for high-growth brands. 
              Get cited, trusted, and surfaced inside AI answers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to={NavigationPaths.AEO_CHECKER} className="hover:text-blue-600">AEO Checker</Link></li>
              <li><Link to={NavigationPaths.PRODUCT} className="hover:text-blue-600">GEO Auditor</Link></li>
              <li><Link to={NavigationPaths.PRODUCT} className="hover:text-blue-600">Creative Sprint</Link></li>
              <li><Link to={NavigationPaths.PRICING} className="hover:text-blue-600">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to={NavigationPaths.EDUCATION} className="hover:text-blue-600">Education Hub</Link></li>
              <li><Link to={NavigationPaths.HOW_IT_WORKS} className="hover:text-blue-600">Documentation</Link></li>
              <li><Link to={NavigationPaths.USE_CASES} className="hover:text-blue-600">Case Studies</Link></li>
              <li><Link to={NavigationPaths.EDUCATION} className="hover:text-blue-600">AEO vs GEO</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to={NavigationPaths.ABOUT} className="hover:text-blue-600">About Us</Link></li>
              <li><Link to={NavigationPaths.CONTACT} className="hover:text-blue-600">Book Demo</Link></li>
              <li><Link to={NavigationPaths.CONTACT} className="hover:text-blue-600">Support</Link></li>
              <li><a href="mailto:contact@advantageai.io" className="hover:text-blue-600 flex items-center"><Mail className="h-4 w-4 mr-2"/>Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-slate-500">
          <p>© 2025 AdVantage AI Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
