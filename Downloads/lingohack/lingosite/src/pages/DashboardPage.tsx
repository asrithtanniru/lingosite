import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SiteCard } from '../components/SiteCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Plus,
  Globe,
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase, type Site } from '../lib/supabase';
import { Skeleton } from '../components/ui/skeleton';

export function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSites(data as Site[]);
    }
    setLoading(false);
  };

  const handlePublish = async (siteId: string) => {
    await supabase
      .from('sites')
      .update({
        deployment_status: 'live',
        last_deployed_at: new Date().toISOString()
      })
      .eq('id', siteId);

    loadSites();
  };

  const handleDelete = async (siteId: string) => {
    await supabase
      .from('sites')
      .delete()
      .eq('id', siteId);

    loadSites();
  };

  const handleCreateSite = async () => {
    const newSite = {
      name: `My Site ${sites.length + 1}`,
      domain: `site${sites.length + 1}.lingosite.com`,
      languages: ['en', 'es', 'fr'],
      default_language: 'en',
      deployment_status: 'draft' as const,
      user_id: '00000000-0000-0000-0000-000000000000',
    };

    await supabase.from('sites').insert([newSite]);
    loadSites();
  };

  const filteredSites = sites.filter((site) => {
    if (activeTab === 'all') return true;
    return site.deployment_status === activeTab;
  });

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
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 bg-white text-black neo-border font-bold letter-spacing-wide"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <Globe className="w-5 h-5" />
            <span>Sites</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            <span>Documentation</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:text-black transition-colors font-medium"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
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
                  My Sites
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your multilingual websites
                </p>
              </div>
            </div>

            <Button
              onClick={handleCreateSite}
              className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all font-bold letter-spacing-wide"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Site
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="neo-border neo-brutal-shadow-sm bg-white p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                All Sites
              </TabsTrigger>
              <TabsTrigger
                value="live"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                Live
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
              >
                Drafts
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="neo-border neo-brutal-shadow-lg bg-white p-6">
                      <Skeleton className="w-full h-40" />
                    </div>
                  ))}
                </div>
              ) : filteredSites.length === 0 ? (
                <div className="text-center py-16 neo-border neo-brutal-shadow-lg bg-white">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-2xl font-bold letter-spacing-wide mb-2">
                    No sites yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first multilingual site to get started
                  </p>
                  <Button
                    onClick={handleCreateSite}
                    className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black font-bold letter-spacing-wide"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Site
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSites.map((site) => (
                    <SiteCard
                      key={site.id}
                      site={site}
                      onPublish={handlePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
