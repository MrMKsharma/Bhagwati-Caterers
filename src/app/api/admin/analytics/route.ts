import { NextResponse } from 'next/server'
import { checkPermission } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

// GET - Fetch analytics data
export async function GET(request: Request) {
  const permissionCheck = await checkPermission(request, 'analytics', 'read')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response
  }

  try {

    // Get date ranges
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    // Basic counts
    const totalInquiries = await prisma.inquiry.count()
    const totalTestimonials = await prisma.testimonial.count()
    const totalGalleryImages = await prisma.galleryImage.count()
    const totalMenuItems = await prisma.menuItem.count()
    const totalPackages = await prisma.package.count() // Added package count

    // Recent inquiries (last 30 days)
    const recentInquiries = await prisma.inquiry.count({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    })

    // Weekly inquiries (last 7 days)
    const weeklyInquiries = await prisma.inquiry.count({
      where: {
        createdAt: { gte: sevenDaysAgo }
      }
    })

    // Inquiry status breakdown
    const inquiryStatusCounts = await prisma.inquiry.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Event type breakdown
    const eventTypeCounts = await prisma.inquiry.groupBy({
      by: ['eventType'],
      _count: {
        eventType: true
      },
      where: {
        eventType: { not: null }
      }
    })

    // Monthly inquiry trends (last 6 months)
    const monthlyTrends = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
      
      const count = await prisma.inquiry.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      })

      monthlyTrends.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count
      })
    }

    // Average guest count
    const avgGuestCount = await prisma.inquiry.aggregate({
      _avg: {
        guestCount: true
      },
      where: {
        guestCount: { not: null }
      }
    })

    // Popular event types (with guest counts)
    const popularEvents = await prisma.inquiry.groupBy({
      by: ['eventType'],
      _count: {
        eventType: true
      },
      _avg: {
        guestCount: true
      },
      where: {
        eventType: { not: null },
        guestCount: { not: null }
      },
      orderBy: {
        _count: {
          eventType: 'desc'
        }
      },
      take: 5
    })

    // Recent activity (last 10 inquiries)
    const recentActivity = await prisma.inquiry.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        eventType: true,
        status: true,
        createdAt: true
      }
    })

    // Conversion rates
    const confirmedInquiries = await prisma.inquiry.count({
      where: { status: 'confirmed' }
    })
    const conversionRate = totalInquiries > 0 ? (confirmedInquiries / totalInquiries) * 100 : 0

    // Response time analytics (inquiries with status changes)
    const respondedInquiries = await prisma.inquiry.count({
      where: {
        status: { in: ['responded', 'confirmed'] }
      }
    })
    const responseRate = totalInquiries > 0 ? (respondedInquiries / totalInquiries) * 100 : 0

    return NextResponse.json({
      overview: {
        totalInquiries,
        recentInquiries,
        weeklyInquiries,
        totalTestimonials,
        totalGalleryImages,
        totalMenuItems,
        totalPackages, // Added to response
        conversionRate: Math.round(conversionRate * 100) / 100,
        responseRate: Math.round(responseRate * 100) / 100,
        avgGuestCount: Math.round((avgGuestCount._avg.guestCount || 0) * 10) / 10
      },
      inquiryStatusCounts: inquiryStatusCounts.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      eventTypeCounts: eventTypeCounts.map(item => ({
        eventType: item.eventType,
        count: item._count.eventType
      })),
      monthlyTrends,
      popularEvents: popularEvents.map(item => ({
        eventType: item.eventType,
        count: item._count.eventType,
        avgGuests: Math.round((item._avg.guestCount || 0) * 10) / 10
      })),
      recentActivity,
    })

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}