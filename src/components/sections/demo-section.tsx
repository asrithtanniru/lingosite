'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function DemoSection() {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-main text-main-foreground">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl sm:text-6xl font-heading tracking-tight">See It In Action</h2>
          <p className="text-xl text-main-foreground/80 max-w-2xl mx-auto">Watch how LingoSite transforms a single page into a complete multilingual experience in under 60 seconds</p>
        </div>

        <div className="relative aspect-video max-w-4xl mx-auto border-2 border-border rounded-base bg-main-foreground/10 overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/8BPkrrkW6tU?si=3LrTHgeZYkb7GRIO"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-lg px-8 py-6 bg-secondary-background text-foreground hover:bg-secondary-background/90">
            Try Building Your Site Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="noShadow" className="text-lg px-8 py-6 bg-transparent text-main-foreground border-main-foreground hover:bg-main-foreground/10">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
