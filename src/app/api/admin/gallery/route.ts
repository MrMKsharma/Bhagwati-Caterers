import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { ExtendedSession } from '@/lib/session-types'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { CreateGalleryImageRequest, GalleryImageResponse, ApiErrorResponse } from '@/types/api'

// GET - Fetch all gallery images for admin with filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const active = searchParams.get('active')
    const featured = searchParams.get('featured')

    interface WhereClause {
      category?: string;
      subcategory?: string;
      isActive?: boolean;
      isFeatured?: boolean;
    }
    
    const where: WhereClause = {}
    
    if (category && category !== 'all') where.category = category
    if (subcategory) where.subcategory = subcategory
    if (active !== null) where.isActive = active === 'true'
    if (featured !== null) where.isFeatured = featured === 'true'

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ images })
  } catch (error: unknown) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    )
  }
}

// POST - Create new gallery image with enhanced fields
export async function POST(request: NextRequest): Promise<NextResponse<{ image: GalleryImageResponse } | ApiErrorResponse>> {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession | null
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: CreateGalleryImageRequest = await request.json()
    const { 
      title, 
      description, 
      imageUrl, 
      thumbnailUrl, 
      category, 
      subcategory, 
      tags, 
      altText, 
      isActive, 
      isFeatured, 
      sortOrder, 
      fileSize, 
      dimensions 
    } = body

    if (!imageUrl || !category) {
      return NextResponse.json(
        { error: 'Image URL and category are required' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.create({
      data: {
        title: title || null,
        description: description || null,
        imageUrl,
        thumbnailUrl: thumbnailUrl || null,
        category,
        subcategory: subcategory || null,
        tags: tags ? JSON.stringify(tags) : null,
        altText: altText || null,
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured || false,
        sortOrder: sortOrder ? parseInt(String(sortOrder)) : null,
        uploadedBy: session.user?.email || null,
        fileSize: fileSize ? parseInt(String(fileSize)) : null,
        dimensions: dimensions || null
      }
    })

    return NextResponse.json({ image }, { status: 201 })
  } catch (error: unknown) {
    console.error('Gallery creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    )
  }
}