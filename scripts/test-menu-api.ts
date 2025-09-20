import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testMenuAPI() {
  try {
    console.log('Testing menu items API...')
    
    // Try to fetch from database
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true, // Only show available items to public
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    })

    console.log(`Found ${menuItems.length} menu items in database`)
    
    // Transform the data for public consumption (same as in the API)
    const transformedItems = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      description: item.description,
      dietType: item.dietType,
      spiceLevel: item.spiceLevel,
      ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
      allergens: item.allergens ? JSON.parse(item.allergens) : [],
      image: item.imageUrl,
      isVeg: true, // All items are vegetarian for Bhagwati Caterers
      isFeatured: item.isFeatured
    }))

    console.log('First 3 transformed items:')
    transformedItems.slice(0, 3).forEach(item => {
      console.log(`- ${item.name} (${item.category})`)
      console.log(`  Image: ${item.image || 'None'}`)
      console.log(`  Description: ${item.description || 'None'}`)
      console.log('')
    })
    
    // Test the API response format
    const apiResponse = {
      success: true,
      data: transformedItems
    }
    
    console.log('API Response format:')
    console.log(JSON.stringify(apiResponse, null, 2))
    
  } catch (error) {
    console.error('Error testing menu API:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testMenuAPI()