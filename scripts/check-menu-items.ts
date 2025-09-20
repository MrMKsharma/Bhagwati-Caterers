import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkMenuItems() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    })
    
    console.log(`Found ${menuItems.length} available menu items`)
    
    if (menuItems.length > 0) {
      console.log('First 5 menu items:')
      menuItems.slice(0, 5).forEach(item => {
        console.log(`- ${item.name} (${item.category}) - Image: ${item.imageUrl || 'None'}`)
      })
    } else {
      console.log('No menu items found in database')
    }
  } catch (error) {
    console.error('Error fetching menu items:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkMenuItems()