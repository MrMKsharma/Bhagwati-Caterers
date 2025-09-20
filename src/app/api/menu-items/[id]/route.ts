import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch single menu item (public)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    const menuItem = await prisma.menuItem.findUnique({
      where: {
        id: resolvedParams.id
      }
    })

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu item' },
      { status: 500 }
    )
  }
}

// PATCH - Update menu item (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Resolve the params promise
    const resolvedParams = await params;
    
    const menuItem = await prisma.menuItem.update({
      where: { id: resolvedParams.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price ? parseFloat(body.price) : null,
        category: body.category,
        subcategory: body.subcategory,
        dietType: body.dietType || 'vegetarian',
        spiceLevel: body.spiceLevel,
        ingredients: body.ingredients ? JSON.stringify(body.ingredients) : null,
        allergens: body.allergens ? JSON.stringify(body.allergens) : null,
        cookingTime: body.cookingTime ? parseInt(body.cookingTime) : null,
        imageUrl: body.imageUrl,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
        isFeatured: body.isFeatured || false,
        sortOrder: body.sortOrder ? parseInt(body.sortOrder) : null
      }
    })

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    )
  }
}

// DELETE - Delete menu item (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Resolve the params promise
    const resolvedParams = await params;
    
    await prisma.menuItem.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ success: true, message: 'Menu item deleted successfully' })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}