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

    const componentTemplate = `You are generating a React page.
Output a single self-contained JSX component for a marketing/landing page or simple website based on the user prompt.
The JSX must be valid React code.
Use English for all textual content (headings, paragraphs, buttons, etc.) because a separate localization system will translate it later.
Do NOT include imports for React or Next; just the JSX tree or a single component body.
Use Tailwind CSS classes for styling and a modern, responsive design.
Use the project name "${projectName}" where appropriate.

User prompt:
${prompt}

Return ONLY the JSX.`

    const result = await model.generateContent(componentTemplate)
    const generatedCode = result.response.text()

    // Clean up the code (remove markdown backticks, imports/exports, and wrap in <div> if needed)
    let cleanCode = generatedCode
      .replace(/```[a-z]*[\r\n]?/gi, '')
      .replace(/import .+?;[\r\n]*/g, '')
      .replace(/export (default )?/g, '')
      .trim()

    // If code starts with multiple root elements or not wrapped, wrap in <div>
    const isWrapped = cleanCode.startsWith('<div') || cleanCode.startsWith('(<') || cleanCode.startsWith('<React.Fragment') || cleanCode.startsWith('<>')

    if (!isWrapped) {
      cleanCode = `<div>\n${cleanCode}\n</div>`
    }

    const sourceLocale = 'en'
    const targetLanguage = language || sourceLocale

    let localizedCode = cleanCode

    if (targetLanguage && targetLanguage !== sourceLocale) {
      localizedCode = await translateGeneratedJsx(cleanCode, sourceLocale, targetLanguage)
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
