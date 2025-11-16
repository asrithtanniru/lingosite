'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Globe, BarChart3, Settings, ExternalLink } from 'lucide-react'

const sites = [
  {
    name: 'E-Commerce Store',
    url: 'mystore.com',
    languages: 12,
    status: 'live',
    views: '45.2K',
    updated: '2 hours ago',
  },
  {
    name: 'Portfolio Website',
    url: 'myportfolio.dev',
    languages: 8,
    status: 'live',
    views: '12.8K',
    updated: '1 day ago',
  },
  {
    name: 'Blog Platform',
    url: 'myblog.io',
    languages: 15,
    status: 'draft',
    views: '0',
    updated: '3 days ago',
  },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
]

export function DashboardSection() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  return (
    <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl sm:text-6xl font-heading tracking-tight">Your Command Center</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Manage all your multilingual sites from one powerful dashboard</p>
        </div>

        {/* Dashboard Preview */}
        <div className="border-2 border-border bg-secondary-background rounded-base p-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-heading tracking-tight mb-2">My Sites</h3>
              <p className="text-foreground/70">
                {sites.length} sites • {sites.reduce((acc, site) => acc + site.languages, 0)} languages
              </p>
            </div>
            <Button>+ New Site</Button>
          </div>

          {/* Language Tabs */}
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="mb-8">
            <TabsList>
              {languages.map((lang) => (
                <TabsTrigger key={lang.code} value={lang.code}>
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Site Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site, index) => (
              <Card key={index}>
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
                    <Button size="sm" variant="noShadow" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Publish Button (disabled for now) */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              disabled
              className="text-lg px-12 py-6 bg-muted text-foreground/60 cursor-not-allowed"
            >
              Publish feature coming soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
