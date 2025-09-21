'use client'

import { useEffect, useState, useCallback } from 'react'
import { 
  Eye, 
  Trash2, 
  Mail, 
  Calendar, 
  Users as UsersIcon,
  Filter,
  Search
} from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  eventType?: string
  eventDate?: string
  guestCount?: number
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const fetchInquiries = useCallback(async () => {
    try {
      const response = await fetch('/api/inquiries')
      if (response.ok) {
        const data = await response.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setInquiries(prev => 
          prev.map(inquiry => 
            inquiry.id === id ? { ...inquiry, status } : inquiry
          )
        )
      }
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id))
        setSelectedInquiry(null)
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error)
    }
  }

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

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesFilter = filter === 'all' || inquiry.status === filter
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (inquiry.eventType && inquiry.eventType.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage customer inquiries and event requests
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="responded">Responded</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {filteredInquiries.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No inquiries found</p>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedInquiry?.id === inquiry.id 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900">{inquiry.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                              {inquiry.status}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="h-4 w-4 mr-2" />
                              {inquiry.email}
                            </div>
                            {inquiry.eventType && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-2" />
                                {inquiry.eventType}
                                {inquiry.eventDate && ` - ${new Date(inquiry.eventDate).toLocaleDateString()}`}
                              </div>
                            )}
                            {inquiry.guestCount && (
                              <div className="flex items-center text-sm text-gray-500">
                                <UsersIcon className="h-4 w-4 mr-2" />
                                {inquiry.guestCount} guests
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{inquiry.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiry Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => updateInquiryStatus(selectedInquiry.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="new">New</option>
                      <option value="responded">Responded</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.email}</p>
                  </div>

                  {selectedInquiry.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedInquiry.phone}</p>
                    </div>
                  )}

                  {selectedInquiry.eventType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Type</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedInquiry.eventType}</p>
                    </div>
                  )}

                  {selectedInquiry.eventDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedInquiry.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {selectedInquiry.guestCount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guest Count</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedInquiry.guestCount}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Received</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => deleteInquiry(selectedInquiry.id)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select an inquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}