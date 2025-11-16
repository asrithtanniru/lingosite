import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createProject } from '@/lib/project-store'
import { translateGeneratedJsx } from '@/lib/lingo'

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectName = 'My Website', language = 'en' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const componentTemplate = `You are an expert React UI/UX designer specialized in creating stunning, colorful, modern, **casual, and minimal** websites. Generate a beautiful, fully-styled React component based on the user's prompt.

CRITICAL RULES - MUST FOLLOW EXACTLY:
1. Use ONLY JSX syntax - no imports, no exports, no function declarations
2. Use "className" (camelCase) for CSS classes - NOT "classname" or "class"
3. Use proper camelCase for ALL attributes: strokeWidth, strokeLinecap, fillRule, fillOpacity, stopColor, viewBox
4. All text content must be in ENGLISH ONLY (translation happens automatically later)
5. EVERY element MUST have Tailwind CSS classes - NO unstyled elements
6. Use self-closing tags: <img />, <br />, <hr />

**COLOR & CONTRAST REQUIREMENTS (CRITICAL - FOCUS ON LIGHT, CASUAL THEMES):**
✓ CORRECT Examples:
  - **Primary Backgrounds (Light & Minimal):** bg-gray-50 text-black OR bg-white text-black OR bg-blue-50 text-black
  - **Colored Accents (Light & Friendly):** bg-blue-100 text-black OR bg-emerald-50 text-black
  - **Vibrant Gradients (for subtle highlights):** bg-gradient-to-br from-white to-blue-50 text-black
  - **Cards:** bg-white text-black shadow-md border border-black

✗ WRONG - AVOID GRAY, WHITE, OR LIGHT TEXT:
  - text-gray-800, text-gray-700, text-gray-600 (Use text-black ONLY)
  - text-white on light backgrounds (invisible!)
  - text-blue-500, text-emerald-500 (Use text-black ONLY)
  - Missing text color classes
  - bg-white buttons WITHOUT border-2 border-black (NEVER do this - white buttons are invisible without borders!)

**REQUIRED STYLING (CASUAL, SIMPLE, MINIMAL):**
- Root container: ALWAYS use min-h-screen with **light, simple backgrounds (e.g., bg-gray-50)**
- **Hero sections:** Light backgrounds (bg-white or bg-blue-50), ample padding (py-16 or py-20), soft shadows
- **Buttons (Simple & Friendly - MUST HAVE BLACK BORDER):** bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl border-2 border-black
- **ALL Buttons MUST have:** border-2 border-black (no exceptions - especially white/light colored buttons like bg-white which are invisible without borders)
- **Cards (Clean):** bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-black
- **Images (Publicly Renderable):** Use generic image URLs or publicly renderable image placeholders. **Must use friendly, high-quality, non-monochromatic images.** rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300
- **Typography (ALWAYS USE BLACK TEXT):** font-semibold text-3xl lg:text-5xl text-black for headers. NEVER use text-gray-800, text-gray-700, text-gray-600, or any gray text. ALWAYS use text-black.
- **All text MUST be:** text-black (headings, paragraphs, descriptions, everything)
- Spacing: p-8 py-12 px-6 gap-6 space-y-8
- Hover effects: hover:scale-[1.02] hover:shadow-xl transition-all duration-300
- Responsive: sm:text-lg md:text-xl lg:text-3xl, grid-cols-1 md:grid-cols-2

STRUCTURE REQUIREMENTS:
- Include multiple sections: hero, features, gallery/showcase, call-to-action
- Use container mx-auto max-w-6xl for content width (slightly narrower for a cleaner look)
- Add **minimal and friendly** visual elements: simple icons, light images
- Include interactive elements: buttons with hover states
- Make it responsive with sm:, md:, lg: breakpoints

EXAMPLE VALID JSX:
<div className="min-h-screen bg-gray-50">
  <div className="relative py-20 px-6 bg-white shadow-sm">
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-5xl lg:text-6xl font-extrabold text-black text-center mb-4">
        Casual Landing Page Title
      </h1>
      <p className="text-xl text-black text-center max-w-3xl mx-auto mb-8">
        A simple, friendly, and minimal introduction to your great service.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">
          Start Exploring
        </button>
        <button className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 rounded-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">
          Read Our Story
        </button>
      </div>
    </div>
  </div>
  
  <div className="py-16 px-6">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl font-bold text-black text-center mb-12">Simple Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-xl font-bold text-black mb-2">Clean Design</h3>
          <p className="text-black">Minimalist aesthetic ensures a pleasant user experience.</p>
        </div>
      </div>
    </div>
  </div>
</div>

User prompt: ${prompt}

CRITICAL REMINDERS:
- ALL text MUST be text-black (no text-gray-800, text-gray-700, text-gray-600, text-white on light bg)
- ALL buttons MUST have border-2 border-black
- Use light backgrounds (bg-white, bg-gray-50) with text-black ONLY
Generate ONLY the JSX markup.`

    const result = await model.generateContent(componentTemplate)
    const generatedCode = result.response.text()

    // Clean up the code (remove markdown backticks, imports/exports, and wrap in <div> if needed)
    let cleanCode = generatedCode
      .replace(/```[a-z]*[\r\n]?/gi, '')
      .replace(/import .+?;[\r\n]*/g, '')
      .replace(/export (default )?/g, '')
      .trim()

    // Fix common JSX syntax errors
    cleanCode = cleanCode
      // Fix classname -> className
      .replace(/\bclassname=/gi, 'className=')
      // Fix strokewidth -> strokeWidth
      .replace(/\bstrokewidth=/gi, 'strokeWidth=')
      // Fix strokelinecap -> strokeLinecap
      .replace(/\bstrokelinecap=/gi, 'strokeLinecap=')
      // Fix strokelinejoin -> strokeLinejoin
      .replace(/\bstrokelinejoin=/gi, 'strokeLinejoin=')
      // Fix fillrule -> fillRule
      .replace(/\bfillrule=/gi, 'fillRule=')
      // Fix cliprule -> clipRule
      .replace(/\bclip-rule=/gi, 'clipRule=')
      // Fix malformed style attributes (e.g., style="{{...}}" -> style={{...}})
      .replace(/style="{{([^}]+)}}"/g, 'style={{$1}}')
      .replace(/style="{([^}]+)}"/g, 'style={{$1}}')

    // If code starts with multiple root elements or not wrapped, wrap in <div>
    const isWrapped = cleanCode.startsWith('<div') || cleanCode.startsWith('(<') || cleanCode.startsWith('<React.Fragment') || cleanCode.startsWith('<>')

    if (!isWrapped) {
      cleanCode = `<div>\n${cleanCode}\n</div>`
    }

    const sourceLocale = 'en'
    const targetLanguage = language || sourceLocale

    // Remove inline JSX comments before sending content for localization
    // so translated output doesn't contain React comment markers.
    const translatableCode = cleanCode.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

    let localizedCode = cleanCode

    if (targetLanguage && targetLanguage !== sourceLocale) {
      localizedCode = await translateGeneratedJsx(translatableCode, sourceLocale, targetLanguage)
    }

    const project = createProject({
      name: projectName,
      prompt,
      language: targetLanguage,
      sourceLocale,
      sourceJsx: cleanCode,
      localizedJsx:
        targetLanguage !== sourceLocale
          ? {
              [targetLanguage]: localizedCode,
            }
          : {},
    })

    const componentData = {
      id: project.id,
      code: cleanCode,
      localizedCode: targetLanguage !== sourceLocale ? localizedCode : null,
      prompt,
      projectName: project.name,
      language: targetLanguage,
      createdAt: project.createdAt,
    }

    return NextResponse.json({
      success: true,
      component: componentData,
      liveUrl: `/live/${project.id}`,
      siteUrl: `/site/${project.id}`,
    })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: 'Failed to generate component' }, { status: 500 })
  }
}
