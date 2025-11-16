'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Code, Eye, Globe, Download } from 'lucide-react'
import Link from 'next/link'
import { LiveProvider, LivePreview, LiveError } from 'react-live'

// Sample components storage (replace with database in production)
const sampleComponents: Record<string, any> = {}

export default function LivePage() {
  const params = useParams()
  const router = useRouter()
  const componentId = params?.id as string
  const [componentData, setComponentData] = useState<any>(null)
  const [isPreview, setIsPreview] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState('')

  useEffect(() => {
    // Get component from localStorage (temporary solution)
    const storedComponent = localStorage.getItem(`component_${componentId}`)
    if (storedComponent) {
      setComponentData(JSON.parse(storedComponent))
    }
    setIsLoading(false)
  }, [componentId])

  const handlePublish = async () => {
    setIsPublishing(true)

    // Simulate publishing (replace with actual API call later)
    try {
      // In production, this would call your deployment API
      // await fetch('/api/publish', { method: 'POST', body: JSON.stringify({ componentId }) })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const publishUrl = `/site/${componentId}`
      setPublishedUrl(publishUrl)
      setIsPublished(true)
      setShowPublishModal(false)

      // Store publish status
      const updatedData = { ...componentData, published: true, publishedUrl: publishUrl }
      localStorage.setItem(`component_${componentId}`, JSON.stringify(updatedData))
      setComponentData(updatedData)

      router.push(publishUrl)
    } catch (error) {
      console.error('Publish failed:', error)
      alert('Failed to publish. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-main border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-heading">Loading your component...</h1>
        </div>
      </div>
    )
  }

  if (!componentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading mb-4">Component not found</h1>
          <p className="text-foreground/70 mb-6">This component might have expired or the ID is invalid.</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Wrap the code in a function component format for react-live
  const wrappedCode = `function Component() {
  return (
    ${componentData.code}
  );
}

render(<Component />);`

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
              <div>
                <h1 className="text-xl font-heading">{componentData.projectName}</h1>
                <p className="text-sm text-foreground/70">Live Preview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={isPreview ? 'default' : 'noShadow'} size="sm" onClick={() => setIsPreview(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant={!isPreview ? 'default' : 'noShadow'} size="sm" onClick={() => setIsPreview(false)}>
                <Code className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button size="sm" variant="noShadow">
                <Globe className="w-4 h-4 mr-2" />
                Translate
              </Button>
              <Button size="sm" onClick={() => setShowPublishModal(true)} disabled={isPublished} className={isPublished ? 'bg-green-600 hover:bg-green-700' : ''}>
                {isPublished ? '✓ Published' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
        {isPublished && (
          <div className="bg-green-600 text-white py-2 px-4 text-center text-sm">
            🎉 Published successfully! View at:{' '}
            <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold">
              {publishedUrl}
            </a>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prompt Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generated from prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 italic">"${componentData.prompt}"</p>
            <p className="text-sm text-foreground/50 mt-2">Created on {new Date(componentData.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        {/* Component Display */}
        {isPreview ? (
          <div className="border-2 border-border rounded-base bg-white p-8 min-h-[600px]">
            <LiveProvider code={wrappedCode} noInline={true}>
              <LivePreview />
              <LiveError className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded text-red-800 text-sm" />
            </LiveProvider>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Component Code</span>
                <Button size="sm" variant="noShadow">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary-background p-6 rounded-base overflow-auto text-sm border-2 border-border">
                <code>{componentData.code}</code>
              </pre>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-overlay z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Publish Your Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">Publishing will make your site live and accessible at:</p>
              <div className="p-3 bg-secondary-background border-2 border-border rounded-base">
                <p className="font-mono text-sm break-all">{componentData.projectName.toLowerCase().replace(/\s+/g, '-')}.linguallyric.app</p>
              </div>
              <p className="text-sm text-foreground/70">You can add a custom domain and enable translations after publishing.</p>
              <div className="flex gap-3">
                <Button variant="noShadow" className="flex-1" onClick={() => setShowPublishModal(false)} disabled={isPublishing}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handlePublish} disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : 'Publish Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
