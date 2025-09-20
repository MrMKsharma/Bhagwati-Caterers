import Script from 'next/script'

interface BusinessStructuredDataProps {
  type?: 'business' | 'restaurant' | 'service'
}

export function BusinessStructuredData({ type = 'business' }: BusinessStructuredDataProps) {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Bhagwati Caterers",
    "description": "Premium catering services for weddings, corporate events, parties and all special occasions. Delicious food, exceptional service.",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com",
    "logo": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"}/icons/icon-512x512.png`,
    "image": [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"}/images/hero-banner.jpg`,
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"}/images/catering-service.jpg`
    ],
    "telephone": "+1-555-CATERER",
    "email": "info@bhagwati-caterers.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Culinary Street",
      "addressLocality": "Foodville",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0522",
      "longitude": "-118.2437"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-17:00",
      "Su 10:00-16:00"
    ],
    "priceRange": "$$",
    "servesCuisine": [
      "American",
      "Italian",
      "Mediterranean",
      "Asian",
      "International"
    ],
    "serviceType": [
      "Wedding Catering",
      "Corporate Catering",
      "Event Catering",
      "Party Catering"
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.0522",
        "longitude": "-118.2437"
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://www.facebook.com/bhagwaticaterers",
      "https://www.instagram.com/bhagwaticaterers",
      "https://www.twitter.com/bhagwaticaterers",
      "https://www.linkedin.com/company/bhagwaticaterers"
    ],
    "hasMenu": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"}/menu`,
    "acceptsReservations": true
  }

  return (
    <Script
      id="business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData)
      }}
    />
  )
}

interface ServiceStructuredDataProps {
  services?: Array<{
    name: string
    description: string
    price?: string
  }>
}

export function ServiceStructuredData({ services }: ServiceStructuredDataProps) {
  const defaultServices = [
    {
      name: "Wedding Catering",
      description: "Complete wedding catering services with customized menus for your special day"
    },
    {
      name: "Corporate Catering",
      description: "Professional catering for business events, meetings, and corporate gatherings"
    },
    {
      name: "Event Catering",
      description: "Full-service catering for all types of special events and celebrations"
    },
    {
      name: "Party Catering",
      description: "Delicious catering solutions for private parties and social gatherings"
    }
  ]

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Catering Service",
    "provider": {
      "@type": "FoodEstablishment",
      "name": "Bhagwati Caterers",
      "url": process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catering Services",
      "itemListElement": (services || defaultServices).map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        },
        "position": index + 1
      }))
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  }

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceData)
      }}
    />
  )
}

interface MenuStructuredDataProps {
  menuItems?: Array<{
    name: string
    description: string
    price?: number
    category: string
    image?: string
  }>
}

export function MenuStructuredData({ menuItems }: MenuStructuredDataProps) {
  if (!menuItems || menuItems.length === 0) return null

  const menuData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Bhagwati Caterers Menu",
    "description": "Our carefully curated menu featuring premium dishes for all occasions",
    "hasMenuSection": menuItems.reduce((sections: any[], item) => {
      let section = sections.find(s => s.name === item.category)
      if (!section) {
        section = {
          "@type": "MenuSection",
          "name": item.category,
          "hasMenuItem": []
        }
        sections.push(section)
      }
      
      section.hasMenuItem.push({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.description,
        ...(item.price && {
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "INR"
          }
        }),
        ...(item.image && { "image": item.image })
      })
      
      return sections
    }, [])
  }

  return (
    <Script
      id="menu-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(menuData)
      }}
    />
  )
}

interface ReviewStructuredDataProps {
  reviews?: Array<{
    author: string
    rating: number
    text: string
    datePublished: string
  }>
}

export function ReviewStructuredData({ reviews }: ReviewStructuredDataProps) {
  if (!reviews || reviews.length === 0) return null

  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  }

  const reviewData = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Bhagwati Caterers",
    "aggregateRating": aggregateRating,
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.text,
      "datePublished": review.datePublished
    }))
  }

  return (
    <Script
      id="review-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewData)
      }}
    />
  )
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData)
      }}
    />
  )
}