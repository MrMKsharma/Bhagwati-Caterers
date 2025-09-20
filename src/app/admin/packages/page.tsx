'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Package as PackageIcon } from 'lucide-react'

interface Package {
  id: string
  name: string
  description: string
  pricePerPerson: number
  minGuests: number
  maxGuests?: number
  items: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerPerson: '',
    minGuests: '',
    maxGuests: '',
    items: '',
    imageUrl: ''
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages')
      if (!response.ok) throw new Error('Failed to fetch packages')
      const data = await response.json()
      setPackages(data.packages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // Parse items as JSON array
      let parsedItems = []
      if (formData.items.trim()) {
        try {
          parsedItems = JSON.parse(formData.items)
        } catch {
          // If not valid JSON, treat as comma-separated list
          parsedItems = formData.items.split(',').map(item => item.trim()).filter(Boolean)
        }
      }

      const packageData = {
        name: formData.name,
        description: formData.description,
        pricePerPerson: formData.pricePerPerson,
        minGuests: formData.minGuests,
        maxGuests: formData.maxGuests || null,
        items: parsedItems,
        imageUrl: formData.imageUrl || null
      }

      const url = editingPackage ? `/api/admin/packages/${editingPackage.id}` : '/api/admin/packages'
      const method = editingPackage ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData)
      })

      if (!response.ok) throw new Error('Failed to save package')
      
      resetForm()
      fetchPackages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      description: pkg.description,
      pricePerPerson: pkg.pricePerPerson.toString(),
      minGuests: pkg.minGuests.toString(),
      maxGuests: pkg.maxGuests?.toString() || '',
      items: pkg.items,
      imageUrl: pkg.imageUrl || ''
    })
    setShowAddForm(true)
  }

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (!response.ok) throw new Error('Failed to update package')
      fetchPackages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete package')
      fetchPackages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pricePerPerson: '',
      minGuests: '',
      maxGuests: '',
      items: '',
      imageUrl: ''
    })
    setShowAddForm(false)
    setEditingPackage(null)
    setError('')
  }

  const filteredPackages = packages.filter(pkg => {
    if (filter === 'active') return pkg.isActive
    if (filter === 'inactive') return !pkg.isActive
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your catering packages and pricing
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          All ({packages.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'active'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Active ({packages.filter(p => p.isActive).length})
        </button>
        <button
          onClick={() => setFilter('inactive')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'inactive'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Inactive ({packages.filter(p => !p.isActive).length})
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-full overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Premium Wedding Package"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Person *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerPerson}
                    onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Guests *
                  </label>
                  <input
                    type="number"
                    value={formData.minGuests}
                    onChange={(e) => setFormData({ ...formData, minGuests: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="50"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Guests
                  </label>
                  <input
                    type="number"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Complete package description..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Included Items
                </label>
                <textarea
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder='["Welcome drink", "3-course meal", "Dessert buffet"] or comma-separated list'
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter as JSON array or comma-separated list
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://example.com/package-image.jpg"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  {editingPackage ? 'Update' : 'Create'} Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="bg-white shadow rounded-lg">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No packages</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'No packages have been created yet.'
                : `No ${filter} packages found.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredPackages.map((pkg) => {
              let parsedItems = []
              try {
                parsedItems = JSON.parse(pkg.items)
              } catch {
                parsedItems = pkg.items ? pkg.items.split(',').map(item => item.trim()) : []
              }
              
              return (
                <div key={pkg.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-100 relative">
                    {pkg.imageUrl ? (
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling!.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`${pkg.imageUrl ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-gray-200`}>
                      <PackageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    {!pkg.isActive && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Inactive</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                        <p className="text-2xl font-bold text-orange-600">
                          ₹{pkg.pricePerPerson.toLocaleString()}/person
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                    
                    <div className="text-sm text-gray-500 mb-3">
                      <p>Min: {pkg.minGuests} guests {pkg.maxGuests && `• Max: ${pkg.maxGuests} guests`}</p>
                    </div>
                    
                    {parsedItems.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Includes:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {parsedItems.slice(0, 3).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                          {parsedItems.length > 3 && (
                            <li className="text-gray-500">+ {parsedItems.length - 3} more items</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-xs text-gray-500">
                        {new Date(pkg.createdAt).toLocaleDateString()}
                      </span>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleToggleActive(pkg.id, pkg.isActive)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title={pkg.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {pkg.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}