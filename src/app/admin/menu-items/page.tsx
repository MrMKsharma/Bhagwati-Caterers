'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import Image from 'next/image'

interface MenuItem {
  id: string
  name: string
  description?: string
  price?: number
  category: string
  subcategory?: string
  dietType: string
  spiceLevel?: string
  ingredients?: string
  allergens?: string
  cookingTime?: number
  imageUrl?: string
  isAvailable: boolean
  isFeatured: boolean
  sortOrder?: number
  createdAt: string
  updatedAt: string
}

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'appetizer',
    subcategory: '',
    dietType: 'vegetarian',
    spiceLevel: '',
    ingredients: '',
    allergens: '',
    cookingTime: '',
    imageUrl: '',
    isAvailable: true,
    isFeatured: false,
    sortOrder: ''
  })

  const categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'beverage', label: 'Beverage' },
    { value: 'bread', label: 'Bread & Roti' },
    { value: 'rice', label: 'Rice & Biryani' },
    { value: 'dal', label: 'Dal & Curry' },
    { value: 'snack', label: 'Snacks' }
  ]



  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/menu-items')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data.sort((a: MenuItem, b: MenuItem) => 
          (a.sortOrder || 999) - (b.sortOrder || 999)
        ))
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingItem ? `/api/admin/menu-items/${editingItem.id}` : '/api/admin/menu-items'
      const method = editingItem ? 'PUT' : 'POST'
      
      const submitData = {
        ...formData,
        cookingTime: formData.cookingTime ? parseInt(formData.cookingTime) : null,
        sortOrder: formData.sortOrder ? parseInt(formData.sortOrder) : null,
        ingredients: formData.ingredients ? JSON.stringify(formData.ingredients.split(',').map(i => i.trim())) : null,
        allergens: formData.allergens ? JSON.stringify(formData.allergens.split(',').map(a => a.trim())) : null
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        await fetchMenuItems()
        resetForm()
      } else {
        const errorData = await response.json()
        alert(`Failed to save menu item: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving menu item:', error)
      alert('Error saving menu item. Please try again.')
    }
  }

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return

    try {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMenuItems(prev => prev.filter(item => item.id !== id))
      } else {
        const errorData = await response.json()
        alert(`Failed to delete menu item: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting menu item:', error)
      alert('Error deleting menu item. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'appetizer',
      subcategory: '',
      dietType: 'vegetarian',
      spiceLevel: '',
      ingredients: '',
      allergens: '',
      cookingTime: '',
      imageUrl: '',
      isAvailable: true,
      isFeatured: false,
      sortOrder: ''
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const startEdit = (item: MenuItem) => {
    let ingredients = ''
    let allergens = ''
    
    try {
      ingredients = item.ingredients ? 
        (typeof item.ingredients === 'string' ? 
          JSON.parse(item.ingredients).join(', ') : '') : ''
    } catch {
      ingredients = typeof item.ingredients === 'string' ? item.ingredients : ''
    }
    
    try {
      allergens = item.allergens ? 
        (typeof item.allergens === 'string' ? 
          JSON.parse(item.allergens).join(', ') : '') : ''
    } catch {
      allergens = typeof item.allergens === 'string' ? item.allergens : ''
    }
    
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category,
      subcategory: item.subcategory || '',
      dietType: item.dietType || 'vegetarian',
      spiceLevel: item.spiceLevel || '',
      ingredients,
      allergens,
      cookingTime: item.cookingTime?.toString() || '',
      imageUrl: item.imageUrl || '',
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured || false,
      sortOrder: item.sortOrder?.toString() || ''
    })
    setEditingItem(item)
    setShowForm(true)
  }

  const filteredItems = menuItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vegetarian Menu Items</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your pure vegetarian menu items and pricing
          </p>
        </div>
        <button
          onClick={() => {
            console.log('Add Menu Item clicked')
            setShowForm(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          type="button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
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
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-orange-200 to-orange-300 flex items-center justify-center relative overflow-hidden">
              {item.imageUrl ? (
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill
                  className="object-cover" 
                  onError={(e) => {
                    console.log('Image failed to load:', item.imageUrl)
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      const span = parent.querySelector('span')
                      if (span) span.textContent = 'Image Not Found'
                    }
                  }}
                  onLoad={(e) => {
                    console.log('Image loaded successfully:', item.imageUrl)
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      const span = parent.querySelector('span')
                      if (span) span.style.display = 'none'
                    }
                  }}
                />
              ) : null}
              <span className="text-orange-800 font-medium absolute inset-0 flex items-center justify-center">
                {item.imageUrl ? 'Loading...' : 'No Image'}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 capitalize">{item.category}</p>
              {item.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    console.log('Edit clicked for item:', item.id)
                    startEdit(item)
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  type="button"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    console.log('Delete clicked for item:', item.id)
                    deleteMenuItem(item.id)
                  }}
                  className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No menu items found</p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetForm()
            }
          }}
        >
          <div 
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={() => {
                  console.log('Close modal clicked')
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                type="button"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                  Available for order
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    resetForm()
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}