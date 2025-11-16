import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject } from '@/lib/project-store'
import { Button } from '@/components/ui/button'
import { GeneratedSiteViewer } from '@/components/generated-site-viewer'

type SitePageProps = {
  params: { id: string }
  searchParams?: { lang?: string }
}

export default function SitePage({ params, searchParams }: SitePageProps) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

  const langParam = searchParams?.lang
  const preferredLocale =
    (langParam && project.availableLocales.includes(langParam)) || !langParam
      ? langParam
      : project.language

  const activeLocale = preferredLocale ?? project.language ?? project.sourceLocale

  const localizedJsx =
    activeLocale === project.sourceLocale ? null : project.localizedJsx[activeLocale]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="noShadow" size="sm">
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-heading">{project.name}</h1>
              <p className="text-sm text-foreground/70">
                Live site • {activeLocale.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <span>Available:</span>
            <div className="flex gap-1">
              {project.availableLocales.map((code) => (
                <Link
                  key={code}
                  href={`/site/${project.id}?lang=${code}`}
                  className={`px-2 py-0.5 rounded-base border text-xs ${
                    code === activeLocale ? 'border-main bg-main/10' : 'border-border'
                  }`}
                >
                  {code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GeneratedSiteViewer
          sourceCode={project.sourceJsx}
          localizedCode={localizedJsx}
          language={activeLocale}
        />
      </main>
    </div>
  )
}

