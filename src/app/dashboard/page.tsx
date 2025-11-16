'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, BarChart3, Settings, ExternalLink, Plus, LogOut } from 'lucide-react'
import Link from 'next/link'

const sites = [
  {
    id: '1',
    name: 'E-Commerce Store',
    url: 'mystore.com',
    languages: 12,
    status: 'live',
    views: '45.2K',
    updated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Portfolio Website',
    url: 'myportfolio.dev',
    languages: 8,
    status: 'live',
    views: '12.8K',
    updated: '1 day ago',
  },
  {
    id: '3',
    name: 'Blog Platform',
    url: 'myblog.io',
    languages: 15,
    status: 'draft',
    views: '0',
    updated: '3 days ago',
  },
]

const languages = [
  { code: 'all', name: 'All Languages', flag: '🌐' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
]

export default function DashboardPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-main border-2 border-border flex items-center justify-center rounded-base">
                  <span className="text-main-foreground font-heading text-xl">L</span>
                </div>
                <span className="text-2xl font-heading tracking-tight">LingoSite</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="noShadow" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="noShadow" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-heading tracking-tight mb-2">My Sites</h1>
            <p className="text-foreground/70">
              {sites.length} sites • {sites.reduce((acc, site) => acc + site.languages, 0)} total languages
            </p>
          </div>
          <Link href="/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Site
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Total Sites</p>
                  <p className="text-3xl font-heading">{sites.length}</p>
                </div>
                <div className="w-12 h-12 bg-main/20 border-2 border-border rounded-base flex items-center justify-center">
                  <Globe className="w-6 h-6 text-main" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Total Views</p>
                  <p className="text-3xl font-heading">58K</p>
                </div>
                <div className="w-12 h-12 bg-chart-1/20 border-2 border-border rounded-base flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Languages</p>
                  <p className="text-3xl font-heading">{sites.reduce((acc, site) => acc + site.languages, 0)}</p>
                </div>
                <div className="w-12 h-12 bg-chart-3/20 border-2 border-border rounded-base flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Filter */}
        <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="mb-6">
          <TabsList>
            {languages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code}>
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card key={site.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-heading">{site.name}</CardTitle>
                  <Badge variant={site.status === 'live' ? 'default' : 'neutral'}>{site.status.toUpperCase()}</Badge>
                </div>
                <p className="text-sm text-foreground/70 font-mono">{site.url}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="font-base">{site.languages} Languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-base">{site.views} views</span>
                  </div>
                </div>
                <div className="text-xs text-foreground/70">Updated {site.updated}</div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/projects/${site.id}`} className="flex-1">
                    <Button size="sm" variant="noShadow" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no sites) */}
        {sites.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-main/20 border-2 border-border rounded-base flex items-center justify-center mx-auto mb-4">
              <Globe className="w-10 h-10 text-main" />
            </div>
            <h3 className="text-2xl font-heading mb-2">No sites yet</h3>
            <p className="text-foreground/70 mb-6">Create your first multilingual website to get started</p>
            <Link href="/projects/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Site
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
