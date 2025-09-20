import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  try {
    // Dynamic pages from database
    const [menuItems, packages, galleryImages] = await Promise.all([
      prisma.menuItem.findMany({
        select: { id: true, name: true, updatedAt: true },
      }),
      prisma.package.findMany({
        select: { id: true, name: true, updatedAt: true },
      }),
      prisma.galleryImage.findMany({
        select: { id: true, updatedAt: true },
        take: 50, // Limit gallery items
      }),
    ])

    // Menu item pages
    const menuPages = menuItems.map((item) => ({
      url: `${baseUrl}/menu/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Package pages
    const packagePages = packages.map((pkg) => ({
      url: `${baseUrl}/packages/${pkg.id}`,
      lastModified: pkg.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Gallery pages (if individual gallery items have pages)
    const galleryPages = galleryImages.map((image) => ({
      url: `${baseUrl}/gallery/${image.id}`,
      lastModified: image.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }))

    return [...staticPages, ...menuPages, ...packagePages, ...galleryPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if database error
    return staticPages
  }
}