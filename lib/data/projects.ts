/**
 * Data service: Projects
 * Currently reads from local JSON.
 * To migrate to CMS: replace the import with an API call (fetch, axios, etc.)
 */

import { cache } from 'react'
import type { Project } from '@/lib/types'
import projectsData from '@/data/projects.json'

const projects = projectsData as Project[]

export const getProjects = cache(async (): Promise<Project[]> => {
  return projects
})

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  return projects.filter((p) => p.featured)
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  return projects.find((p) => p.slug === slug)
})

export const getProjectsByCategory = cache(async (category: string): Promise<Project[]> => {
  return projects.filter((p) => p.category === category)
})
