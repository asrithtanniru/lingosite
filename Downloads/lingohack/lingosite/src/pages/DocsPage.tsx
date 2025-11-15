import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  BookOpen,
  Code,
  Rocket,
  Zap,
  Search,
} from 'lucide-react';

const docSections = [
  {
    title: 'Getting Started',
    icon: Rocket,
    articles: [
      { title: 'Quick Start Guide', href: '#quick-start' },
      { title: 'Creating Your First Site', href: '#first-site' },
      { title: 'Understanding Languages', href: '#languages' },
      { title: 'Deployment Basics', href: '#deployment' },
    ],
  },
  {
    title: 'Translation',
    icon: Globe,
    articles: [
      { title: 'Auto Translation', href: '#auto-translate' },
      { title: 'Manual Translation', href: '#manual-translate' },
      { title: 'Translation Quality', href: '#quality' },
      { title: 'Language Management', href: '#lang-management' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    articles: [
      { title: 'Authentication', href: '#auth' },
      { title: 'Sites API', href: '#sites-api' },
      { title: 'Translation API', href: '#translation-api' },
      { title: 'Webhooks', href: '#webhooks' },
    ],
  },
  {
    title: 'Advanced',
    icon: Zap,
    articles: [
      { title: 'Custom Integrations', href: '#integrations' },
      { title: 'CI/CD Pipeline', href: '#cicd' },
      { title: 'Performance Optimization', href: '#performance' },
      { title: 'Security Best Practices', href: '#security' },
    ],
  },
];

export function DocsPage() {
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
            className="flex items-center space-x-3 px-4 py-3 bg-white text-black neo-border font-bold letter-spacing-wide"
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
                  Documentation
                </h1>
                <p className="text-gray-600 mt-1">
                  Everything you need to build with LingoSite
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative neo-border neo-brutal-shadow-md bg-white">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {docSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="neo-border neo-brutal-shadow-lg bg-white p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 neo-border neo-brutal-shadow-sm bg-black flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-black letter-spacing-wide">
                      {section.title}
                    </h2>
                  </div>

                  <ul className="space-y-3">
                    {section.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a
                          href={article.href}
                          className="flex items-center space-x-2 text-gray-700 hover:text-black font-medium transition-colors group"
                        >
                          <div className="w-2 h-2 bg-black group-hover:bg-[var(--accent-green)] transition-colors"></div>
                          <span>{article.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="neo-border neo-brutal-shadow-xl bg-black text-white p-8" id="quick-start">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-8 h-8" />
              <h2 className="text-3xl font-black letter-spacing-wide">Quick Start Guide</h2>
            </div>

            <div className="space-y-6 text-gray-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3 letter-spacing-wide">
                  1. Create Your First Site
                </h3>
                <p className="leading-relaxed mb-4">
                  Navigate to the dashboard and click "New Site". Give your site a name and
                  select your primary language. LingoSite will create a new project for you.
                </p>
                <div className="neo-border bg-gray-900 p-4 font-mono text-sm">
                  <code>Dashboard → New Site → Enter Details → Create</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3 letter-spacing-wide">
                  2. Add Languages
                </h3>
                <p className="leading-relaxed mb-4">
                  Open your site editor and navigate to the languages panel. Select the
                  languages you want to support. You can add up to 50+ languages.
                </p>
                <div className="neo-border bg-gray-900 p-4 font-mono text-sm">
                  <code>Site Editor → Languages → Add Language → Save</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3 letter-spacing-wide">
                  3. Create Content
                </h3>
                <p className="leading-relaxed mb-4">
                  Add your content in your primary language. Use the content editor to write
                  your pages, blog posts, or product descriptions.
                </p>
                <div className="neo-border bg-gray-900 p-4 font-mono text-sm">
                  <code>Content Tab → Add Text → Format → Save</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3 letter-spacing-wide">
                  4. Translate
                </h3>
                <p className="leading-relaxed mb-4">
                  Use auto-translation for instant results or manually refine translations
                  for perfect accuracy. LingoSite supports both approaches.
                </p>
                <div className="neo-border bg-gray-900 p-4 font-mono text-sm">
                  <code>Translation Tab → Auto Translate → Review → Publish</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3 letter-spacing-wide">
                  5. Deploy
                </h3>
                <p className="leading-relaxed mb-4">
                  When you're ready, hit the publish button. Your multilingual site will be
                  live in under 2 seconds across all languages.
                </p>
                <div className="neo-border bg-gray-900 p-4 font-mono text-sm">
                  <code>Dashboard → Select Site → Publish → Live!</code>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-4 border-white">
              <p className="text-lg text-gray-300 mb-4">Need more help?</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="px-6 py-3 neo-border neo-brutal-shadow-md bg-[var(--accent-green)] text-black font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
                >
                  View API Docs
                </a>
                <a
                  href="#"
                  className="px-6 py-3 neo-border neo-brutal-shadow-md bg-white text-black font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
                >
                  Join Community
                </a>
                <a
                  href="#"
                  className="px-6 py-3 neo-border neo-brutal-shadow-md bg-[var(--accent-blue)] text-black font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
