import { Metadata } from 'next'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'service'
  noindex?: boolean
  nofollow?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title = "Bhagwati Caterers - Premium Catering Services",
    description = "Professional catering services for weddings, corporate events, parties and all special occasions. Delicious food, exceptional service.",
    keywords = ["catering", "wedding catering", "corporate catering", "event catering"],
    image = "/images/og-default.jpg",
    url = "",
    type = "website",
    noindex = false,
    nofollow = false
  } = config

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  // Generate robots content
  const robots = {
    index: !noindex,
    follow: !nofollow,
    googleBot: {
      index: !noindex,
      follow: !nofollow,
      'max-video-preview': -1 as const,
      'max-image-preview': 'large' as const,
      'max-snippet': -1 as const,
    },
  }

  return {
    title,
    description,
    keywords,
    robots,
    openGraph: {
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      url: fullUrl,
      type: type === 'service' ? 'website' : type as 'website' | 'article',
      siteName: "Bhagwati Caterers",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@bhagwaticaterers",
      creator: "@bhagwaticaterers",
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

// Pre-configured metadata for common pages
export const pageSEO = {
  home: generateMetadata({
    title: "Bhagwati Caterers - Premium Catering Services",
    description: "Professional catering services for weddings, corporate events, parties and all special occasions. Expert chefs, exceptional service, memorable experiences.",
    keywords: ["catering", "wedding catering", "corporate catering", "event catering", "party catering", "bhagwati caterers"],
    image: "/images/home-og.jpg",
    url: "/",
  }),

  about: generateMetadata({
    title: "About Us - Bhagwati Caterers",
    description: "Learn about Bhagwati Caterers - our story, mission, and commitment to providing exceptional catering services. Meet our expert culinary team.",
    keywords: ["about bhagwati caterers", "catering company", "culinary team", "catering expertise"],
    image: "/images/about-og.jpg",
    url: "/about",
  }),

  services: generateMetadata({
    title: "Catering Services - Bhagwati Caterers",
    description: "Professional catering services for weddings, corporate events, parties, and special occasions. Custom menus, expert service, unforgettable experiences.",
    keywords: ["catering services", "wedding catering", "corporate catering", "event catering", "party catering"],
    image: "/images/services-og.jpg",
    url: "/services",
  }),

  menu: generateMetadata({
    title: "Catering Menu - Bhagwati Caterers",
    description: "Browse our complete catering menu featuring fresh appetizers, delicious main courses, and delightful desserts. Customizable options available.",
    keywords: ["catering menu", "food menu", "appetizers", "main course", "desserts", "vegetarian", "non-vegetarian"],
    image: "/images/menu-og.jpg",
    url: "/menu",
  }),

  packages: generateMetadata({
    title: "Catering Packages & Pricing - Bhagwati Caterers", 
    description: "Explore our catering packages designed for different events and budgets. Transparent pricing, flexible options, exceptional value.",
    keywords: ["catering packages", "catering pricing", "event packages", "wedding packages", "corporate packages"],
    image: "/images/packages-og.jpg",
    url: "/packages",
  }),

  gallery: generateMetadata({
    title: "Photo Gallery - Bhagwati Caterers",
    description: "View our photo gallery showcasing beautiful events, delicious food presentations, and satisfied customers. See our catering in action.",
    keywords: ["catering photos", "event gallery", "food photography", "catering portfolio", "wedding photos"],
    image: "/images/gallery-og.jpg", 
    url: "/gallery",
  }),

  contact: generateMetadata({
    title: "Contact Us - Bhagwati Caterers",
    description: "Get in touch with Bhagwati Caterers for a free consultation and quote. Professional catering services for your special event.",
    keywords: ["contact bhagwati caterers", "catering quote", "catering consultation", "book catering", "catering inquiry"],
    image: "/images/contact-og.jpg",
    url: "/contact",
  }),
}

// SEO utility functions
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Bhagwati Caterers",
    "description": "Premium catering services for all special occasions",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com",
    "logo": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"}/icons/icon-512x512.png`,
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
    "servesCuisine": ["American", "Italian", "Mediterranean", "Asian", "International"],
    "serviceType": ["Wedding Catering", "Corporate Catering", "Event Catering", "Party Catering"]
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}