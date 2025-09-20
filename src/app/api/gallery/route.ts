import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch gallery images (public with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')
    const limit = searchParams.get('limit')

    const where: any = {}
    
    // For public API, only show active images by default
    if (active !== 'false') {
      where.isActive = true
    }
    
    if (category && category !== 'all') where.category = category
    if (subcategory) where.subcategory = subcategory
    if (featured !== null) where.isFeatured = featured === 'true'

    const queryOptions: any = {
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    }

    if (limit) {
      queryOptions.take = parseInt(limit)
    }

    const images = await prisma.galleryImage.findMany(queryOptions)

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    )
  }
}

// POST - Upload new gallery image (admin only)
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
    
    const galleryImage = await prisma.galleryImage.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        thumbnailUrl: body.thumbnailUrl,
        category: body.category || 'food',
        subcategory: body.subcategory,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        altText: body.altText,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured || false,
        sortOrder: body.sortOrder ? parseInt(body.sortOrder) : null,
        uploadedBy: session.user.email,
        fileSize: body.fileSize ? parseInt(body.fileSize) : null,
        dimensions: body.dimensions
      }
    })

    return NextResponse.json(galleryImage, { status: 201 })
  } catch (error) {
    console.error('Error uploading gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to upload gallery image' },
      { status: 500 }
    )
  }
}