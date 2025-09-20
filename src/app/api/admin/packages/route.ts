import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Fetch all packages for admin
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ packages })
  } catch (error) {
    console.error('Packages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

// POST - Create new package
export async function POST(request: Request) {
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
      imageUrl 
    } = body

    if (!name || !description || !pricePerPerson || !minGuests) {
      return NextResponse.json(
        { error: 'Name, description, price per person, and minimum guests are required' },
        { status: 400 }
      )
    }

    const newPackage = await prisma.package.create({
      data: {
        name,
        description,
        pricePerPerson: parseFloat(pricePerPerson),
        minGuests: parseInt(minGuests),
        maxGuests: maxGuests ? parseInt(maxGuests) : null,
        items: JSON.stringify(items || []),
        imageUrl: imageUrl || null,
        isActive: true
      }
    })

    return NextResponse.json({ package: newPackage }, { status: 201 })
  } catch (error) {
    console.error('Package creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}