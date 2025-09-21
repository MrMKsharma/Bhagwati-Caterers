'use client'

import { useState, useEffect } from 'react'
import { } from 'lucide-react'
import Image from 'next/image'
import SEOHead from '@/components/seo/SEOHead'

export default function GalleryPage() {
  const [images, setImages] = useState<Array<{ id: string; src: string; alt: string; category: string; title: string }>>([])
  const [filteredImages, setFilteredImages] = useState<Array<{ id: string; src: string; alt: string; category: string; title: string }>>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockImages = [
      {
        id: '1',
        title: 'Wedding Ceremony',
        src: '/images/gallery/wedding-ceremony.jpg',
        alt: 'Wedding Ceremony',
        category: 'weddings',
      },
      {
        id: '2',
        title: 'Corporate Event',
        src: '/images/gallery/corporate-event.jpg',
        alt: 'Corporate Event',
        category: 'corporate',
      },
      {
        id: '3',
        title: 'Birthday Party',
        src: '/images/gallery/birthday-party.jpg',
        alt: 'Birthday Party',
        category: 'birthdays',
      },
      {
        id: '4',
        title: 'Food Presentation',
        src: '/images/gallery/food-presentation.jpg',
        alt: 'Food Presentation',
        category: 'food',
      },
      {
        id: '5',
        title: 'Event Setup',
        src: '/images/gallery/event-setup.jpg',
        alt: 'Event Setup',
        category: 'events',
      },
    ]
    
    setImages(mockImages)
    setFilteredImages(mockImages)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory))
    }
  }, [selectedCategory, images])

  const categories = ['all', 'weddings', 'corporate', 'birthdays', 'food', 'events']

  return (
    <>
      <SEOHead
        title="Photo Gallery - Bhagwati Caterers"
        description="Explore our photo gallery showcasing beautiful events, delicious food presentations, and memorable moments from our catering services."
        url="/gallery"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            आमच्या सेवेचे अद्भुत ठसे पहा! आमच्या कार्यक्रमांचे, भोजनाचे प्रस्तुतीकरण आणि 
            आमच्या ग्राहकांसह घेतलेल्या स्मरणीय क्षणांचे फोटो पहा.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-100 shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            </div>
          ) : filteredImages.length > 0 ? (
            filteredImages.map(image => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling!.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 font-medium">Image not available</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-600 px-4 py-2 rounded-lg">
                      View Larger
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {image.title || 'Gallery Image'}
                  </h3>
                  <p className="text-gray-600 text-sm capitalize">
                    {image.category}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                {selectedCategory === 'all' 
                  ? 'Gallery is currently empty.'
                  : `No images found in the ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} category.`
                }
              </p>
              <p className="text-gray-500">
                Check back later for more beautiful photos of our food services!
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Want to see more?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Follow us on social media to get daily updates on our latest creations and events. 
            We love sharing beautiful moments with you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary transform hover:scale-105 transition-transform">
              Follow on Instagram
            </button>
            <button className="btn-secondary transform hover:scale-105 transition-transform">
              Visit Facebook Page
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
