/**
 * Data service: Projects
 * Reads from local JSON dynamically so admin updates take effect immediately.
 */

import type { Project } from '@/lib/types'
import fs from 'fs'
import path from 'path'

function readProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'data', 'projects.json')
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as Project[]
}

export async function getProjects(): Promise<Project[]> {
  return readProjects()
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return readProjects().filter((p) => p.featured)
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return readProjects().find((p) => p.slug === slug)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return readProjects().filter((p) => p.category === category)
}
