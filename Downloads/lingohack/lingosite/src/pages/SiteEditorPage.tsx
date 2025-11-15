import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft,
  Save,
  Eye,
  Code,
  Languages,
  Settings,
  Upload,
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export function SiteEditorPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);

  console.log('Editing site:', siteId);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white neo-border border-t-0 border-l-0 border-r-0 neo-brutal-shadow-md sticky top-0 z-40">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/sites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="neo-border hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-black letter-spacing-wide">
                  Site Editor
                </h1>
                <p className="text-sm text-gray-600">mysite.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="neo-border neo-brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all font-bold"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white neo-border border-t-0 border-l-0 neo-brutal-shadow-md min-h-screen p-6">
          <div className="mb-6">
            <h3 className="text-sm font-bold letter-spacing-wider text-gray-600 mb-3">
              LANGUAGE
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 neo-border neo-brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-[var(--accent-yellow)]'
                      : 'bg-white'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-bold text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t-4 border-black">
            <h3 className="text-sm font-bold letter-spacing-wider text-gray-600 mb-3">
              TOOLS
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2 neo-border bg-white hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Import</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 neo-border bg-white hover:bg-gray-50 transition-colors">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Code</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 neo-border bg-white hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="neo-border neo-brutal-shadow-sm bg-white p-1">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="translation"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
                >
                  Translation
                </TabsTrigger>
                <TabsTrigger
                  value="seo"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-bold letter-spacing-wide"
                >
                  SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                  <h3 className="text-xl font-black letter-spacing-wide mb-4">
                    Page Content
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Page Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Welcome to Our Site"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="This is a multilingual website built with LingoSite. Our platform makes it easy to reach global audiences."
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Main Content
                      </label>
                      <textarea
                        rows={8}
                        defaultValue="Edit your main content here. This content will be automatically translated to all selected languages."
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="translation" className="space-y-6">
                <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black letter-spacing-wide">
                      Translation Status
                    </h3>
                    <Button className="neo-border neo-brutal-shadow-sm bg-[var(--accent-green)] text-black hover:bg-[var(--accent-green)] font-bold">
                      <Languages className="w-4 h-4 mr-2" />
                      Auto Translate
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {languages.map((lang) => (
                      <div
                        key={lang.code}
                        className="neo-border neo-brutal-shadow-sm bg-gray-50 p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <div className="font-bold">{lang.name}</div>
                            <div className="text-sm text-gray-600">
                              {lang.code === 'en' ? 'Source' : '100% Complete'}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="neo-border font-bold"
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div className="neo-border neo-brutal-shadow-lg bg-white p-8">
                  <h3 className="text-xl font-black letter-spacing-wide mb-4">
                    SEO Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        placeholder="Your page title for search engines"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief description for search results"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold letter-spacing-wide mb-2">
                        Keywords
                      </label>
                      <input
                        type="text"
                        placeholder="keyword1, keyword2, keyword3"
                        className="w-full neo-border px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
