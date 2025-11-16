'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Globe, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { TextShimmer } from '@/components/ui/text-shimmer'

const popularLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
]

function NewProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [projectName, setProjectName] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')

  // On mount, checking for prompt in query params
  useEffect(() => {
    const promptFromQuery = searchParams.get('prompt')
    if (promptFromQuery && !aiPrompt) {
      setAiPrompt(promptFromQuery)
    }
  }, [searchParams, aiPrompt])

  const toggleLanguage = (code: string) => {
    if (selectedLanguages.includes(code)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== code))
    } else {
      setSelectedLanguages([...selectedLanguages, code])
    }
  }

  const handleAiGenerate = async (message: string) => {
    setAiPrompt(message)
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          projectName: projectName || 'My Website',
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store component in localStorage (temporary solution)
        localStorage.setItem(`component_${data.component.id}`, JSON.stringify(data.component))

        // Set project details
        setProjectName(data.component.projectName)
        setProjectUrl('mywebsite.com')
        setIsGenerating(false)

        // Navigate to live preview
        router.push(data.liveUrl)
      } else {
        throw new Error(data.error || 'Failed to generate component')
      }
    } catch (error) {
      console.error('Generation failed:', error)
      setIsGenerating(false)
      // Show error to user (you can add a toast notification here)
      alert('Failed to generate component. Please try again.')
    }
  }

  const handleCreate = () => {
    // Simulate project creation
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
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
              <h1 className="text-xl font-heading">Create New Site</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <span className="font-base">Step {step} of 3</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: AI Generation or Manual */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-heading">Let's create your site</h2>
              <p className="text-xl text-foreground/70">Describe your website idea and we'll generate it for you</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-main" />
                  AI-Powered Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PromptInputBox
                  onSend={handleAiGenerate}
                  placeholder="Describe your website... (e.g., 'A modern e-commerce site for selling handmade jewelry')"
                  isLoading={isGenerating}
                  initialValue={aiPrompt}
                />
                {isGenerating && (
                  <div className="p-6 border-2 border-border bg-secondary-background rounded-base">
                    <TextShimmer className="font-mono text-lg font-heading" duration={1}>
                      Generating your multilingual site...
                    </TextShimmer>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-foreground/70 font-base">Or create manually</span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Manual Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-base mb-2">Project Name</label>
                  <Input placeholder="My Awesome Website" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-base mb-2">Domain (optional)</label>
                  <Input placeholder="mywebsite.com" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
                </div>
                <Button onClick={() => setStep(2)} disabled={!projectName} className="w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Languages */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-heading">Choose languages</h2>
              <p className="text-xl text-foreground/70">Select the languages you want your site to support</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Popular Languages</span>
                  <span className="text-sm font-base text-foreground/70">{selectedLanguages.length} selected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {popularLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`p-4 border-2 rounded-base transition-all ${
                        selectedLanguages.includes(lang.code) ? 'border-main bg-main/10' : 'border-border bg-secondary-background hover:bg-main/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-base">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <Button variant="noShadow" className="w-full mt-4">
                  <Globe className="w-4 h-4 mr-2" />
                  Add More Languages
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="noShadow" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={selectedLanguages.length === 0} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review and Create */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-heading">Review your site</h2>
              <p className="text-xl text-foreground/70">Everything looks good? Let's create it!</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Site Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-base text-foreground/70 mb-1">Project Name</label>
                  <p className="font-heading text-lg">{projectName}</p>
                </div>
                {projectUrl && (
                  <div>
                    <label className="block text-sm font-base text-foreground/70 mb-1">Domain</label>
                    <p className="font-heading text-lg">{projectUrl}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-base text-foreground/70 mb-1">Languages ({selectedLanguages.length})</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedLanguages.map((code) => {
                      const lang = popularLanguages.find((l) => l.code === code)
                      return (
                        <div key={code} className="px-3 py-1 border-2 border-border rounded-base bg-secondary-background">
                          <span className="text-sm font-base">
                            {lang?.flag} {lang?.name || code}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {aiPrompt && (
                  <div>
                    <label className="block text-sm font-base text-foreground/70 mb-1">AI Prompt</label>
                    <p className="text-sm text-foreground/70 italic">{aiPrompt}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="noShadow" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleCreate} className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Site
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default NewProjectPage
