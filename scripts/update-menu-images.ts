import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateMenuImages() {
  try {
    console.log('Updating menu items with sample images...')
    
    // Define sample images for different categories
    const categoryImages: Record<string, string> = {
      'appetizer': '/images/menu/appetizers/samosa.jpg',
      'main': '/images/menu/main/paneer-makhani.jpg',
      'dessert': '/images/menu/desserts/gulab-jamun.jpg',
      'beverage': '/images/menu/beverages/masala-chai.jpg',
      'bread': '/images/menu/breads/roti.jpg',
      'rice': '/images/menu/rice/jeera-rice.jpg',
      'dal': '/images/menu/main/dal-tadka.jpg'
    }
    
    // Fetch all menu items
    const menuItems = await prisma.menuItem.findMany()
    
    console.log(`Found ${menuItems.length} menu items to update`)
    
    // Update each menu item with an appropriate image
    for (const item of menuItems) {
      const imageUrl = categoryImages[item.category] || '/images/menu/placeholder.png'
      
      await prisma.menuItem.update({
        where: { id: item.id },
        data: {
          imageUrl: imageUrl
        }
      })
      
      console.log(`Updated ${item.name} with image: ${imageUrl}`)
    }
    
    console.log('All menu items updated with images!')
    
  } catch (error) {
    console.error('Error updating menu images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateMenuImages()