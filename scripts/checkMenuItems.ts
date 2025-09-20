import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkMenuItems() {
  try {
    const menuItems = await prisma.menuItem.findMany()
    console.log('Menu items in database:', menuItems.length)
    console.log(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkMenuItems()