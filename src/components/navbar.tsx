'use client'

import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NavbarProps {
  scrolled: boolean
}

export function Navbar({ scrolled }: NavbarProps) {
  return (
    <nav className={cn(' top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-background/95 backdrop-blur-sm border-b-2 border-border' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-main border-2 border-border flex items-center justify-center rounded-base">
              <span className="text-main-foreground font-heading text-xl">L</span>
            </div>
            <span className="text-2xl font-heading tracking-tight">LingoSite</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-base hover:underline decoration-2 underline-offset-8 transition-all">
              Features
            </a>
            <a href="#demo" className="text-sm font-base hover:underline decoration-2 underline-offset-8 transition-all">
              Demo
            </a>
            <a href="#dashboard" className="text-sm font-base hover:underline decoration-2 underline-offset-8 transition-all">
              Dashboard
            </a>
            <a href="#faq" className="text-sm font-base hover:underline decoration-2 underline-offset-8 transition-all">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/auth">
              <Button className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
