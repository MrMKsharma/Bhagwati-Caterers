import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedMenuItems() {
  try {
    console.log('Seeding menu items to ensure database-only storage...')
    
    // Check if we already have items in the database
    const existingItems = await prisma.menuItem.count()
    
    if (existingItems > 0) {
      console.log(`Found ${existingItems} existing menu items in database.`)
      console.log('Skipping seeding to avoid duplicates.')
      return
    }
    
    // Define the menu items to seed
    const menuItems = [
      {
        name: 'Vegetable Samosas',
        category: 'appetizer',
        subcategory: 'north_indian',
        description: 'Crispy pastries filled with spiced vegetables and herbs',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['potatoes', 'peas', 'onions', 'spices', 'pastry']),
        allergens: JSON.stringify(['gluten']),
        imageUrl: '/images/menu/appetizers/samosa.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Dal Tadka',
        category: 'dal',
        subcategory: 'north_indian',
        description: 'Yellow lentils cooked with aromatic spices and herbs',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['yellow_dal', 'onions', 'tomatoes', 'garlic', 'spices']),
        allergens: JSON.stringify([]),
        imageUrl: '/images/menu/main/dal-tadka.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 2
      },
      {
        name: 'Gulab Jamun',
        category: 'dessert',
        subcategory: 'traditional',
        description: 'Soft milk dumplings in aromatic rose-flavored syrup',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['milk_powder', 'flour', 'sugar', 'rose_water', 'cardamom']),
        allergens: JSON.stringify(['dairy', 'gluten']),
        imageUrl: '/images/menu/desserts/gulab-jamun.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3
      },
      {
        name: 'Paneer Makhani',
        category: 'main',
        subcategory: 'north_indian',
        description: 'Rich and creamy cottage cheese curry in tomato-cashew gravy',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['paneer', 'tomatoes', 'cashews', 'cream', 'spices']),
        allergens: JSON.stringify(['dairy']),
        imageUrl: '/images/menu/main/paneer-makhani.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 4
      }
    ]
    
    // Seed the menu items
    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: item
      })
      console.log(`Created menu item: ${item.name}`)
    }
    
    console.log('Menu items seeding completed successfully!')
    
  } catch (error) {
    console.error('Error seeding menu items:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedMenuItems()