'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, ChefHat, Leaf, Flame, Clock, Users, Heart, Share2, Utensils } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface MenuItem {
  id: string
  name: string
  category: string
  subcategory?: string | null
  description?: string | null
  dietType?: string | null
  spiceLevel?: string | null
  ingredients?: string[]
  allergens?: string[]
  image?: string | null
  isVeg: boolean
  isFeatured: boolean
}

interface ApiResponse {
  success: boolean
  data: MenuItem[]
  error?: string
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Enhanced categories based on the database schema
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'main', name: 'Main Course' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Beverages' },
    { id: 'bread', name: 'Bread' },
    { id: 'rice', name: 'Rice' },
    { id: 'dal', name: 'Dal' }
  ]

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Check if we have cached data
        const cachedData = sessionStorage.getItem('menuItems')
        if (cachedData) {
          const parsedData = JSON.parse(cachedData)
          // Check if cached data is less than 5 minutes old
          if (Date.now() - parsedData.timestamp < 5 * 60 * 1000) {
            setMenuItems(parsedData.data)
            setLoading(false)
            return
          }
        }
        
        const response = await fetch('/api/menu-items')
        const data: ApiResponse = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch menu items')
        }

        if (data.success && data.data) {
          setMenuItems(data.data)
          // Cache the data with timestamp
          sessionStorage.setItem('menuItems', JSON.stringify({
            data: data.data,
            timestamp: Date.now()
          }))
        } else {
          throw new Error(data.error || 'Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching menu items:', err)
        setError(err instanceof Error ? err.message : 'Failed to load menu items')
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Memoize filtered items to prevent unnecessary recalculations
  const filteredItems = useMemo(() => 
    activeCategory === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory),
    [menuItems, activeCategory]
  )

  // Memoize available categories
  const availableCategories = useMemo(() => 
    categories.filter(category => 
      category.id === 'all' || menuItems.some(item => item.category === category.id)
    ),
    [categories, menuItems]
  )

  if (loading) {
    return (
      <div>
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              आमचा मेनू
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              आमच्या शुद्ध शाकाहारी विशेषज्ञतेची निवड शोधा
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-green-500 hover:bg-green-400 transition ease-in-out duration-150 cursor-not-allowed">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              मेनू आयटम लोड करत आहे...
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              आमचा मेनू
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              आमच्या शुद्ध शाकाहारी विशेषज्ञतेची निवड शोधा
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">त्रुटी: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              पुन्हा प्रयत्न करा
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="Catering Menu - Bhagwati Caterers"
        description="Explore our extensive vegetarian catering menu featuring authentic Maharashtrian dishes, North Indian specialties, South Indian delicacies, and international cuisine options."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-75"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              आमचा मेनू
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              आमच्या शुद्ध शाकाहारी विशेषज्ञतेची निवड शोधा
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-100 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">या श्रेणीमध्ये कोणतेही आयटम सापडले नाहीत.</p>
            <p className="mt-2">कृपया नंतर परत तपासा किंवा इतर श्रेणी ब्राउझ करा.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-r from-green-200 to-green-300 flex items-center justify-center">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-green-800 font-medium">अन्न चित्र</span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-1 text-sm text-gray-500">शाकाहारी</span>
                    </div>
                  </div>
                  
                  {item.subcategory && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      {item.subcategory.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  )}
                  
                  <p className="text-gray-600 mb-4">{item.description || 'चवदार शाकाहारी व्यंजन'}</p>
                  
                  {item.spiceLevel && (
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">स्पाईस स्तर:</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.spiceLevel === 'mild' ? 'bg-green-100 text-green-800' :
                        item.spiceLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.spiceLevel}
                      </span>
                    </div>
                  )}
                  
                  {item.ingredients && item.ingredients.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">मुख्य साहित्य: </span>
                      <span className="text-sm text-gray-700">
                        {item.ingredients.slice(0, 3).join(', ')}
                        {item.ingredients.length > 3 && '...'}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <span className="text-lg font-medium text-green-600">
                      किंमत विनंतीवर - कोटेसाठी आमच्याशी संपर्क साधा
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}