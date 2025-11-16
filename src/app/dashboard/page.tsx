import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabaseServiceClient } from '@/lib/supabase-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard - LingoSite',
}

async function getUserProjects() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value

  if (!accessToken) {
    redirect('/auth')
  }

  const { data: userResult } = await supabaseServiceClient.auth.getUser(accessToken)
  const userId = userResult?.user?.id
  if (!userId) {
    redirect('/auth')
  }

  const { data, error } = await supabaseServiceClient
    .from('projects')
    .select('slug, language, created_at')
    .eq('user_id', userId)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load projects:', error)
    return []
  }

  return data ?? []
}

export default async function DashboardPage() {
  const projects = await getUserProjects()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-main border-2 border-border flex items-center justify-center rounded-base">
                <span className="text-main-foreground font-heading text-xl">L</span>
              </div>
              <div>
                <h1 className="text-xl font-heading">Dashboard</h1>
                <p className="text-sm text-foreground/70">Your published multilingual sites</p>
              </div>
            </div>
            <Link href="/projects/new">
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-sm text-foreground/70">
                You don&apos;t have any published projects yet. Create a new site to see it here.
              </p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.slug}
                    className="flex items-center justify-between p-4 border-2 border-border rounded-base bg-secondary-background"
                  >
                    <div>
                      <h3 className="text-lg font-heading break-all">{project.slug}</h3>
                      <p className="text-sm text-foreground/70">
                        Language: {project.language?.toUpperCase?.() ?? 'EN'}
                      </p>
                      <p className="text-xs text-foreground/60 mt-1">
                        Created at:{' '}
                        {project.created_at
                          ? new Date(project.created_at).toLocaleString()
                          : 'Unknown'}
                      </p>
                    </div>
                    <Link href={`/site/${project.slug}`}>
                      <Button size="sm" variant="noShadow">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
