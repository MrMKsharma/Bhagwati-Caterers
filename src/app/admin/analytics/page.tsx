'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star,
  Image as ImageIcon,
  ChefHat,
  BarChart3,
  PieChart,
  Activity,
  Clock
} from 'lucide-react'
import { usePermissions, AccessDenied } from '@/hooks/usePermissions'

interface AnalyticsData {
  overview: {
    totalInquiries: number
    recentInquiries: number
    weeklyInquiries: number
    totalTestimonials: number
    totalGalleryImages: number
    totalMenuItems: number
    conversionRate: number
    responseRate: number
    avgGuestCount: number
  }
  inquiryStatusCounts: { status: string; count: number }[]
  eventTypeCounts: { eventType: string; count: number }[]
  monthlyTrends: { month: string; count: number }[]
  popularEvents: { eventType: string; count: number; avgGuests: number }[]
  recentActivity: {
    id: string
    name: string
    eventType: string | null
    status: string
    createdAt: string
  }[]
}

export default function AnalyticsPage() {
  const { hasPermission } = usePermissions()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Check if user can access analytics
  const canAccess = hasPermission('analytics', 'read')

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Only fetch data if user has permission
    if (canAccess) {
      fetchAnalytics()
    } else {
      setLoading(false)
    }
  }, [canAccess, fetchAnalytics])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-yellow-600 bg-yellow-100'
      case 'responded':
        return 'text-blue-600 bg-blue-100'
      case 'confirmed':
        return 'text-green-600 bg-green-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  // Handle permission denied
  if (!canAccess) {
    return <AccessDenied resource="analytics dashboard" />
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Error loading analytics: {error}</p>
      </div>
    )
  }

  // Handle no data state
  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Comprehensive overview of your catering business performance
          </p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
              <p className="text-2xl font-semibold text-gray-900">{data.overview.totalInquiries}</p>
              <p className="text-sm text-green-600">+{data.overview.recentInquiries} this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{data.overview.conversionRate}%</p>
              <p className="text-sm text-gray-600">Inquiries to confirmed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Guests</p>
              <p className="text-2xl font-semibold text-gray-900">{data.overview.avgGuestCount}</p>
              <p className="text-sm text-gray-600">Per event</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Response Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{data.overview.responseRate}%</p>
              <p className="text-sm text-gray-600">Inquiries responded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Testimonials</p>
              <p className="text-xl font-semibold text-gray-900">{data.overview.totalTestimonials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ImageIcon className="h-6 w-6 text-pink-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Gallery Images</p>
              <p className="text-xl font-semibold text-gray-900">{data.overview.totalGalleryImages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ChefHat className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Menu Items</p>
              <p className="text-xl font-semibold text-gray-900">{data.overview.totalMenuItems}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-orange-600" />
            Inquiry Status Distribution
          </h3>
          <div className="space-y-3">
            {data.inquiryStatusCounts.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(item.status).split(' ')[1]}`}></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{item.status}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 mr-2">{item.count}</span>
                  <span className="text-xs text-gray-500">
                    ({data.overview.totalInquiries > 0 ? Math.round((item.count / data.overview.totalInquiries) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Event Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
            Popular Event Types
          </h3>
          <div className="space-y-3">
            {data.popularEvents.map((event, index) => (
              <div key={event.eventType} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{event.eventType}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{event.count} events</div>
                  <div className="text-xs text-gray-500">{event.avgGuests} avg guests</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
          Monthly Inquiry Trends
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {data.monthlyTrends.map((month) => {
            const maxCount = Math.max(...data.monthlyTrends.map(m => m.count))
            const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0
            
            return (
              <div key={month.month} className="text-center">
                <div className="h-32 flex items-end justify-center mb-2">
                  <div 
                    className="w-8 bg-orange-600 rounded-t transition-all duration-300 hover:bg-orange-700"
                    style={{ height: `${Math.max(height, 5)}%` }}
                    title={`${month.count} inquiries`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 font-medium">{month.month}</div>
                <div className="text-xs text-gray-500">{month.count}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-orange-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {data.recentActivity.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                    <p className="text-xs text-gray-500">
                      {activity.eventType && `${activity.eventType} • `}
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}