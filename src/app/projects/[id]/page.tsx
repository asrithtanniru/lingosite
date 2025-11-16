'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Globe, BarChart3, Settings, ExternalLink, Save, Trash2, ArrowLeft, Eye, Code, Languages as LanguagesIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const projectData = {
  '1': {
    id: '1',
    name: 'E-Commerce Store',
    url: 'mystore.com',
    status: 'live',
    languages: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'it', 'ru', 'ar', 'ko', 'hi'],
    views: '45.2K',
    updated: '2 hours ago',
  },
  '2': {
    id: '2',
    name: 'Portfolio Website',
    url: 'myportfolio.dev',
    status: 'live',
    languages: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'it'],
    views: '12.8K',
    updated: '1 day ago',
  },
  '3': {
    id: '3',
    name: 'Blog Platform',
    url: 'myblog.io',
    status: 'draft',
    languages: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'it', 'ru', 'ar', 'ko', 'hi', 'vi', 'th', 'pl'],
    views: '0',
    updated: '3 days ago',
  },
}

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  zh: 'Chinese',
  pt: 'Portuguese',
  it: 'Italian',
  ru: 'Russian',
  ar: 'Arabic',
  ko: 'Korean',
  hi: 'Hindi',
  vi: 'Vietnamese',
  th: 'Thai',
  pl: 'Polish',
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params?.id as string
  const project = projectData[projectId as keyof typeof projectData]

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading mb-4">Project not found</h1>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="noShadow" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-main border-2 border-border flex items-center justify-center rounded-base">
                  <span className="text-main-foreground font-heading text-xl">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-heading">{project.name}</h1>
                  <p className="text-sm text-foreground/70">{project.url}</p>
                </div>
                <Badge variant={project.status === 'live' ? 'default' : 'neutral'}>{project.status.toUpperCase()}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="noShadow" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content">
              <Code className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="languages">
              <LanguagesIcon className="w-4 h-4 mr-2" />
              Languages
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Total Views</p>
                      <p className="text-3xl font-heading">{project.views}</p>
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
                      <p className="text-3xl font-heading">{project.languages.length}</p>
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
                      <p className="text-sm text-foreground/70 mb-1">Last Updated</p>
                      <p className="text-lg font-heading">{project.updated}</p>
                    </div>
                    <div className="w-12 h-12 bg-chart-3/20 border-2 border-border rounded-base flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-chart-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.languages.map((lang) => (
                    <div key={lang} className="p-3 border-2 border-border rounded-base bg-secondary-background hover:bg-main/10 transition-colors">
                      <span className="font-base text-sm">{languageNames[lang] || lang.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground/70">Select a language to edit content</p>
              <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="px-4 py-2 border-2 border-border rounded-base bg-secondary-background font-base">
                {project.languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang] || lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Editor - {languageNames[selectedLanguage]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-base mb-2">Page Title</label>
                  <Input placeholder="Enter page title" defaultValue="Welcome to our site" />
                </div>
                <div>
                  <label className="block text-sm font-base mb-2">Meta Description</label>
                  <Input placeholder="Enter meta description" defaultValue="Discover amazing products" />
                </div>
                <div>
                  <label className="block text-sm font-base mb-2">Main Content</label>
                  <textarea
                    className="w-full min-h-[200px] p-3 border-2 border-border rounded-base bg-secondary-background font-base resize-none"
                    placeholder="Enter main content"
                    defaultValue="This is the main content of your page..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>
                    <Globe className="w-4 h-4 mr-2" />
                    Add New Language
                  </Button>
                  <div className="grid grid-cols-1 gap-3">
                    {project.languages.map((lang) => (
                      <div key={lang} className="flex items-center justify-between p-4 border-2 border-border rounded-base bg-secondary-background">
                        <span className="font-base">{languageNames[lang] || lang.toUpperCase()}</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="noShadow">
                            Edit
                          </Button>
                          <Button size="sm" variant="noShadow">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-base mb-2">Project Name</label>
                  <Input defaultValue={project.name} />
                </div>
                <div>
                  <label className="block text-sm font-base mb-2">Domain</label>
                  <Input defaultValue={project.url} />
                </div>
                <div>
                  <label className="block text-sm font-base mb-2">Status</label>
                  <select defaultValue={project.status} className="w-full px-4 py-2 border-2 border-border rounded-base bg-secondary-background font-base">
                    <option value="draft">Draft</option>
                    <option value="live">Live</option>
                  </select>
                </div>
                <div className="pt-4 border-t-2 border-border">
                  <Button variant="noShadow" className="text-red-600 border-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
