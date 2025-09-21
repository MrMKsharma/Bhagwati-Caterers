import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendEmail, emailTemplates } from '@/lib/email'

// POST - Send follow-up emails to pending inquiries
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { inquiryIds, followupType = 'gentle_reminder' } = body

    if (!inquiryIds || !Array.isArray(inquiryIds) || inquiryIds.length === 0) {
      return NextResponse.json(
        { error: 'Inquiry IDs are required' },
        { status: 400 }
      )
    }

    const inquiries = await prisma.inquiry.findMany({
      where: {
        id: { in: inquiryIds },
        status: { in: ['new', 'responded'] }
      }
    })

    const results = []

    for (const inquiry of inquiries) {
      try {
        let emailData: {
          name: string;
          eventType?: string;
          eventDate?: string;
          customerName?: string;
          guestCount?: number | null;
          originalMessage?: string;
          urgent?: boolean;
          final?: boolean;
        } = {
          name: inquiry.name
        }
        let subject = ''

        switch (followupType) {
          case 'gentle_reminder':
            subject = `Following up on your catering inquiry - ${inquiry.eventType || 'Event'}`
            emailData = {
              name: inquiry.name,
              customerName: inquiry.name,
              eventType: inquiry.eventType || 'your event',
              eventDate: inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : undefined,
              guestCount: inquiry.guestCount,
              originalMessage: inquiry.message
            }
            break
          
          case 'urgent_reminder':
            subject = `Important: Your catering inquiry needs attention - ${inquiry.eventType || 'Event'}`
            emailData = {
              name: inquiry.name,
              customerName: inquiry.name,
              eventType: inquiry.eventType || 'your event',
              eventDate: inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : undefined,
              guestCount: inquiry.guestCount,
              urgent: true
            }
            break
          
          case 'final_reminder':
            subject = `Final reminder: Your catering inquiry - ${inquiry.eventType || 'Event'}`
            emailData = {
              name: inquiry.name,
              customerName: inquiry.name,
              eventType: inquiry.eventType || 'your event',
              eventDate: inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : undefined,
              guestCount: inquiry.guestCount,
              final: true
            }
            break
        }

        const template = emailTemplates.inquiryConfirmation(emailData)
        
        await sendEmail({
          to: inquiry.email,
          subject,
          html: template.html
        })

        results.push({
          inquiryId: inquiry.id,
          customerName: inquiry.name,
          email: inquiry.email,
          status: 'sent'
        })

      } catch (emailError) {
        console.error(`Failed to send follow-up to ${inquiry.email}:`, emailError)
        results.push({
          inquiryId: inquiry.id,
          customerName: inquiry.name,
          email: inquiry.email,
          status: 'failed',
          error: emailError instanceof Error ? emailError.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      message: `Follow-up emails processed`,
      total: inquiryIds.length,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      results
    })

  } catch (error) {
    console.error('Follow-up system error:', error)
    return NextResponse.json(
      { error: 'Failed to send follow-up emails' },
      { status: 500 }
    )
  }
}

// GET - Get inquiries that need follow-up
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const daysOld = parseInt(searchParams.get('daysOld') || '3')

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    // Get inquiries that are old and haven't been followed up
    const pendingInquiries = await prisma.inquiry.findMany({
      where: {
        status: { in: ['new', 'responded'] },
        createdAt: { lte: cutoffDate }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Categorize by age
    const now = new Date()
    const categorized: {
      gentle: Array<{ id: string; name: string; email: string; eventType: string; createdAt: Date; daysSinceInquiry: number }>,
      urgent: Array<{ id: string; name: string; email: string; eventType: string; createdAt: Date; daysSinceInquiry: number }>,
      final: Array<{ id: string; name: string; email: string; eventType: string; createdAt: Date; daysSinceInquiry: number }>
    } = {
      gentle: [], // 3-7 days old
      urgent: [], // 7-14 days old  
      final: []   // 14+ days old
    }

    pendingInquiries.forEach(inquiry => {
      const daysSinceCreated = Math.floor((now.getTime() - new Date(inquiry.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      
      const inquiryData = {
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        eventType: inquiry.eventType || 'Event',
        createdAt: inquiry.createdAt,
        daysSinceInquiry: daysSinceCreated
      }
      
      if (daysSinceCreated >= 14) {
        categorized.final.push(inquiryData)
      } else if (daysSinceCreated >= 7) {
        categorized.urgent.push(inquiryData)
      } else {
        categorized.gentle.push(inquiryData)
      }
    })

    return NextResponse.json({
      total: pendingInquiries.length,
      categories: {
        gentle: {
          count: categorized.gentle.length,
          inquiries: categorized.gentle
        },
        urgent: {
          count: categorized.urgent.length,
          inquiries: categorized.urgent
        },
        final: {
          count: categorized.final.length,
          inquiries: categorized.final
        }
      }
    })

  } catch (error) {
    console.error('Follow-up fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch follow-up data' },
      { status: 500 }
    )
  }
}