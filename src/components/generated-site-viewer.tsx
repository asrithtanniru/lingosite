'use client'

import { useMemo, useState } from 'react'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import { Button } from '@/components/ui/button'

type GeneratedSiteViewerProps = {
  sourceCode: string
  localizedCode?: string | null
  language: string
  expectedLocalized?: boolean
}

export function GeneratedSiteViewer({
  sourceCode,
  localizedCode,
  language,
  expectedLocalized = false,
}: GeneratedSiteViewerProps) {
  const [view, setView] = useState<'source' | 'localized'>(
    localizedCode && language !== 'en' ? 'localized' : 'source',
  )

  const { wrappedCode, hasLocalized } = useMemo(() => {
    const trimmedSource = sourceCode?.trim?.() ?? ''
    const trimmedLocalized = localizedCode?.trim?.() ?? ''
    const hasLocalizedVariant =
      Boolean(trimmedLocalized.length > 0) && trimmedLocalized !== trimmedSource

    const code = `function Component() {
  return (
    ${sourceCode}
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
      {expectedLocalized && !hasLocalized && language !== 'en' && (
        <div className="border-2 border-amber-400 bg-amber-50 text-amber-900 text-sm rounded-base px-4 py-3">
          Translation for <span className="font-semibold">{language.toUpperCase()}</span> is
          temporarily unavailable. Showing the original English version instead.
        </div>
      )}
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

      {view === 'source' && (
        <div className="border-2 border-border rounded-base bg-white p-8 min-h-[600px]">
          <LiveProvider code={wrappedCode} noInline={true}>
            <LivePreview />
            <LiveError className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded text-red-800 text-sm" />
          </LiveProvider>
        </div>
      )}

      {view === 'localized' && hasLocalized && (
        <div className="border-2 border-border rounded-base bg-white p-8 min-h-[600px]">
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: localizedCode || sourceCode }}
          />
        </div>
      )}
    </div>
  )
}
