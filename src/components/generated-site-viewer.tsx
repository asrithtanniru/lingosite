'use client'

import { useMemo, useState } from 'react'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import { Button } from '@/components/ui/button'

type GeneratedSiteViewerProps = {
  sourceCode: string
  localizedCode?: string | null
  language: string
}

export function GeneratedSiteViewer({ sourceCode, localizedCode, language }: GeneratedSiteViewerProps) {
  const [view, setView] = useState<'source' | 'localized'>(
    localizedCode && language !== 'en' ? 'localized' : 'source',
  )

  const { wrappedCode, hasLocalized } = useMemo(() => {
    const hasLocalizedVariant = Boolean(localizedCode && localizedCode.trim().length > 0)
    const activeCode =
      view === 'localized' && hasLocalizedVariant && language !== 'en' ? localizedCode! : sourceCode

    const code = `function Component() {
  return (
    ${activeCode}
  );
}

render(<Component />);`

    return {
      wrappedCode: code,
      hasLocalized: hasLocalizedVariant && language !== 'en',
    }
  }, [language, localizedCode, sourceCode, view])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={view === 'source' ? 'default' : 'noShadow'}
            onClick={() => setView('source')}
          >
            Original (English)
          </Button>
          {hasLocalized && (
            <Button
              size="sm"
              variant={view === 'localized' ? 'default' : 'noShadow'}
              onClick={() => setView('localized')}
            >
              Localized ({language.toUpperCase()})
            </Button>
          )}
        </div>
      </div>

      <div className="border-2 border-border rounded-base bg-white p-8 min-h-[600px]">
        <LiveProvider code={wrappedCode} noInline={true}>
          <LivePreview />
          <LiveError className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded text-red-800 text-sm" />
        </LiveProvider>
      </div>
    </div>
  )
}

