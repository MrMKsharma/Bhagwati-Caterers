import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAnalyticsAPI() {
  try {
    console.log('Testing analytics API data...')
    
    // Get the same data that the analytics API returns
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const totalInquiries = await prisma.inquiry.count()
    const totalTestimonials = await prisma.testimonial.count()
    const totalGalleryImages = await prisma.galleryImage.count()
    const totalMenuItems = await prisma.menuItem.count()
    const totalPackages = await prisma.package.count()
    
    const weeklyInquiries = await prisma.inquiry.count({
      where: {
        createdAt: { gte: sevenDaysAgo }
      }
    })
    
    console.log('Analytics Data:')
    console.log(`- Total Inquiries: ${totalInquiries}`)
    console.log(`- Weekly Inquiries: ${weeklyInquiries}`)
    console.log(`- Total Menu Items: ${totalMenuItems}`)
    console.log(`- Total Packages: ${totalPackages}`)
    console.log(`- Total Testimonials: ${totalTestimonials}`)
    console.log(`- Total Gallery Images: ${totalGalleryImages}`)
    
  } catch (error) {
    console.error('Error testing analytics API:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAnalyticsAPI()