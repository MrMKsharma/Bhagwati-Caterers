import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
// import { ApiErrorResponse } from '@/types/api'

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
    const transformedItems = menuItems.map((item): {
      id: string;
      name: string;
      category: string;
      subcategory?: string;
      description?: string;
      dietType?: string;
      spiceLevel?: number;
      ingredients: string[];
      allergens: string[];
      image?: string;
      isVeg: boolean;
      isFeatured: boolean;
    } => ({
      id: item.id,
      name: item.name,
      category: item.category,
      subcategory: item.subcategory || undefined,
      description: item.description || undefined,
      dietType: item.dietType || undefined,
      spiceLevel: typeof item.spiceLevel === 'number' ? item.spiceLevel : undefined,
      ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
      allergens: item.allergens ? JSON.parse(item.allergens) : [],
      image: item.imageUrl || undefined,
      isVeg: true, // All items are vegetarian for Bhagwati Caterers
      isFeatured: item.isFeatured
    }))

    return NextResponse.json({ 
      success: true, 
      data: transformedItems 
    })
  } catch (error: unknown) {
    console.error('Error fetching menu items:', error)
    
    // Return error instead of fallback data
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch menu items from database'
    }, { status: 500 })
  }
}