export type Project = {
  id: string
  name: string
  prompt: string
  language: string
  sourceLocale: string
  availableLocales: string[]
  sourceJsx: string
  localizedJsx: Record<string, string>
  createdAt: string
  updatedAt: string
}

type CreateProjectInput = {
  name: string
  prompt: string
  language: string
  sourceLocale: string
  sourceJsx: string
  localizedJsx: Record<string, string>
}

const projects = new Map<string, Project>()

export function createProject(input: CreateProjectInput): Project {
  const id = Math.random().toString(36).slice(2, 9)
  const timestamp = new Date().toISOString()

  const availableLocales = Array.from(
    new Set([input.sourceLocale, ...Object.keys(input.localizedJsx || {})]),
  )

  const project: Project = {
    id,
    name: input.name,
    prompt: input.prompt,
    language: input.language,
    sourceLocale: input.sourceLocale,
    availableLocales,
    sourceJsx: input.sourceJsx,
    localizedJsx: input.localizedJsx,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  projects.set(id, project)

  return project
}

export function getProject(id: string): Project | null {
  return projects.get(id) ?? null
}

export function updateProject(id: string, patch: Partial<Project>): Project | null {
  const existing = projects.get(id)
  if (!existing) return null

  const updated: Project = {
    ...existing,
    ...patch,
    availableLocales: patch.localizedJsx
      ? Array.from(
          new Set([patch.sourceLocale ?? existing.sourceLocale, ...Object.keys(patch.localizedJsx)]),
        )
      : existing.availableLocales,
    updatedAt: new Date().toISOString(),
  }

  projects.set(id, updated)
  return updated
}

