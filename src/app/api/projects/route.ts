import { NextRequest, NextResponse } from 'next/server'
import { supabaseServiceClient } from '@/lib/supabase-service'

type CreateProjectPayload = {
  name: string
  slug?: string
  jsxSource: string
  jsxLocalized?: string | null
  language: string
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function generateSlug(name: string) {
  const base = slugify(name || 'project')
  const suffix = Math.random().toString(36).slice(2, 8)
  return `${base}-${suffix}`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateProjectPayload

    if (!body.name || !body.jsxSource || !body.language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const authHeader = request.headers.get('authorization')
    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length)
      : null

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userResult, error: userError } = await supabaseServiceClient.auth.getUser(
      accessToken,
    )

    if (userError || !userResult?.user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
    }

    const userId = userResult.user.id
    const slug = body.slug || generateSlug(body.name)

    const { data, error } = await supabaseServiceClient
      .from('projects')
      .insert({
        user_id: userId,
        slug,
        jsx_source: body.jsxSource,
        jsx_localized: body.jsxLocalized ?? null,
        language: body.language,
        is_published: true,
      })
      .select('slug')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save project' }, { status: 500 })
    }

    return NextResponse.json({ success: true, slug: data.slug })
  } catch (error) {
    console.error('Create project API error:', error)
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 })
  }
}

