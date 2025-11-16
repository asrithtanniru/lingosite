import { LingoDotDevEngine } from '@lingo.dev/_sdk'

let engine: LingoDotDevEngine | null = null

function getEngine() {
  if (!process.env.LINGO_API_KEY) {
    console.warn('LINGO_API_KEY is not set. Falling back to source JSX.')
    return null
  }

  if (!engine) {
    engine = new LingoDotDevEngine({
      apiKey: process.env.LINGO_API_KEY,
      apiUrl: process.env.LINGO_API_URL,
    })
  }

  return engine
}

export async function translateGeneratedJsx(
  jsxSource: string,
  sourceLocale: string,
  targetLocale: string,
): Promise<string> {
  if (!jsxSource) return jsxSource
  if (!targetLocale || sourceLocale === targetLocale) return jsxSource

  const engineInstance = getEngine()
  if (!engineInstance) {
    return jsxSource
  }

  try {
    const localized = await engineInstance.localizeHtml(jsxSource, {
      sourceLocale,
      targetLocale,
      fast: true,
    })

    return localized
  } catch (error) {
    console.error('Lingo.dev translation failed, returning source JSX:', error)
    return jsxSource
  }
}

