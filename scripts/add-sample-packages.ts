import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addSamplePackages() {
  try {
    console.log('Adding sample packages to the database...')
    
    // Check if packages already exist
    const existingPackages = await prisma.package.count()
    if (existingPackages > 0) {
      console.log(`Found ${existingPackages} existing packages. Skipping creation.`)
      return
    }
    
    // Create sample packages
    const packages = [
      {
        name: 'Basic Wedding Package',
        description: 'Perfect for intimate wedding celebrations with traditional Maharashtrian vegetarian cuisine',
        pricePerPerson: 1200,
        minGuests: 50,
        maxGuests: 200,
        items: JSON.stringify([
          'Welcome drinks (Masala Chai, Buttermilk)',
          'Appetizers (Samosa, Kanda Poha)',
          'Main Course (Paneer Butter Masala, Dal Makhani, Seasonal Vegetables)',
          'Rice (Jeera Rice, Vegetable Biryani)',
          'Breads (Chapati, Paratha)',
          'Desserts (Gulab Jamun, Shrikhand)',
          'Salad and Papad'
        ]),
        imageUrl: '/images/packages/wedding-basic.jpg',
        isActive: true
      },
      {
        name: 'Premium Corporate Package',
        description: 'Ideal for corporate events with a variety of North Indian and Maharashtrian delicacies',
        pricePerPerson: 1800,
        minGuests: 20,
        maxGuests: 500,
        items: JSON.stringify([
          'Welcome drinks and snacks',
          'Variety of appetizers',
          'Main course with 5 dishes',
          'Specialty rice and breads',
          'Dessert counter with 3 varieties',
          'Fresh fruit salad',
          'Mineral water and beverages'
        ]),
        imageUrl: '/images/packages/corporate-premium.jpg',
        isActive: true
      },
      {
        name: 'Festival Celebration Package',
        description: 'Celebrate festivals with our special menu featuring traditional sweets and delicacies',
        pricePerPerson: 1500,
        minGuests: 30,
        maxGuests: 300,
        items: JSON.stringify([
          'Festival special welcome drinks',
          'Traditional appetizers platter',
          'Signature main course dishes',
          'Special festival rice preparations',
          'Assorted Indian breads',
          'Festival sweets platter',
          'Dry fruits and nuts'
        ]),
        imageUrl: '/images/packages/festival.jpg',
        isActive: true
      }
    ]
    
    // Add packages to database
    for (const pkg of packages) {
      const createdPackage = await prisma.package.create({
        data: pkg
      })
      console.log(`✅ Created package: ${createdPackage.name}`)
    }
    
    console.log('✅ Sample packages added successfully!')
    
  } catch (error) {
    console.error('Error adding sample packages:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSamplePackages()