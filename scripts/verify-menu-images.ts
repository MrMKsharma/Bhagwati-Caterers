import { PrismaClient } from '@prisma/client'
import { existsSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function verifyMenuImages() {
  try {
    console.log('Verifying menu item images...\n')
    
    // Get all menu items
    const menuItems = await prisma.menuItem.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        imageUrl: true
      }
    })
    
    console.log(`Found ${menuItems.length} menu items in database\n`)
    
    let missingImages = 0
    let existingImages = 0
    
    // Check each menu item's image
    for (const item of menuItems) {
      if (item.imageUrl) {
        // Construct the full path to the image
        const imagePath = join(process.cwd(), 'public', item.imageUrl)
        
        // Check if the image file exists
        if (existsSync(imagePath)) {
          existingImages++
        } else {
          missingImages++
          console.log(`❌ Missing image for "${item.name}": ${item.imageUrl}`)
        }
      } else {
        missingImages++
        console.log(`❌ No image URL for "${item.name}"`)
      }
    }
    
    console.log(`\n--- Summary ---`)
    console.log(`✅ Images found: ${existingImages}`)
    console.log(`❌ Images missing: ${missingImages}`)
    console.log(`📊 Total items checked: ${menuItems.length}`)
    
    if (missingImages > 0) {
      console.log(`\n💡 Next steps:`)
      console.log(`1. Add the missing images to the appropriate directories in /public/images/menu/`)
      console.log(`2. Follow the naming convention: lowercase with hyphens (e.g., "misal-pav.jpg")`)
      console.log(`3. Optimize images for web (recommended size: 800x600px, under 200KB)`)
    } else {
      console.log(`\n🎉 All menu items have images!`)
    }
    
  } catch (error) {
    console.error('Error verifying menu images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyMenuImages()