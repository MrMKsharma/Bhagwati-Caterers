import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail, emailTemplates } from '@/lib/email'

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        eventType: body.eventType || null,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        guestCount: body.guestCount ? parseInt(body.guestCount) : null,
        message: body.message,
        status: 'new'
      }
    })

    // Send notification email to admin
    const adminEmailTemplate = emailTemplates.inquiryReceived(body)
    await sendEmail({
      to: process.env.EMAIL_TO || 'admin@caterers.com',
      ...adminEmailTemplate
    })

    // Send confirmation email to customer
    const customerEmailTemplate = emailTemplates.inquiryConfirmation(body)
    await sendEmail({
      to: body.email,
      ...customerEmailTemplate
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}