import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDBConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try a simple query to test the connection
    const count = await prisma.menuItem.count()
    console.log(`Database connection successful! Found ${count} menu items.`)
    
    // Try fetching some menu items
    const menuItems = await prisma.menuItem.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log('Sample menu items:')
    menuItems.forEach(item => {
      console.log(`- ${item.name} (ID: ${item.id})`)
    })
    
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDBConnection()