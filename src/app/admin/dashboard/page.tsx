'use client'

import { useEffect, useState, useCallback } from 'react'
import { 
  MessageSquare, 
  Package, 
  TrendingUp,
  Star
} from 'lucide-react'

interface DashboardStats {
  totalInquiries: number
  newInquiries: number
  totalMenuItems: number
  totalPackages: number
  recentInquiries: RecentInquiry[]
}

interface RecentInquiry {
  id: string
  name: string
  eventType: string
  createdAt: string
  status: string
}

interface AnalyticsApiResponse {
  overview: {
    totalInquiries: number
    weeklyInquiries: number
    totalMenuItems: number
    totalPackages: number
  }
  recentActivity: Array<{
    id: string
    name: string
    eventType: string
    createdAt: string
    status: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalMenuItems: 0,
    totalPackages: 0,
    recentInquiries: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/analytics')
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      
      const data: AnalyticsApiResponse = await response.json()
      
      // Transform the analytics data to match our dashboard stats structure
      setStats({
        totalInquiries: data.overview.totalInquiries,
        newInquiries: data.overview.weeklyInquiries, // Using weekly as "new"
        totalMenuItems: data.overview.totalMenuItems,
        totalPackages: data.overview.totalPackages, // Now using real package count
        recentInquiries: data.recentActivity.map((activity) => ({
          id: activity.id,
          name: activity.name,
          eventType: activity.eventType,
          createdAt: new Date(activity.createdAt).toLocaleDateString(),
          status: activity.status
        }))
      })
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const statCards = [
    {
      name: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: `+${stats.newInquiries} this week`
    },
    {
      name: 'New Inquiries',
      value: stats.newInquiries,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: 'This week'
    },
    {
      name: 'Menu Items',
      value: stats.totalMenuItems,
      icon: Package,
      color: 'bg-orange-500',
      change: 'Active items'
    },
    {
      name: 'Packages',
      value: stats.totalPackages,
      icon: Star,
      color: 'bg-purple-500',
      change: 'Available'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-100 text-yellow-800'
      case 'responded':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Error loading dashboard: {error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your admin dashboard. Here&apos;s what&apos;s happening with your catering business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-sm text-gray-500">{stat.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Inquiries
            </h3>
            <div className="space-y-3">
              {stats.recentInquiries.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent inquiries</p>
              ) : (
                stats.recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">{inquiry.eventType || 'Not specified'}</p>
                      <p className="text-xs text-gray-400">{inquiry.createdAt}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <a href="/admin/inquiries" className="text-sm text-orange-600 hover:text-orange-500">
                View all inquiries →
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a
                href="/admin/menu-items"
                className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Menu Items</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Add, edit, or remove menu items</p>
              </a>
              
              <a
                href="/admin/packages"
                className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Packages</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Update pricing and package details</p>
              </a>
              
              <a
                href="/admin/inquiries"
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Review Inquiries</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Respond to customer inquiries</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}