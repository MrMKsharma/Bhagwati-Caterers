import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'admin@caterers.com' }
    })

    if (!existingAdmin) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
      
      await prisma.user.create({
        data: {
          email: process.env.ADMIN_EMAIL || 'admin@caterers.com',
          name: 'System Administrator',
          password: hashedPassword,
          role: 'admin'
        }
      })
      
      console.log(`✅ Default admin user created: ${process.env.ADMIN_EMAIL || 'admin@caterers.com'}`)
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    // Create sample manager user (only in development)
    if (process.env.NODE_ENV !== 'production') {
      const existingManager = await prisma.user.findUnique({
        where: { email: 'manager@caterers.com' }
      })

      if (!existingManager) {
        const hashedPassword = await bcrypt.hash('manager123', 12)
        
        await prisma.user.create({
          data: {
            email: 'manager@caterers.com',
            name: 'John Manager',
            password: hashedPassword,
            role: 'manager'
          }
        })
        
        console.log('✅ Sample manager user created: manager@caterers.com / manager123')
      }

      // Create sample staff user (only in development)
      const existingStaff = await prisma.user.findUnique({
        where: { email: 'staff@caterers.com' }
      })

      if (!existingStaff) {
        const hashedPassword = await bcrypt.hash('staff123', 12)
        
        await prisma.user.create({
          data: {
            email: 'staff@caterers.com',
            name: 'Jane Staff',
            password: hashedPassword,
            role: 'staff'
          }
        })
        
        console.log('✅ Sample staff user created: staff@caterers.com / staff123')
      }
    }

    // Seed sample menu items if none exist
    const menuItemCount = await prisma.menuItem.count()
    if (menuItemCount === 0) {
      console.log('🍽️  Creating sample menu items...')
      
      const sampleMenuItems = [
        {
          name: 'Vegetable Samosas',
          description: 'Crispy pastries filled with spiced vegetables and herbs',
          category: 'appetizer',
          subcategory: 'north_indian',
          dietType: 'vegetarian',
          spiceLevel: 'medium',
          ingredients: JSON.stringify(['potatoes', 'peas', 'onions', 'spices', 'pastry']),
          allergens: JSON.stringify(['gluten']),
          cookingTime: 25,
          isAvailable: true,
          isFeatured: true,
          sortOrder: 1
        },
        {
          name: 'Paneer Makhani',
          description: 'Rich and creamy cottage cheese curry in tomato-cashew gravy',
          category: 'main',
          subcategory: 'north_indian',
          dietType: 'vegetarian',
          spiceLevel: 'mild',
          ingredients: JSON.stringify(['paneer', 'tomatoes', 'cashews', 'cream', 'spices']),
          allergens: JSON.stringify(['dairy']),
          cookingTime: 35,
          isAvailable: true,
          isFeatured: true,
          sortOrder: 2
        },
        {
          name: 'Dal Tadka',
          description: 'Yellow lentils cooked with aromatic spices and herbs',
          category: 'dal',
          subcategory: 'north_indian',
          dietType: 'vegetarian',
          spiceLevel: 'medium',
          ingredients: JSON.stringify(['yellow_dal', 'onions', 'tomatoes', 'garlic', 'spices']),
          allergens: JSON.stringify([]),
          cookingTime: 30,
          isAvailable: true,
          isFeatured: false,
          sortOrder: 3
        },
        {
          name: 'Gulab Jamun',
          description: 'Soft milk dumplings in aromatic rose-flavored syrup',
          category: 'dessert',
          subcategory: 'traditional',
          dietType: 'vegetarian',
          spiceLevel: 'mild',
          ingredients: JSON.stringify(['milk_powder', 'flour', 'sugar', 'rose_water', 'cardamom']),
          allergens: JSON.stringify(['dairy', 'gluten']),
          cookingTime: 40,
          isAvailable: true,
          isFeatured: true,
          sortOrder: 4
        }
      ]

      for (const item of sampleMenuItems) {
        await prisma.menuItem.create({ data: item })
      }
      
      console.log(`✅ Created ${sampleMenuItems.length} sample menu items`)
    }

    // Create sample testimonials if none exist
    const testimonialCount = await prisma.testimonial.count()
    if (testimonialCount === 0) {
      console.log('⭐ Creating sample testimonials...')
      
      const sampleTestimonials = [
        {
          name: 'Priya Sharma',
          rating: 5,
          comment: 'Exceptional vegetarian catering! The food was delicious and presentation was perfect for our wedding.',
          isApproved: true
        },
        {
          name: 'Rajesh Gupta',
          rating: 5,
          comment: 'Best catering service in the city. Pure vegetarian food with authentic taste. Highly recommended!',
          isApproved: true
        }
      ]

      for (const testimonial of sampleTestimonials) {
        await prisma.testimonial.create({ data: testimonial })
      }
      
      console.log(`✅ Created ${sampleTestimonials.length} sample testimonials`)
    }

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('📊 Database Status:')
    
    // Show final counts
    const counts = {
      Users: await prisma.user.count(),
      'Menu Items': await prisma.menuItem.count(),
      Testimonials: await prisma.testimonial.count(),
      Inquiries: await prisma.inquiry.count(),
      Packages: await prisma.package.count(),
      'Gallery Images': await prisma.galleryImage.count()
    }
    
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  ${table}: ${count} records`)
    })
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
