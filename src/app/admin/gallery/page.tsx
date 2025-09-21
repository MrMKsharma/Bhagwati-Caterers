'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon, Leaf, Star } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  title?: string
  imageUrl: string
  category: string
  eventType?: string
  cuisineType?: string
  tags?: string
  description?: string
  isActive: boolean
  isFeatured: boolean
  sortOrder?: number
  createdAt: string
  updatedAt: string
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState<'all' | 'food' | 'events' | 'setup' | 'festival' | 'corporate' | 'wedding'>('all')

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'food',
    eventType: '',
    cuisineType: '',
    tags: '',
    description: '',
    isFeatured: false,
    sortOrder: ''
  })

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/gallery')
      if (!response.ok) throw new Error('Failed to fetch images')
      const data = await response.json()
      setImages(data.images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const url = editingImage ? `/api/admin/gallery/${editingImage.id}` : '/api/admin/gallery'
      const method = editingImage ? 'PUT' : 'POST'
      
      const submitData = {
        ...formData,
        sortOrder: formData.sortOrder ? parseInt(formData.sortOrder) : null,
        tags: formData.tags ? JSON.stringify(formData.tags.split(',').map(t => t.trim())) : null
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save image')
      }
      
      resetForm()
      fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleEdit = (image: GalleryImage) => {
    let tags = ''
    
    try {
      tags = image.tags ? 
        (typeof image.tags === 'string' ? 
          JSON.parse(image.tags).join(', ') : '') : ''
    } catch {
      tags = typeof image.tags === 'string' ? image.tags : ''
    }
    
    setEditingImage(image)
    setFormData({
      title: image.title || '',
      imageUrl: image.imageUrl,
      category: image.category,
      eventType: image.eventType || '',
      cuisineType: image.cuisineType || '',
      tags,
      description: image.description || '',
      isFeatured: image.isFeatured || false,
      sortOrder: image.sortOrder?.toString() || ''
    })
    setShowAddForm(true)
  }

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (!response.ok) throw new Error('Failed to update image')
      fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete image')
      fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const resetForm = () => {
    setFormData({ 
      title: '', 
      imageUrl: '', 
      category: 'food',
      eventType: '',
      cuisineType: '',
      tags: '',
      description: '',
      isFeatured: false,
      sortOrder: ''
    })
    setShowAddForm(false)
    setEditingImage(null)
    setError('')
  }

  const categories: Array<{ value: 'food' | 'events' | 'setup' | 'festival' | 'corporate' | 'wedding'; label: string }> = [
    { value: 'food', label: 'Vegetarian Food' },
    { value: 'events', label: 'Catering Events' },
    { value: 'setup', label: 'Setup & Decoration' },
    { value: 'festival', label: 'Festival Catering' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'wedding', label: 'Wedding Catering' }
  ]

  const eventTypes = [
    'wedding', 'corporate', 'birthday', 'anniversary', 'festival', 'religious', 'social'
  ]

  const cuisineTypes = [
    'north_indian', 'south_indian', 'gujarati', 'rajasthani', 'bengali', 'punjabi', 
    'maharashtrian', 'jain', 'vegan', 'street_food', 'sweets', 'snacks'
  ]

  const filteredImages = images.filter(img => 
    filter === 'all' || img.category === filter
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Vegetarian Gallery Management
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your vegetarian food and event gallery images
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          All ({images.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === cat.value
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat.label} ({images.filter(img => img.category === cat.value).length})
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Leaf className="h-5 w-5 text-green-600" />
                  {editingImage ? 'Edit Gallery Image' : 'Add New Image'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Image title"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Order number"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Describe this image..."
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Cuisine
                    </label>
                    <select
                      value={formData.cuisineType}
                      onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select cuisine</option>
                      {cuisineTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., spicy, traditional"
                  />
                </div>
                
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Featured image
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
                  >
                    {editingImage ? 'Update' : 'Add'} Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="bg-white shadow rounded-lg">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'No images have been uploaded yet.'
                : `No images in the ${categories.find(c => c.value === filter)?.label} category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || 'Gallery image'}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling!.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 text-sm">Image not found</span>
                  </div>
                  
                  {!image.isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Inactive</span>
                    </div>
                  )}
                  
                  {image.isFeatured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md">
                      <Star className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {image.title || 'Untitled'}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize mt-1">{image.category.replace('_', ' ')}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      image.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleToggleActive(image.id, image.isActive)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        title={image.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {image.isActive ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleEdit(image)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}