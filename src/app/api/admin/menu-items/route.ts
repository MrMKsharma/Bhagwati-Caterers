import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch all menu items (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const available = searchParams.get('available')
    const featured = searchParams.get('featured')

    const where: any = {}
    
    if (category) where.category = category
    if (subcategory) where.subcategory = subcategory
    if (available !== null) where.isAvailable = available === 'true'
    if (featured !== null) where.isFeatured = featured === 'true'

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { category: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

// POST - Create new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Handle ingredients and allergens properly
    let ingredients = null
    let allergens = null
    
    if (body.ingredients) {
      if (typeof body.ingredients === 'string') {
        // If it's already a JSON string, use it as is
        ingredients = body.ingredients
      } else if (Array.isArray(body.ingredients)) {
        // If it's an array, stringify it
        ingredients = JSON.stringify(body.ingredients)
      }
    }
    
    if (body.allergens) {
      if (typeof body.allergens === 'string') {
        // If it's already a JSON string, use it as is
        allergens = body.allergens
      } else if (Array.isArray(body.allergens)) {
        // If it's an array, stringify it
        allergens = JSON.stringify(body.allergens)
      }
    }
    
    const menuItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        subcategory: body.subcategory,
        dietType: body.dietType || 'vegetarian',
        spiceLevel: body.spiceLevel,
        ingredients,
        allergens,
        cookingTime: body.cookingTime ? parseInt(body.cookingTime) : null,
        imageUrl: body.imageUrl,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
        isFeatured: body.isFeatured || false,
        sortOrder: body.sortOrder ? parseInt(body.sortOrder) : null
      }
    })

    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}