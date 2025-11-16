import { notFound } from 'next/navigation'
import { supabaseServiceClient } from '@/lib/supabase-service'

type SitePageProps = {
  params: { slug: string }
}

export default async function SiteBySlugPage({ params }: SitePageProps) {
  const { slug } = params

  const { data, error } = await supabaseServiceClient
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) {
    console.error('Failed to load project:', error)
    notFound()
  }

  if (!data) {
    notFound()
  }

  const project = data
  const localized = project.jsx_localized as string | null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading">{project.slug}</h1>
            <p className="text-sm text-foreground/70">
              Language: {project.language?.toUpperCase?.() ?? 'EN'}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="border-2 border-border rounded-base bg-white p-8"
          dangerouslySetInnerHTML={{ __html: localized || project.jsx_source }}
        />
      </main>
    </div>
  )
}

