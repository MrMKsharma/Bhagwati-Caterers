import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAdminAPI() {
  try {
    console.log('Testing admin API endpoints...')
    
    // Test basic database queries that admin panel would use
    const usersCount = await prisma.user.count()
    const menuItemsCount = await prisma.menuItem.count()
    const inquiriesCount = await prisma.inquiry.count()
    const packagesCount = await prisma.package.count()
    const testimonialsCount = await prisma.testimonial.count()
    const galleryImagesCount = await prisma.galleryImage.count()
    
    console.log('Database counts:')
    console.log(`- Users: ${usersCount}`)
    console.log(`- Menu Items: ${menuItemsCount}`)
    console.log(`- Inquiries: ${inquiriesCount}`)
    console.log(`- Packages: ${packagesCount}`)
    console.log(`- Testimonials: ${testimonialsCount}`)
    console.log(`- Gallery Images: ${galleryImagesCount}`)
    
    // Test a simple query
    const firstUser = await prisma.user.findFirst()
    if (firstUser) {
      console.log(`First user: ${firstUser.name} (${firstUser.email})`)
    }
    
    console.log('✅ Admin API test completed successfully')
  } catch (error) {
    console.error('Error testing admin API:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminAPI()