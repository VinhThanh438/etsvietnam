import type { Service } from '@/lib/types'
import fs from 'fs'
import path from 'path'

function readServices(): Service[] {
  const filePath = path.join(process.cwd(), 'data', 'services.json')
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as Service[]
}

export async function getServices(): Promise<Service[]> {
  return readServices()
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return readServices().find((s) => s.slug === slug)
}
