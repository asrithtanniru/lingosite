'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams, useSearchParams } from 'next/navigation'
import { LiveProvider, LivePreview, LiveError } from 'react-live'

export default function SitePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const componentId = params?.id as string
  const [componentData, setComponentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get component from localStorage
    const storedComponent = localStorage.getItem(`component_${componentId}`)
    if (storedComponent) {
      setComponentData(JSON.parse(storedComponent))
    }
    setLoading(false)
  }, [componentId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!componentData) {
    notFound()
  }

  const langParam = searchParams?.get('lang')
  const activeLocale = langParam || componentData.language || 'en'

  // Get the JSX to render
  let jsxToRender = componentData.code
  if (componentData.localizedCode && activeLocale !== 'en') {
    jsxToRender = componentData.localizedCode
  }

  // Wrap JSX for rendering
  const wrappedCode = `function Component() {
  return (
    ${jsxToRender}
  );
}

render(<Component />);`

  return (
    <div className="min-h-screen">
      <LiveProvider code={wrappedCode} noInline={true}>
        <LivePreview />
        <LiveError className="fixed bottom-4 right-4 max-w-lg p-4 bg-red-50 border-2 border-red-500 rounded text-red-800 text-sm shadow-lg" />
      </LiveProvider>
    </div>
  )
}
