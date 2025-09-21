import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { CreateTestimonialRequest } from '@/types/api'

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
  } catch (error: unknown) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTestimonialRequest = await request.json()
    
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        rating: parseInt(String(body.rating)),
        comment: body.comment,
        imageUrl: body.imageUrl || null,
        isApproved: false // Requires admin approval
      }
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}