import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function testDB() {
  try {
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('Connected to database successfully!')
    
    // Test a simple query
    const count = await prisma.menuItem.count()
    console.log(`Found ${count} menu items in database`)
    
    // Fetch a few items
    const items = await prisma.menuItem.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log('Recent menu items:')
    items.forEach(item => {
      console.log(`- ${item.name} (${item.category})`)
    })
    
  } catch (error) {
    console.error('Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testDB()