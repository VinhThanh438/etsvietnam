import { cache } from 'react'
import type { Service } from '@/lib/types'
import servicesData from '@/data/services.json'

const services = servicesData as Service[]

export const getServices = cache(async (): Promise<Service[]> => {
  return services
})

export const getServiceBySlug = cache(async (slug: string): Promise<Service | undefined> => {
  return services.find((s) => s.slug === slug)
})
