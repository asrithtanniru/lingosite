import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { LingoProvider, loadDictionary } from 'lingo.dev/react/rsc'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'LingoSite - Multilingual Website Builder',
  description:
    'Build and deploy multilingual websites effortlessly with AI-powered translations and one-click global deployment.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LingoProvider loadDictionary={(locale) => loadDictionary(locale)}>
      <html lang="en" data-scroll-behavior="smooth">
        <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
      </html>
    </LingoProvider>
  )
}
