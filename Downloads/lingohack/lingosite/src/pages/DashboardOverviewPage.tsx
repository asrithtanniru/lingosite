import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AnalyticsOverview } from '../components/AnalyticsOverview';
import { RecentActivity } from '../components/RecentActivity';
import { QuickActions } from '../components/QuickActions';
import {
  Globe,
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  Plus,
} from 'lucide-react';

export function DashboardOverviewPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b-4 border-white">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-white flex items-center justify-center neo-border">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold letter-spacing-wide">LingoSite</span>
          </Link>
        </div>

        <nav className="p-6 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 bg-white text-black neo-border font-bold letter-spacing-wide"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link
            to="/dashboard/sites"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <Globe className="w-5 h-5" />
            <span>Sites</span>
          </Link>
          <Link
            to="/docs"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            <span>Documentation</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t-4 border-white">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden neo-border p-2 bg-white neo-brutal-shadow-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black letter-spacing-wide">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
              </div>
            </div>

            <Link to="/dashboard/sites">
              <Button className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all font-bold letter-spacing-wide">
                <Plus className="w-4 h-4 mr-2" />
                New Site
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            <AnalyticsOverview />

            <div className="grid lg:grid-cols-2 gap-8">
              <RecentActivity />
              <QuickActions />
            </div>

            <div className="neo-border neo-brutal-shadow-xl bg-black text-white p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-black letter-spacing-wide mb-2">
                    Ready to Go Global?
                  </h3>
                  <p className="text-gray-300">
                    Create your first multilingual site in minutes
                  </p>
                </div>
                <Link to="/dashboard/sites">
                  <Button className="neo-border neo-brutal-shadow-md bg-[var(--accent-green)] text-black hover:bg-[var(--accent-green)] font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
