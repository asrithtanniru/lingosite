import { LingoDotDevEngine } from 'lingo.dev/sdk'

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

export async function translateGeneratedJsx(jsxSource: string, sourceLocale: string, targetLocale: string): Promise<string> {
  if (!jsxSource) return jsxSource
  if (!targetLocale || sourceLocale === targetLocale) return jsxSource

  const engineInstance = getEngine()
  if (!engineInstance) {
    console.warn('Lingo engine not available, returning source JSX')
    return jsxSource
  }

  try {
    console.log(`Translating JSX from ${sourceLocale} to ${targetLocale}...`)

    // Convert JSX to HTML-compatible format by replacing className with class
    const htmlCompatible = jsxSource.replace(/className=/g, 'class=')

    // Use localizeHtml which properly handles HTML structure
    const localizedHtml = await engineInstance.localizeHtml(htmlCompatible, {
      sourceLocale,
      targetLocale,
      fast: true,
    })

    const stripped = stripHtmlDocumentWrapper(localizedHtml)

    // Convert back to JSX by replacing class with className
    let jsxRestored = stripped
      .replace(/\bclass=/g, 'className=')
      // Fix any other HTML attributes that need to be camelCase for JSX
      .replace(/\bfor=/g, 'htmlFor=')
      .replace(/\btabindex=/gi, 'tabIndex=')
      .replace(/\bautocomplete=/gi, 'autoComplete=')
      .replace(/\bautofocus=/gi, 'autoFocus=')
      .replace(/\breadonly=/gi, 'readOnly=')
      .replace(/\bmaxlength=/gi, 'maxLength=')
      .replace(/\bminlength=/gi, 'minLength=')
      // SVG attributes
      .replace(/\bstrokewidth=/gi, 'strokeWidth=')
      .replace(/\bstrokelinecap=/gi, 'strokeLinecap=')
      .replace(/\bstrokelinejoin=/gi, 'strokeLinejoin=')
      .replace(/\bfillrule=/gi, 'fillRule=')
      .replace(/\bfillopacity=/gi, 'fillOpacity=')
      .replace(/\bstrokeopacity=/gi, 'strokeOpacity=')
      .replace(/\bcliprule=/gi, 'clipRule=')
      .replace(/\bviewbox=/gi, 'viewBox=')
      .replace(/\bstopcolor=/gi, 'stopColor=')
      .replace(/\bstopopacity=/gi, 'stopOpacity=')

    // Fix malformed self-closing tags that might have been broken
    jsxRestored = jsxRestored.replace(/(<(img|br|hr|input|meta|link)[^>]*?)>\s*<\/\2>/gi, '$1 />')

    // Ensure proper self-closing syntax for void elements
    jsxRestored = jsxRestored.replace(/(<(?:img|br|hr|input|meta|link)[^>]*?)(?<!\/)>/gi, '$1 />')

    console.log(`Translation complete for ${targetLocale}`)

    return jsxRestored || jsxSource
  } catch (error) {
    console.error('Lingo.dev translation failed, returning source JSX:', error)
    return jsxSource
  }
}
