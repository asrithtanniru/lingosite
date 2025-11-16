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

        <div className="relative aspect-video max-w-4xl mx-auto border-2 border-border rounded-base bg-main-foreground/10 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary-background border-2 border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-10 h-10 text-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary-background border border-border"></div>
              <div className="w-3 h-3 rounded-full bg-secondary-background border border-border"></div>
              <div className="w-3 h-3 rounded-full bg-secondary-background border border-border"></div>
            </div>
            <span className="text-sm font-heading bg-secondary-background text-foreground px-3 py-1 border-2 border-border rounded-base">1:23</span>
          </div>
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
