import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'LingoSite - Multilingual Website Builder',
  description: 'Build and deploy multilingual websites effortlessly with AI-powered translations and one-click global deployment.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  )
}
