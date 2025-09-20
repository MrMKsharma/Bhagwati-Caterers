import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// PATCH - Update package
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      name, 
      description, 
      pricePerPerson, 
      minGuests, 
      maxGuests, 
      items, 
      imageUrl,
      isActive 
    } = body
    
    // Resolve the params promise
    const resolvedParams = await params;

    const updatedPackage = await prisma.package.update({
      where: { id: resolvedParams.id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(pricePerPerson !== undefined && { pricePerPerson: parseFloat(pricePerPerson) }),
        ...(minGuests !== undefined && { minGuests: parseInt(minGuests) }),
        ...(maxGuests !== undefined && { maxGuests: maxGuests ? parseInt(maxGuests) : null }),
        ...(items !== undefined && { items: JSON.stringify(items) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json({ package: updatedPackage })
  } catch (error) {
    console.error('Package update error:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE - Delete package
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Resolve the params promise
    const resolvedParams = await params;
    
    await prisma.package.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Package deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}

// GET - Get specific package
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Resolve the params promise
    const resolvedParams = await params;
    
    const packageData = await prisma.package.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    return NextResponse.json({ package: packageData })
  } catch (error) {
    console.error('Package fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    )
  }
}