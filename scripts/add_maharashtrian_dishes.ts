import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addMaharashtrianDishes() {
  try {
    // Connect to the database
    await prisma.$connect()
    console.log('Connected to database')

    // Define the new Maharashtrian dishes
    const newDishes = [
      // Appetizers & Snacks
      {
        name: 'Misal Pav',
        description: 'Spicy sprouted curry with farsan, served with pav',
        category: 'appetizer',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'spicy',
        ingredients: JSON.stringify(['Sprouted beans', 'Potatoes', 'Onions', 'Tomatoes', 'Farsan', 'Pav']),
        allergens: JSON.stringify(['Gluten']),
        cookingTime: 30,
        imageUrl: '/images/menu/appetizers/misal-pav.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Vada Pav',
        description: 'Deep-fried potato dumpling in bread roll',
        category: 'appetizer',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['Potatoes', 'Green chilies', 'Garlic', 'Bread rolls', 'Chutneys']),
        allergens: JSON.stringify(['Gluten']),
        cookingTime: 20,
        imageUrl: '/images/menu/appetizers/vada-pav.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2
      },
      {
        name: 'Pav Bhaji',
        description: 'Spiced vegetable curry with buttered pav',
        category: 'appetizer',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['Mixed vegetables', 'Butter', 'Pav', 'Onions', 'Tomatoes', 'Potatoes', 'Peas']),
        allergens: JSON.stringify(['Gluten', 'Dairy']),
        cookingTime: 40,
        imageUrl: '/images/menu/appetizers/pav-bhaji.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3
      },
      {
        name: 'Sabudana Khichdi',
        description: 'Tapioca pearls cooked with peanuts and potatoes',
        category: 'appetizer',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Sabudana', 'Peanuts', 'Potatoes', 'Cumin', 'Lemon juice']),
        allergens: JSON.stringify([]),
        cookingTime: 30,
        imageUrl: '/images/menu/appetizers/sabudana-khichdi.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 4
      },
      {
        name: 'Kanda Poha',
        description: 'Flattened rice with onions and spices',
        category: 'appetizer',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Poha', 'Onions', 'Mustard seeds', 'Curry leaves', 'Lemon juice']),
        allergens: JSON.stringify([]),
        cookingTime: 20,
        imageUrl: '/images/menu/appetizers/kanda-poha.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 5
      },
      
      // Main Course
      {
        name: 'Puran Poli',
        description: 'Sweet lentil flatbread',
        category: 'main',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Chana dal', 'Jaggery', 'Cardamom', 'Wheat flour']),
        allergens: JSON.stringify(['Gluten']),
        cookingTime: 45,
        imageUrl: '/images/menu/main/puran-poli.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Bharli Vangi',
        description: 'Stuffed baby eggplants',
        category: 'main',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['Baby eggplants', 'Onions', 'Tomatoes', 'Coconut', 'Peanuts', 'Spices']),
        allergens: JSON.stringify([]),
        cookingTime: 40,
        imageUrl: '/images/menu/main/bharli-vangi.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 2
      },
      {
        name: 'Batata Bhaji',
        description: 'Spiced potato curry',
        category: 'main',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['Potatoes', 'Onions', 'Tomatoes', 'Green chilies', 'Coriander', 'Spices']),
        allergens: JSON.stringify([]),
        cookingTime: 25,
        imageUrl: '/images/menu/main/batata-bhaji.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 3
      },
      {
        name: 'Palak Paneer',
        description: 'Spinach with cottage cheese',
        category: 'main',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Spinach', 'Paneer', 'Onions', 'Garlic', 'Ginger', 'Cream']),
        allergens: JSON.stringify(['Dairy']),
        cookingTime: 30,
        imageUrl: '/images/menu/main/palak-paneer.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 4
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Creamy cottage cheese curry',
        category: 'main',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Paneer', 'Tomatoes', 'Cream', 'Butter', 'Cashews', 'Spices']),
        allergens: JSON.stringify(['Dairy', 'Nuts']),
        cookingTime: 35,
        imageUrl: '/images/menu/main/paneer-butter-masala.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 5
      },
      {
        name: 'Dal Makhani',
        description: 'Creamy black lentils',
        category: 'main',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Black lentils', 'Kidney beans', 'Butter', 'Cream', 'Garlic', 'Ginger']),
        allergens: JSON.stringify(['Dairy']),
        cookingTime: 120,
        imageUrl: '/images/menu/main/dal-makhani.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 6
      },
      
      // Rice & Biryani
      {
        name: 'Vegetable Biryani',
        description: 'Fragrant rice with mixed vegetables',
        category: 'rice',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'medium',
        ingredients: JSON.stringify(['Basmati rice', 'Mixed vegetables', 'Saffron', 'Mint', 'Yogurt', 'Spices']),
        allergens: JSON.stringify(['Dairy']),
        cookingTime: 45,
        imageUrl: '/images/menu/rice/vegetable-biryani.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Jeera Rice',
        description: 'Cumin-flavored rice',
        category: 'rice',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Basmati rice', 'Cumin seeds', 'Bay leaves', 'Onions']),
        allergens: JSON.stringify([]),
        cookingTime: 20,
        imageUrl: '/images/menu/rice/jeera-rice.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 2
      },
      
      // Breads
      {
        name: 'Chapati',
        description: 'Whole wheat flatbread',
        category: 'bread',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Whole wheat flour', 'Water', 'Salt']),
        allergens: JSON.stringify(['Gluten']),
        cookingTime: 10,
        imageUrl: '/images/menu/breads/chapati.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Paratha',
        description: 'Layered flatbread',
        category: 'bread',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Whole wheat flour', 'Water', 'Salt', 'Ghee']),
        allergens: JSON.stringify(['Gluten', 'Dairy']),
        cookingTime: 15,
        imageUrl: '/images/menu/breads/paratha.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2
      },
      
      // Desserts
      {
        name: 'Modak',
        description: 'Sweet dumplings with coconut filling',
        category: 'dessert',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Rice flour', 'Coconut', 'Jaggery', 'Cardamom']),
        allergens: JSON.stringify(['Gluten']),
        cookingTime: 30,
        imageUrl: '/images/menu/desserts/modak.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Shrikhand',
        description: 'Sweet yogurt dessert',
        category: 'dessert',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Yogurt', 'Sugar', 'Cardamom', 'Saffron', 'Pistachios']),
        allergens: JSON.stringify(['Dairy', 'Nuts']),
        cookingTime: 500, // 8+ hours for straining
        imageUrl: '/images/menu/desserts/shrikhand.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2
      },
      {
        name: 'Rava Sheera',
        description: 'Semolina pudding',
        category: 'dessert',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Semolina', 'Ghee', 'Sugar', 'Water', 'Cardamom', 'Cashews', 'Raisins']),
        allergens: JSON.stringify(['Gluten', 'Dairy', 'Nuts']),
        cookingTime: 25,
        imageUrl: '/images/menu/desserts/rava-sheera.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 3
      },
      
      // Beverages
      {
        name: 'Masala Chai',
        description: 'Spiced tea',
        category: 'beverage',
        subcategory: 'north_indian',
        dietType: 'vegetarian',
        spiceLevel: null,
        ingredients: JSON.stringify(['Tea leaves', 'Milk', 'Ginger', 'Cardamom', 'Cinnamon', 'Cloves']),
        allergens: JSON.stringify(['Dairy']),
        cookingTime: 10,
        imageUrl: '/images/menu/beverages/masala-chai.jpg',
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Buttermilk',
        description: 'Spiced yogurt drink',
        category: 'beverage',
        subcategory: 'maharashtrian',
        dietType: 'vegetarian',
        spiceLevel: 'mild',
        ingredients: JSON.stringify(['Yogurt', 'Water', 'Cumin', 'Coriander', 'Mint', 'Salt']),
        allergens: JSON.stringify(['Dairy']),
        cookingTime: 5,
        imageUrl: '/images/menu/beverages/buttermilk.jpg',
        isAvailable: true,
        isFeatured: false,
        sortOrder: 2
      }
    ]

    // Add each dish to the database
    for (const dish of newDishes) {
      try {
        const createdDish = await prisma.menuItem.create({
          data: dish
        })
        console.log(`Added dish: ${createdDish.name}`)
      } catch (error) {
        console.error(`Error adding dish ${dish.name}:`, error)
      }
    }

    console.log('Finished adding Maharashtrian dishes to the menu')
  } catch (error) {
    console.error('Error connecting to database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the function
addMaharashtrianDishes()
  .catch((error) => {
    console.error('Error in script:', error)
    process.exit(1)
  })