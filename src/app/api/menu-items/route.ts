import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Fetch from database with optimized query
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true, // Only show available items to public
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ],
      // Only select the fields we need to reduce data transfer
      select: {
        id: true,
        name: true,
        category: true,
        subcategory: true,
        description: true,
        dietType: true,
        spiceLevel: true,
        ingredients: true,
        allergens: true,
        imageUrl: true,
        isFeatured: true
      }
    })

    // Transform the data for public consumption
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

    return NextResponse.json({ 
      success: true, 
      data: transformedItems 
    })
  } catch (error) {
    console.error('Error fetching menu items:', error)
    
    // Return error instead of fallback data
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch menu items from database'
    }, { status: 500 })
  }
}