import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseServiceClient } from '@/lib/supabase-service'
import { GeneratedSiteViewer } from '@/components/generated-site-viewer'

type SitePageProps = {
  params: {
    slug: string
  }
  searchParams?: {
    lang?: string
  }
}

export const metadata: Metadata = {
  title: 'Site Preview - LingoSite',
}

async function getProjectBySlug(slug: string) {
  const { data, error } = await supabaseServiceClient
    .from('projects')
    .select('slug, language, jsx_source, jsx_localized, is_published')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) {
    console.error('Error loading project by slug:', error)
    return null
  }

  if (!data) return null

  return data as {
    slug: string
    language: string
    jsx_source: string
    jsx_localized: string | null
    is_published: boolean
  }
}

export default async function SitePage({ params, searchParams }: SitePageProps) {
  const slug = params.slug
  const lang = searchParams?.lang

  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const effectiveLanguage = lang || project.language || 'en'
  const localizedCode =
    typeof project.jsx_localized === 'string' && project.jsx_localized.length > 0
      ? project.jsx_localized
      : null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-main border-2 border-border flex items-center justify-center rounded-base">
              <span className="text-main-foreground font-heading text-lg">L</span>
            </div>
            <div>
              <h1 className="text-lg font-heading break-all">{project.slug}</h1>
              <p className="text-xs text-foreground/70">
                Previewing site in {effectiveLanguage.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GeneratedSiteViewer
          sourceCode={project.jsx_source}
          localizedCode={localizedCode}
          language={effectiveLanguage}
          expectedLocalized={effectiveLanguage !== 'en'}
        />
      </main>
    </div>
  )
}
