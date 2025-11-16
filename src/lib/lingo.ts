import { LingoDotDevEngine } from "lingo.dev/sdk"

let engine: LingoDotDevEngine | null = null

function getEngine() {
  const apiKey = process.env.LINGODOTDEV_API_KEY || process.env.LINGO_API_KEY

  if (!apiKey) {
    console.warn('Lingo.dev API key is not set. Falling back to source JSX.')
    return null
  }

  if (!engine) {
    engine = new LingoDotDevEngine({
      apiKey,
    })
  }

  return engine
}

function stripHtmlDocumentWrapper(html: string): string {
  if (!html) return html

  let output = html.trim()

  // Remove <!doctype ...> if present
  output = output.replace(/<!doctype[^>]*>/i, '').trim()

  const bodyMatch = output.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (bodyMatch && bodyMatch[1]) {
    output = bodyMatch[1].trim()
  }

  // If the whole thing is still wrapped in a single <html> tag, unwrap it
  const htmlMatch = output.match(/^<html[^>]*>([\s\S]*?)<\/html>$/i)
  if (htmlMatch && htmlMatch[1]) {
    output = htmlMatch[1].trim()
  }

  return output
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
    const localizedHtml = await engineInstance.localizeHtml(jsxSource, {
      sourceLocale,
      targetLocale,
      fast: true,
    })

    const stripped = stripHtmlDocumentWrapper(localizedHtml)

    // Fallback to original if stripping produced an empty string
    return stripped || jsxSource
  } catch (error) {
    console.error('Lingo.dev translation failed, returning source JSX:', error)
    return jsxSource
  }
}
