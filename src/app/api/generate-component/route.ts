import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyDKANNtXIcaeEF1pMOaO6lElC5uVfg1BDs')

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectName = 'My Website' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const componentTemplate = `
You are a React component generator. Based on the user's prompt, create a single, complete React component using modern React practices and Tailwind CSS.

Rules:
1. Return ONLY the JSX component code, no imports or exports
2. Use Tailwind CSS classes for styling with a modern, clean design
3. Make it responsive and visually appealing
4. Use semantic HTML elements
5. The component should be self-contained and functional
6. Use the project name "${projectName}" where appropriate
7. Include sample content that matches the prompt
8. Use modern design patterns with good spacing and typography

User prompt: ${prompt}

Generate a React component:
`

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

    // Generate a unique ID for this component
    const componentId = Math.random().toString(36).substr(2, 9)

    // Store the component (you can replace this with a database later)
    const componentData = {
      id: componentId,
      code: cleanCode,
      prompt,
      projectName,
      createdAt: new Date().toISOString(),
    }

    // For now, we'll return the component data
    // In production, you might want to store this in a database
    return NextResponse.json({
      success: true,
      component: componentData,
      liveUrl: `/live/${componentId}`,
    })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: 'Failed to generate component' }, { status: 500 })
  }
}
