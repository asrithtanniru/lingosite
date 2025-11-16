'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from './sections/hero-section'
import { FeaturesSection } from './sections/features-section'
import { DemoSection } from './sections/demo-section'
import { DashboardSection } from './sections/dashboard-section'
import { FAQSection } from './sections/faq-section'
import { Navbar } from './navbar'

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar scrolled={scrolled} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <DashboardSection />
        <FAQSection />
      </main>
      <footer className="border-t-2 border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-heading tracking-tight">LingoSite</h3>
              <p className="text-foreground/70 mt-2">Build multilingual websites in seconds</p>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:underline font-base">
                Privacy
              </a>
              <a href="#" className="hover:underline font-base">
                Terms
              </a>
              <a href="#" className="hover:underline font-base">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-foreground/70">© 2024 LingoSite. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
