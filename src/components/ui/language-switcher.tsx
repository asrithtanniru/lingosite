'use client'

import { useState } from 'react'

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' },
  { code: 'bn', label: 'Bengali' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
]

function getInitialLocale() {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/(?:^|; )lingo-locale=([^;]+)/)
  return match?.[1] ?? 'en'
}

export function LanguageSwitcher() {
  const [current, setCurrent] = useState<string>(() => getInitialLocale())

  const handleChange = (value: string) => {
    setCurrent(value)
    if (typeof document !== 'undefined') {
      document.cookie = `lingo-locale=${value}; path=/; max-age=31536000`
      window.location.reload()
    }
  }

  return (
    <select
      aria-label="Select interface language"
      className="border-2 border-border bg-secondary-background text-sm font-base rounded-base px-2 py-1"
      value={current}
      onChange={(event) => handleChange(event.target.value)}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  )
}

