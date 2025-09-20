import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isApproved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        rating: parseInt(body.rating),
        comment: body.comment,
        imageUrl: body.imageUrl || null,
        isApproved: false // Requires admin approval
      }
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}