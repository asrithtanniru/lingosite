'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { TextShimmer } from '@/components/ui/text-shimmer'

const HERO_WORDS = ['Language', 'Locales', 'Audiences', 'Markets', 'Regions']

function AnimatedHeroWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = HERO_WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (!isDeleting && letterIndex < currentWord.length) {
      timeout = setTimeout(() => setLetterIndex((value) => value + 1), 120)
    } else if (!isDeleting && letterIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && letterIndex > 0) {
      timeout = setTimeout(() => setLetterIndex((value) => value - 1), 80)
    } else if (isDeleting && letterIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((index) => (index + 1) % HERO_WORDS.length)
      }, 300)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [letterIndex, isDeleting, wordIndex])

  const text = HERO_WORDS[wordIndex].slice(0, letterIndex) || '\u00A0'

  return (
    <span className="inline-flex items-baseline min-w-[9ch] justify-center">
      <TextShimmer as="span" className="font-heading">
        {text}
      </TextShimmer>
      <span
        aria-hidden="true"
        className="ml-0.5 h-[1.1em] w-[2px] bg-foreground animate-pulse"
      />
    </span>
  )
}

export function HeroSection() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const router = useRouter()

  const handleSend = (message: string) => {
    router.push(`/projects/new?prompt=${encodeURIComponent(message)}`)
  }

  // Navigate to /projects/new when input is focused
  const handlePromptFocus = () => {
    router.push('/projects/new')
  }

  // Navigate to /projects/new when CTA button is clicked
  const handleStartBuilding = () => {
    router.push('/projects/new')
  }

  return (
    <section className="min-h-screen flex justify-center pt-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-12 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-border bg-secondary-background rounded-base animate-fade-in">
          <span className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></span>
          <span className="text-sm font-heading tracking-wide">MULTILINGUAL DEPLOYMENT IN SECONDS</span>
        </div>

        {/* Headline */}
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading tracking-tight leading-[1.1]">
            Build Websites.
            <br />
            <span className="relative inline-block">
              Any <AnimatedHeroWord />.
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-main/20 -z-10 rounded-base"></div>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed tracking-wide">
            LingoSite transforms your content into stunning multilingual websites instantly. No coding. No complexity. Just pure global reach.
          </p>
        </div>

        {/* AI Prompt Box */}

        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up delay-200">
          <PromptInputBox
            onSend={handleSend}
            placeholder="Describe your website idea..."
            // @ts-ignore
            onFocus={handlePromptFocus}
          />
        </div>

        {/* CTA Buttons */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button size="lg" className="text-lg px-8 py-6" onClick={handleStartBuilding}>
            Start Building Free
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="text-4xl font-heading">50+</div>
            <div className="text-sm font-heading text-foreground/70 tracking-wide">LANGUAGES</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-heading">10K+</div>
            <div className="text-sm font-heading text-foreground/70 tracking-wide">SITES BUILT</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-heading">99.9%</div>
            <div className="text-sm font-heading text-foreground/70 tracking-wide">UPTIME</div>
          </div>
        </div>
      </div>
    </section>
  )
}
