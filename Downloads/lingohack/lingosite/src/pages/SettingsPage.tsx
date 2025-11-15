import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Globe,
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  CreditCard,
  Shield,
} from 'lucide-react';

export function SettingsPage() {
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
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
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
            className="flex items-center space-x-3 px-4 py-3 bg-white text-black neo-border font-bold letter-spacing-wide"
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
        <div className="max-w-5xl mx-auto">
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
                  Settings
                </h1>
                <p className="text-gray-600 mt-1">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="neo-border neo-brutal-shadow-sm bg-white p-1 flex-wrap h-auto">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                <h3 className="text-xl font-black letter-spacing-wide mb-6">
                  Profile Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 neo-border neo-brutal-shadow-md bg-black flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <Button className="neo-border neo-brutal-shadow-sm bg-black text-white hover:bg-black font-bold">
                      Change Avatar
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold letter-spacing-wide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold letter-spacing-wide mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue="Acme Inc."
                      className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <Button className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all font-bold letter-spacing-wide">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                <h3 className="text-xl font-black letter-spacing-wide mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    { label: 'Deployment notifications', description: 'Get notified when sites are deployed' },
                    { label: 'Translation updates', description: 'Receive updates on translation progress' },
                    { label: 'Security alerts', description: 'Important security notifications' },
                    { label: 'Product updates', description: 'News about new features and updates' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 neo-border neo-brutal-shadow-sm bg-gray-50"
                    >
                      <div>
                        <div className="font-bold letter-spacing-wide">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-14 h-8 bg-gray-300 neo-border peer-checked:bg-[var(--accent-green)] transition-colors"></div>
                        <div className="absolute left-1 top-1 w-6 h-6 bg-white neo-border transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                <h3 className="text-xl font-black letter-spacing-wide mb-6">
                  Current Plan
                </h3>

                <div className="neo-border neo-brutal-shadow-md bg-black text-white p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-black letter-spacing-wide">Professional</div>
                      <div className="text-gray-300 mt-1">$149/month</div>
                    </div>
                    <div className="px-3 py-1 bg-[var(--accent-green)] text-black font-bold text-sm">
                      ACTIVE
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    Next billing date: January 1, 2025
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full neo-border neo-brutal-shadow-sm bg-white hover:bg-white font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full neo-border neo-brutal-shadow-sm font-bold letter-spacing-wide"
                  >
                    View Billing History
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                <h3 className="text-xl font-black letter-spacing-wide mb-6">
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold letter-spacing-wide mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold letter-spacing-wide mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold letter-spacing-wide mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold letter-spacing-wide mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <Button className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black font-bold letter-spacing-wide">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t-4 border-black">
                    <h4 className="font-bold letter-spacing-wide mb-4">
                      Two-Factor Authentication
                    </h4>
                    <div className="neo-border neo-brutal-shadow-sm bg-gray-50 p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold">Status: Disabled</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Add an extra layer of security
                          </div>
                        </div>
                        <Button className="neo-border neo-brutal-shadow-sm bg-black text-white hover:bg-black font-bold">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
